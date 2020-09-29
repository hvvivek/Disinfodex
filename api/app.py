from flask import Flask, request
from flask_cors import CORS
import json
import os
import logging
from pymongo import MongoClient
from flask import jsonify
from bson.objectid import ObjectId

from models.Models import Disclosure
from models.Models import Sync

# # Get port from env variable, use 3010 otherwise
port = os.environ.get('PORT', 3010)

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


##############################################################################################
logging.basicConfig(level=logging.DEBUG)

mongo_endpoint = os.environ.get(
    'MONGO_ENDPOINT', 'mongodb://localhost:27017')
mongo_db = os.environ.get('MONGO_DB', 'disinfodex-db-v1')
print(mongo_db)
db = MongoClient(mongo_endpoint)[mongo_db]
print(db)
#############################################################################################



@app.route('/', methods=['GET'])
def all_routes():
    headers = {'Content-Type': 'application/json'}
    return {
        "/disclosure": "GET, POST, PUT, DELETE"
    }, 200, headers

# Routes for Disclosure Content
@app.route('/disclosure', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_disclosure():

    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        if "count" in request.args.to_dict():
            disclosure = Disclosure(db=db)
            sync_ids = disclosure.get_sync_ids()
            print(sync_ids)
            return_result = jsonify({"sync_ids": sync_ids}), 200, headers
        else:
            disclosure = Disclosure(db=db)
            disclosure = disclosure.get(request.args.to_dict())
            if "data" in disclosure and "_id" in disclosure["data"]:
                disclosure["data"]["_id"] = str(disclosure["data"]["_id"])
            return_result = jsonify(disclosure), 200, headers

    elif request.method == 'POST':
        # if "sync_id" in request.get_json():
        #     print("Trying sync")
        #     disclosure = Disclosure(db=db)
        #     disclosure.get({"sync_id":request.get_json()["sync_id"]})
        #     for key, value in request.get_json().items():
        #         if key != "_id":
        #             disclosure.data[key] = value
        #     disclosure = disclosure.save(return_data=True)
        #     if "data" in disclosure and "_id" in disclosure["data"]:
        #         disclosure["data"]["_id"] = str(disclosure["data"]["_id"])
        #     print(disclosure)
        #     return_result = jsonify(disclosure), 200, headers
        
        # else:
        
        new_disclosure = Disclosure(data=request.get_json(), db=db)
        new_disclosure = new_disclosure.save(return_data=True)
        print(new_disclosure)
        if "data" in new_disclosure and "_id" in new_disclosure["data"]:
            new_disclosure["data"]["_id"] = str(new_disclosure["data"]["_id"])
        return_result = jsonify(new_disclosure), 200, headers
        
        

    elif request.method == 'PUT':
        disclosure = Disclosure(db=db)
        disclosure.get({"_id":request.get_json()["_id"]})
        for key, value in request.get_json().items():
            if key != "_id":
                disclosure.data[key] = value
        disclosure = disclosure.save(return_data=True)
        if "data" in disclosure and "_id" in disclosure["data"]:
            disclosure["data"]["_id"] = str(disclosure["data"]["_id"])
        return_result = jsonify(disclosure), 200, headers
        
    elif request.method == 'DELETE':
        if "_id" in request.args.to_dict():
            disclosure = Disclosure(db=db)
            disclosure.get(request.args.to_dict())
            result = disclosure.delete()
            return_result = jsonify(result), 200, headers
        else:
            disclosure = Disclosure(db=db)
            result = disclosure.delete_filter(request.args.to_dict())
            return_result = jsonify(result), 200, headers

    return return_result


# Routes for Disclosure Content
@app.route('/sync', methods=['GET', 'POST', 'PUT'])
def route_sync():

    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        sync = Sync(db=db)
        if "all" in request.args.to_dict():
            results = sync.get_all()
            return_result = jsonify(results), 200, headers
        else:
            sync = sync.get(request.args.to_dict())
            if "data" in sync and "_id" in sync["data"]:
                sync["data"]["_id"] = str(sync["data"]["_id"])
            return_result = jsonify(sync), 200, headers

    elif request.method == 'POST':
        new_sync = Sync(data=request.get_json(), db=db)
        new_sync = new_sync.save(return_data=True)
        print(new_sync)
        if "data" in new_sync and "_id" in new_sync["data"]:
            new_sync["data"]["_id"] = str(new_sync["data"]["_id"])
        return_result = jsonify(new_sync), 200, headers

    elif request.method == 'PUT':
        sync = Sync(db=db)
        sync.get({"_id":request.get_json()["_id"]})
        for key, value in request.get_json().items():
            if key != "_id":
                sync.data[key] = value
        sync = sync.save(return_data=True)
        if "data" in sync and "_id" in sync["data"]:
            sync["data"]["_id"] = str(sync["data"]["_id"])
        return_result = jsonify(sync), 200, headers
    return return_result



# app.run()
if __name__ == '__main__':
    debug = False
    if os.getenv('FLASK_ENV') != 'production':
        # Development server
        debug = True
    app.run(host='0.0.0.0', port=port, debug=debug)