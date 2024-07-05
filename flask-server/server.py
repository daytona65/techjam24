import json
from flask import Flask, Response, jsonify, request
from dotenv import dotenv_values
from bson import json_util, ObjectId
from pymongo import MongoClient
from api.user_service import *
from api.product_service import *

app = Flask(__name__)

# retrieve dotenv config
config = dotenv_values(".env")

# MONGODB
client = MongoClient(config['ATLAS_URI'])
db = client[config['DB_NAME']]
counter_collection = db['counters']

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

if __name__ == "__main__":
	app.run(debug=True)