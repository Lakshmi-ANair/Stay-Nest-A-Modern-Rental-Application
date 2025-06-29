import os
import json
from datetime import datetime, timedelta
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# --- CONFIGURATION ---
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_secret')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev_jwt_secret')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI', 'sqlite:///instance/site.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# --- CORS FOR DEVELOPMENT ---
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# --- DATABASE AND EXTENSIONS ---
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- DATABASE MODELS (Correct) ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    has_set_preferences = db.Column(db.Boolean, default=False)
    pref_country = db.Column(db.String(100), nullable=True)
    pref_city = db.Column(db.String(100), nullable=True)
    pref_occupant_type = db.Column(db.String(100), nullable=True)
    pref_accommodation_type = db.Column(db.String(100), nullable=True)
    pref_bedrooms = db.Column(db.String(100), nullable=True)
    pref_furnishing = db.Column(db.String(100), nullable=True)
    def set_password(self, password): self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    def check_password(self, password): return bcrypt.check_password_hash(self.password_hash, password)

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    country = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    occupant_type = db.Column(db.String(100))
    accommodation_type = db.Column(db.String(100))
    bedrooms = db.Column(db.String(100))
    furnishing = db.Column(db.String(100))
    image_urls = db.Column(db.Text, nullable=False)
    amenities = db.Column(db.Text, nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User', backref=db.backref('listings', lazy=True, cascade="all, delete-orphan"))
    bookings = db.relationship('Booking', backref='listing', lazy=True, cascade="all, delete-orphan")
    visits = db.relationship('Visit', backref='listing', lazy=True, cascade="all, delete-orphan")

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)

class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    visit_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Pending')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listing.id'), nullable=False)

# --- API ROUTES ---

