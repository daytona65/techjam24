import json
import time
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
data_file_path = 'amazon_valid.csv'

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
    start_time = time.time()
    user_id = int(request.args.get('id'))
    result = get_user_details(user_id)

    end_time = time.time()
    execution_time = end_time - start_time
    print('time taken to run /user', execution_time)

    return result

@app.route('/updatesearch', methods=["POST"])
def update_user_searches():
    start_time = time.time()
    user_id = int(request.args.get('id'))
    result = update_recent_searches(user_id)
    end_time = time.time()
    execution_time = end_time - start_time

    print('time taken to run /updatesearch', execution_time)
    return result

@app.route('/updatepreference', methods=["POST"])
def update_user_preference():
    start_time = time.time()
    user_id = int(request.args.get('id'))
    result = update_preference(user_id)

    end_time = time.time()
    execution_time = end_time - start_time

    print('time taken to run /updatepreference', execution_time)
    return result

@app.route('/recommend', methods=["GET"])
def get_recommendations():
    start_time = time.time()
    user_id = int(request.args.get('id'))
    result = get_products_for_user(user_id)
    end_time = time.time()
    execution_time = end_time - start_time
    print('time taken to run /recommend', execution_time)
    return result

@app.route('/products', methods=["GET"])
def get_products():
    return get_all_products()

@app.route('/product', methods=["GET"])
def get_product():
    start_time = time.time()

    product_id = request.args.get('id')
    result = get_product_details(product_id)

    end_time = time.time()
    execution_time = end_time - start_time
    print('time taken to run /product', execution_time)
    return result

#to populate DB purposes
@app.route('/upload', methods=["GET"])
def upload():
    return upload_products()

@app.route('/deleteproducts', methods=["GET"])
def delete_products():
    return clear_products()

if __name__ == "__main__":
    app.run(port=5000, debug=True)
    