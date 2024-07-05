from flask import Response, request
import json
from dotenv import dotenv_values
from pymongo import MongoClient
from bson import json_util, ObjectId

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
def get_user_details(userId):
    if request.method == 'GET':
        results = list(user_collection.find({"userId": userId}))
        return json.dumps(results[0], default=json_util.default)