# AUTH
@app.route('/api/auth/register', methods=['POST'])
def register_user():
    data = request.get_json()
    new_user = User(email=data.get('email'), first_name=data.get('firstName'), last_name=data.get('lastName'))
    new_user.set_password(data.get('password'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/api/auth/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if user and user.check_password(data.get('password')):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        user_data = {"id": user.id, "email": user.email, "firstName": user.first_name, "has_set_preferences": user.has_set_preferences}
        return jsonify(access_token=access_token, refresh_token=refresh_token, user=user_data), 200
    return jsonify({"msg": "Bad email or password"}), 401

@app.route('/api/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

# USER
@app.route('/api/user/preferences', methods=['POST'])
@jwt_required()
def save_preferences():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user: return jsonify({"msg": "User not found"}), 404
    data = request.get_json()
    user.pref_country = data.get('country')
    user.pref_city = data.get('city')
    user.pref_occupant_type = data.get('occupantType')
    user.pref_accommodation_type = data.get('accommodationType')
    user.pref_bedrooms = data.get('bedrooms')
    user.pref_furnishing = data.get('furnishing')
    user.has_set_preferences = True
    db.session.commit()
    return jsonify({"msg": "Preferences saved successfully"}), 200

# LISTINGS
@app.route('/api/listings', methods=['POST'])
@jwt_required()
def create_listing():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    new_listing = Listing(owner_id=user_id, title=data['title'], description=data['description'], country=data['country'], city=data['city'], occupant_type=data['occupantType'], accommodation_type=data['accommodationType'], bedrooms=data['bedrooms'], furnishing=data['furnishing'], price=int(data['price']), image_urls=json.dumps(data.get('images', [])), amenities=json.dumps(data.get('amenities', [])))
    db.session.add(new_listing)
    db.session.commit()
    return jsonify({"msg": "Listing created successfully", "id": new_listing.id}), 201

@app.route('/api/listings/<int:listing_id>', methods=['DELETE'])
@jwt_required()
def delete_listing(listing_id):
    user_id = int(get_jwt_identity())
    listing = Listing.query.get(listing_id)
    if not listing: return jsonify({"msg": "Listing not found"}), 404
    if listing.owner_id != user_id: return jsonify({"msg": "Unauthorized"}), 403
    db.session.delete(listing)
    db.session.commit()
    return jsonify({"msg": "Listing deleted successfully"}), 200

# DASHBOARD DATA
@app.route('/api/my-listings', methods=['GET'])
@jwt_required()
def get_my_listings():
    user_id = int(get_jwt_identity())
    listings = Listing.query.filter_by(owner_id=user_id).all()
    def get_currency(country): return {"symbol": "₹", "code": "INR"} if country == 'India' else {"symbol": "$", "code": "USD"}
    result = [{"id": l.id, "title": l.title, "city": l.city, "price": l.price, "currency": get_currency(l.country), "images": json.loads(l.image_urls) if l.image_urls else []} for l in listings]
    return jsonify(result), 200

@app.route('/api/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    user_id = int(get_jwt_identity())
    bookings = Booking.query.filter_by(user_id=user_id).join(Listing).order_by(Booking.start_date.desc()).all()
    
    
    def get_currency(country):
        return {"symbol": "₹", "code": "INR"} if country == 'India' else {"symbol": "$", "code": "USD"}

    result = [{
        "id": b.id,
        "listingId": b.listing_id,
        "startDate": b.start_date.isoformat(),
        "endDate": b.end_date.isoformat(),
        "title": b.listing.title,
        "city": b.listing.city,
        "totalPrice": b.total_price,
        "currency": get_currency(b.listing.country),
        "image": json.loads(b.listing.image_urls)[0] if b.listing.image_urls and json.loads(b.listing.image_urls) else ''
    } for b in bookings]
    return jsonify(result), 200

@app.route('/api/my-visits', methods=['GET'])
@jwt_required()
def get_my_visits():
    user_id = int(get_jwt_identity())
    visits = Visit.query.filter_by(user_id=user_id).join(Listing).order_by(Visit.visit_date.desc()).all()
    result = [{"id": v.id, "listingId": v.listing_id, "visitDate": v.visit_date.isoformat(), "status": v.status, "title": v.listing.title, "city": v.listing.city, "image": json.loads(v.listing.image_urls)[0] if v.listing.image_urls and json.loads(v.listing.image_urls) else ''} for v in visits]
    return jsonify(result), 200

# BOOKING AND VISIT ACTIONS
@app.route('/api/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    start_date = datetime.fromisoformat(data['startDate'].replace('Z', '+00:00'))
    end_date = datetime.fromisoformat(data['endDate'].replace('Z', '+00:00'))
    new_booking = Booking(user_id=user_id, listing_id=data['listingId'], start_date=start_date, end_date=end_date, total_price=int(data['totalPrice']))
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({"msg": "Booking created!", "booking_id": new_booking.id}), 201

@app.route('/api/bookings/<int:booking_id>', methods=['DELETE'])
@jwt_required()
def cancel_booking(booking_id):
    user_id = int(get_jwt_identity())
    booking = Booking.query.get(booking_id)
    if not booking: return jsonify({"msg": "Booking not found"}), 404
    if booking.user_id != user_id: return jsonify({"msg": "Unauthorized"}), 403
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"msg": "Booking cancelled successfully"}), 200

@app.route('/api/visits', methods=['POST'])
@jwt_required()
def create_visit():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    visit_date = datetime.fromisoformat(data['visitDate'].replace('Z', '+00:00'))
    new_visit = Visit(user_id=user_id, listing_id=data['listingId'], visit_date=visit_date, status='Pending')
    db.session.add(new_visit)
    db.session.commit()
    return jsonify({"msg": "Visit requested!", "visit_id": new_visit.id}), 201

@app.route('/api/visits/<int:visit_id>', methods=['DELETE'])
@jwt_required()
def cancel_visit(visit_id):
    user_id = int(get_jwt_identity())
    visit = Visit.query.get(visit_id)
    if not visit: return jsonify({"msg": "Visit not found"}), 404
    if visit.user_id != user_id: return jsonify({"msg": "Unauthorized"}), 403
    db.session.delete(visit)
    db.session.commit()
    return jsonify({"msg": "Visit cancelled successfully"}), 200

# MAIN RUN BLOCK
if __name__ == '__main__':
    with app.app_context():
        pass
    app.run(debug=True, port=5001)