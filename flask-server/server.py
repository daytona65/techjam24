import json
from flask import Flask, Response, jsonify, request
from dotenv import dotenv_values
from bson import json_util, ObjectId
from pymongo import MongoClient
from api.user_service import *
from api.product_service import *
import pandas as pd
from utils.utils import error_response, success_response, success_message


app = Flask(__name__)

# retrieve dotenv config
config = dotenv_values(".env")

# MONGODB
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]

products_collection = db['products']


@app.route("/")
def home():
    return "hello"

@app.route('/user', methods=["GET"])
def get_user():
    userId = int(request.args.get('id'))
    return get_user_details(userId)

@app.route('/recommend', methods=["GET"])
def get_recommendations():
    userId = int(request.args.get('id'))
    return get_products_for_user(userId)

@app.route('/products', methods=["GET"])
def get_products():
    return get_all_products()

#to populate DB purposes
# @app.route('/upload', methods=["GET"])
# def upload_products():
#     if request.method == 'GET':
#         df = pd.read_csv('amazon.csv')
#         products = df.drop(columns=['user_id', 'user_name', 'review_id', 'review_title', 'review_content'])
#         products_list = products.to_dict('records')
#         print('products', len(products_list))
#         # products_collection.delete_many({})
#         products_collection.insert_many(products_list)
#         return success_message("products successfully created!")
#     else:
#         return error_response("Invalid method[GET/POST]")

if __name__ == "__main__":
    app.run(debug=True)