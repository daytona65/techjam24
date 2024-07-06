from flask import Response, request
import json
from dotenv import dotenv_values
from pymongo import MongoClient
from bson import json_util
import pandas as pd
from utils.utils import error_response, success_response, success_message
from api.dataModels import *
from utils.data_preprocessing import *
from utils.recommender_algo import *

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]

user_collection = db['users']
product_collection = db['products']

data_file_path = 'amazon.csv'

'''
get_products
- all products
- 1 product by id
'''
def get_all_products():
    if request.method == 'GET':
        results = list(product_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")

def get_product_details(product_id):
    if request.method == 'GET':
        results = list(product_collection.find({"product_id": product_id}))
        return json.loads(json.dumps(results[0], default=json_util.default))

'''
get recommendations for users
'''
def get_products_for_user(user_id):
    if request.method == 'GET':
        user_json_string = json.dumps(list(user_collection.find({"user_id": user_id}))[0], default=json_util.default)
        user = json.loads(user_json_string)
        
        # userObj = User(
        #             user["user_id"],
        #             user["name"], 
        #             user["age_group"], 
        #             user["gender"],
        #             user["likes"],
        #             # user["dislikes"],
        #             user["recent_searches"]
        #         )
        
        # # get user's likes, dislikes, recent searches, demographics
        # likes = userObj.likes
        # # dislikes = userObj.dislikes
        # recent_searches = userObj.recent_searches

        #check which case to apply

        #case 1: if new user with no existing likes - use demographics - gender, age
        recommendations = recommend_top_products(data_file_path)


        #case 2: collaborative filtering - what other users have bought
        # recommendations = collaborative_filtering()

        #case 3: content based filtering - find objects that are similar to recent searches


        return recommendations

def upload_products():
    if request.method == 'GET':
        df = preprocess_data(data_file_path)
        cols_to_drop = [
            'user_id', 
            'user_name', 
            'review_id', 
            'review_title', 
            'review_content', 
            'product_link'
        ]

        products = df.drop(columns=cols_to_drop)
        products_list = products.to_dict('records')

        product_collection.insert_many(products_list)
        return success_message("products successfully created!")
    else:
        return error_response("Invalid method[GET/POST]")
    
def clear_products():
    if request.method == 'GET':
        product_collection.delete_many({})

        return success_message("products successfully deleted!")
    else:
        return error_response("Invalid method[DELETE]")
    
