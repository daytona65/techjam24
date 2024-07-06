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

#think if we want to bulk update a whole set of items or one item at a time
# can just loop the array from frontend
# check if item alr in either array then need to move
# eg if itemX is alr in likes but user updates to dislike -> will update
def update_preference(user_id):
    if request.method == 'POST':
        results = list(user_collection.find({"user_id": user_id}))
        results_id = results[0]['_id']
        post = request.json
        preference = {}

        if post['sentiment'] == "like":
            preference = {"likes": post['product_id']}
        else:
            preference = {"dislikes": post['product_id']}
        
        user_collection.find_one_and_update(
            {"_id": ObjectId(results_id)},
            {"$push": preference})

        message = {"msg": "Successfully updated user preferences!"}

        return success_message(message)


def update_recent_searches(user_id):
    if request.method == 'POST':
        results = list(user_collection.find({"user_id": user_id}))
        results_id = results[0]['_id']
        post = request.json

        user_collection.find_one_and_update(
            {"_id": ObjectId(results_id)},
            {"$push": {
                "recent_searches": post['search_entry'],
            }})

        message = {"msg": "Successfully updated search entry!"}

        return success_message(message)

