from flask import Response, request, jsonify
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

data_file_path = 'amazon_valid.csv'
processed_data, sim_matrix, p_u_matrix, vectorizer, model, order_centroids, terms = preprocess_data(data_file_path)

'''
get_products
- all products
- 1 product by id
'''
def get_all_products():
    if request.method == 'GET':
        results = list(product_collection.find())
        # formatted_response = {"products": results}
        serialized = json.dumps(results, default=str)
        return jsonify(json.loads(serialized)), 200

def get_product_details(product_id):
    if request.method == 'GET':
        results = list(product_collection.find({"product_id": product_id}))
        return json.loads(json.dumps(results[0], default=json_util.default))

'''
get recommendations for users

case 1: if new user with no existing likes & dislikes
1a. recent_search empty - recommend most popular products
1b. recent search not empty - recommend using past searches 

case 2: have likes - hybrid reco

'''
def get_products_for_user(user_id):
    if request.method == 'GET':
        user_json_string = json.dumps(list(user_collection.find({"user_id": user_id}))[0], default=json_util.default)
        user = json.loads(user_json_string)

        userObj = User(
                    user["user_id"],
                    user["name"], 
                    user["age_group"], 
                    user["gender"],
                    user["likes"],
                    user["dislikes"],
                    user["recent_searches"]
                )
        
        # # get user's likes, dislikes, recent searches, demographics
        likes = userObj.likes
        recent_searches = userObj.recent_searches
        
        if len(likes) == 0:
            if len(recent_searches) == 0:
                print('using cold start recommendation')
                recommendations = recommend_top_products(processed_data)

            else:
                print('using search based recommendation')
                print('search word: ', recent_searches[-1])
                recommendations = search_recommendation(processed_data, recent_searches[-1], vectorizer, model, order_centroids, terms)

        elif len(likes) > 0:
            print('using hybrid recommendation')
            recommendations = hybrid_recommendation(processed_data, likes[-1], sim_matrix, p_u_matrix)

        else: #default
            print('using default recommendation')
            recommendations = recommend_top_products(processed_data)

        return recommendations

def upload_products():
    if request.method == 'GET':
        df, _, _, _, _, _, _ = preprocess_data(data_file_path)
        cols_to_drop = [
            'user_id', 
            'user_name', 
            'review_id', 
            'review_title', 
            'review_content', 
            'product_link',
            'product_name_text',
            'about_product_text',
            'review_content_text',
            'category_text',
        ]

        products = df.drop(columns=cols_to_drop)
        products_list = products.to_dict('records')
        
        for i in products_list:
            product_collection.insert_one(i)

        return success_message("products successfully created!")
    else:
        return error_response("Invalid method[GET/POST]")
    
def clear_products():
    if request.method == 'GET':
        product_collection.delete_many({})

        return success_message("products successfully deleted!")
    else:
        return error_response("Invalid method[DELETE]")
    
