from flask import Response, request
import json
from dotenv import dotenv_values
from pymongo import MongoClient
from bson import json_util, ObjectId
import numpy as np
import pandas as pd

from api.dataModels import *

config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]

user_collection = db['users']
product_collection = db['products']

def get_all_products():
    if request.method == 'GET':
        results = list(product_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")

def get_product(productId):
    #return product details - productId, title, url, price, image_url
    #look up from database

    return 


'''
get recommendations for users

return format:
[
    {
        productId:
        title
    },
    ...
]
'''
def get_products_for_user(userId):
    if request.method == 'GET':
        user_json_string = json.dumps(list(user_collection.find({"userId": userId}))[0], default=json_util.default)
        user = json.loads(user_json_string)
        
        userObj = User(
                    user["userId"],
                    user["name"], 
                    user["age_group"], 
                    user["gender"],
                    # user["likes"],
                    # user["dislikes"],
                    user["recent_searches"]
                )
        
        # get user's likes, dislikes, recent searches, demographics
        # likes = userObj.likes
        # dislikes = userObj.dislikes
        recent_searches = userObj.recent_searches

        #check which case to apply

        #case 1: if new user with no existing likes - use demographics - gender, age
        recommended_pdt_ids = recommend_top_products()


        #case 2: collaborative filtering - what other users have bought
        # recommendations = collaborative_filtering()

        #case 3: content based filtering - find objects that are similar to recent searches

        recommendations = []
        for productId in recommended_pdt_ids:
            product = get_product(productId)
            recommendations.append(product)

        return recommendations
    
def preprocess_data(data_file_path):
    df = pd.read_csv(data_file_path)
    df = df.dropna()

    print('df shape: ', df.shape)

    return df

def recommend_top_products(data_file_path):
    product_ratings = preprocess_data(data_file_path)
    popular_products = pd.DataFrame(product_ratings.groupby('ProductId')['Rating'].count)
    most_popular = popular_products.sort_values('Rating', ascending=False)

    #return top 10 most popular product IDs 
    return most_popular['ProductId'].tolist()[:10]



def collaborative_filtering():
    return 


