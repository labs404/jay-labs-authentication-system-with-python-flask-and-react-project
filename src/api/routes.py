"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

#jay added at start of project (1)
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


#jay added at start of project (2)
# Create a route to authenticate your users and return JWTs. The # create_access_token() function is used to actually generate the JWT. 
# #jay added at start of project (3) changed from app.route to api.route
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email,password=password).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    msg = {
        "message": "Login Sussessful for user: " + email
        }
    return jsonify(msg)

# added 10/4

@api.route('/user', methods=['GET'])
def get_all_users():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200

@api.route('/user/<int:id>', methods=['GET'])
def get_one_user(id):
    user = User.query.get(id)
    if user is None:
        raise APIException('No such user', status_code=404)
    return jsonify(user.serialize()), 200

@api.route('/signup', methods=['POST'])
def create_new_user():
    body = request.get_json()
    user = User()
    user.email = body["email"]
    user.password = body["password"]
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/user/<int:id>', methods=['PUT'])
def update_one_user(id):
    body = request.get_json()
    user = User.query.get(id)
    if user is None:
        raise APIException('No such user', status_code=404)
    if "email" in body:
        user.email = body["email"]
    if "password" in body:
        user.password = body["password"]
    if "is_active" in body:
        user.is_active = body["is_active"]
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/user/<int:id>', methods=['DELETE'])
def delete_one_user(id):
    user = User.query.get(id)
    if user is None:
        raise APIException('User not found', status_code=404)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def get_private_data():
    user = get_jwt_identity()
    return jsonify(message=f"Welcome to /private,  {user}!")