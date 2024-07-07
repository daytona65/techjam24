import json
from flask import Flask, Response, jsonify, request
from dotenv import dotenv_values
from bson import json_util, ObjectId
from pymongo import MongoClient
from api.user_service import *
from api.product_service import *
from utils.utils import error_response, success_response, success_message


app = Flask(__name__)

# retrieve dotenv config
config = dotenv_values(".env")
data_file_path = 'amazon.csv'

# MONGODB
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]

@app.route("/")
def home():
    return "hello"

@app.route('/users', methods=["GET"])
def get_users():
    return get_all_users()

@app.route('/user', methods=["GET"])
def get_user():
    user_id = int(request.args.get('id'))
    return get_user_details(user_id)

@app.route('/updatesearch', methods=["POST"])
def update_user_searches():
    user_id = int(request.args.get('id'))
    return update_recent_searches(user_id)

@app.route('/updatepreference', methods=["POST"])
def update_user_preference():
    user_id = int(request.args.get('id'))
    return update_preference(user_id)

@app.route('/recommend', methods=["GET"])
def get_recommendations():
    user_id = int(request.args.get('id'))
    return get_products_for_user(user_id)

@app.route('/products', methods=["GET"])
def get_products():
    return get_all_products()

@app.route('/product', methods=["GET"])
def get_product():
    product_id = request.args.get('id')
    return get_product_details(product_id)

#to populate DB purposes
@app.route('/upload', methods=["GET"])
def upload():
    return upload_products()

@app.route('/deleteproducts', methods=["GET"])
def delete_products():
    return clear_products()

if __name__ == "__main__":
    app.run(port=5000, debug=True)
    