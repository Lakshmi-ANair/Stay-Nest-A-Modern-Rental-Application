# backend/app.py
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env

app = Flask(__name__)
CORS(app, supports_credentials=True) # supports_credentials=True for JWT cookies if you use them later

# Configurations
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress a warning

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- User Model ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False) # Store hashed password
    first_name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    # Add more fields as needed: is_verified, created_at, etc.

    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

# --- API Routes (to be expanded) ---
@app.route('/')
def home():
    return "Hello from Flask Backend with Auth!"

@app.route('/api/message') # Your existing test route
def get_message():
    return jsonify({"message": "This message is from the Flask API!"})

# --- Signup Route ---
@app.route('/api/auth/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName') # Match frontend naming
    last_name = data.get('lastName')   # Match frontend naming

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 409 # 409 Conflict

    new_user = User(email=email, first_name=first_name, last_name=last_name)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# --- Login Route ---
@app.route('/api/auth/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id)) # You can store more in identity if needed
        refresh_token = create_refresh_token(identity=str(user.id))
        return jsonify(
            access_token=access_token,
            refresh_token=refresh_token,
            user_id=user.id, # Send user_id or other non-sensitive info
            email=user.email,
            firstName=user.first_name
        ), 200
    else:
        return jsonify({"msg": "Bad email or password"}), 401


# --- Example Protected Route ---
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id_str = get_jwt_identity() # This will be a string
    try:
         # Convert the string identity back to an integer
        user_id = int(current_user_id_str)
    except ValueError:
        # Handle cases where the identity might not be a valid integer string
        return jsonify({"msg": "Invalid user identity in token"}), 400

    user = User.query.get(user_id) # Now user_id is an integer
    if not user:
        return jsonify({"msg": "User not found"}), 404 # Good practice to check if user exists

    return jsonify(logged_in_as=user.email, user_id_from_token=user_id), 200 # Added user_id_from_token for clarity


if __name__ == '__main__':
    # This ensures tables are created if they don't exist before first request
    # For proper migrations, use Flask-Migrate commands
    # with app.app_context():
    #     db.create_all() # Not recommended for production, use migrations
    app.run(debug=True, port=5001)