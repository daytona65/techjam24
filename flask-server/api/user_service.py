from flask import Response, request
import json
from dotenv import dotenv_values
from pymongo import MongoClient
from bson import json_util, ObjectId
from utils.utils import success_message


config = dotenv_values(".env")
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]

user_collection = db['users']

#retrieve all users
def get_all_users():
    if request.method == 'GET':
        results = list(user_collection.find())
        return Response(json.dumps(results, default=str), mimetype="application/json")


# retrieves one user by id
def get_user_details(user_id):
    if request.method == 'GET':
        results = list(user_collection.find({"user_id": user_id}))
        return json.dumps(results[0], default=json_util.default)


def update_user_preference(user_id, product_id, sentiment):
    if request.method == 'POST':
        results = list(user_collection.find({"user_id": user_id}))
        return json.dumps(results[0], default=json_util.default)


def update_recent_searches(user_id):
    if request.method == 'POST':
        results = list(user_collection.find({"user_id": user_id}))
        print('result', user_id)
        results_id = results[0]['_id']
        post = request.json

        user_collection.find_one_and_update(
            {"_id": ObjectId(results_id)},
            {"$push": {
                "recent_searches": post['search_entry'],
            }})

        message = {"msg": "Successfully updated search entry!"}

        return success_message(message)

