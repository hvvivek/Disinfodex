from flask import Flask, request
from flask_cors import CORS
import json
import os
import logging
from pymongo import MongoClient
from flask import jsonify
from bson.objectid import ObjectId

# # Get port from env variable, use 3010 otherwise
port = os.environ.get('PORT', 3010)

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


##############################################################################################
logging.basicConfig(level=logging.DEBUG)

mongo_endpoint = os.environ.get(
    'MONGO_ENDPOINT', 'mongodb://localhost:27017/naya-app-database-v1?retryWrites=false')
mongo_db = os.environ.get('MONGO_DB', 'naya-app-database-v1')
db = MongoClient(mongo_endpoint)[mongo_db]
#############################################################################################



@app.route('/', methods=['GET'])
def all_routes():
    headers = {'Content-Type': 'application/json'}
    return {
        "/disclosure": "GET, POST, PUT, DELETE"
    }, 200, headers

# Routes for Signed Contract Content
@app.route('/disclosure', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_signed_contract():

    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        return_result = jsonify({"TODO":"Read disclosure by filter in params"}), 200, headers

    elif request.method == 'POST':
        return_result = jsonify({"TODO":"Create disclosure by data in payload"}), 200, headers


    elif request.method == 'PUT':
        return_result = jsonify({"TODO":"Update disclosure by data in payload"}), 200, headers

        
    elif request.method == 'DELETE':
        return_result = jsonify({"TODO":"Delete disclosure by data in payload"}), 200, headers


    return return_result



# app.run()
if __name__ == '__main__':
    debug = False
    if os.getenv('FLASK_ENV') != 'production':
        # Development server
        debug = True
    app.run(host='0.0.0.0', port=port, debug=debug)