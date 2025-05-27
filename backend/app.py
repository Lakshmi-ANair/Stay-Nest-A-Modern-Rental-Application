# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/')
def home():
    return "Hello from Flask Backend!"

@app.route('/api/message')
def get_message():
    return jsonify({"message": "This message is from the Flask API!"})

if __name__ == '__main__':
    app.run(debug=True, port=5001) # Run on a different port than React