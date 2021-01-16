from flask import Flask, request
from flask_cors import CORS
import json
import os
import logging
from pymongo import MongoClient
from flask import jsonify
from bson.objectid import ObjectId

from models.Models import Platforms
from models.Models import ThirdPartyReports
from models.Models import Screenshots
from models.Models import Companies
from models.Models import Networks

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



# Create
def create_record(request, Model, db, headers):
    new_record = Model(data=request.get_json(), db=db)
    new_record = new_record.save(return_data=True)
    print(new_record)
    if "data" in new_record and "_id" in new_record["data"]:
        new_record["data"]["_id"] = str(new_record["data"]["_id"])
    return_result = jsonify(new_record), 200, headers
    return return_result

# Read
def read_record(request, Model, db, headers):
    if "count" in request.args.to_dict():
        record = Model(db=db)
        sync_ids = record.get_sync_ids()
        print(sync_ids)
        return_result = jsonify({"sync_ids": sync_ids}), 200, headers
    elif "all" in request.args.to_dict():
        records = Model(db=db)
        records = records.get_multiple_records()
        return_result = jsonify(records), 200, headers
    else:
        record = Model(db=db)
        record = record.get(request.args.to_dict())
        if "data" in record and "_id" in record["data"]:
            record["data"]["_id"] = str(record["data"]["_id"])
        return_result = jsonify(record), 200, headers
    return return_result

# Update
def update_record(request, Model, db, headers):
    record = Model(db=db)
    record.get({"_id":request.get_json()["_id"]})
    for key, value in request.get_json().items():
        if key != "_id":
            record.data[key] = value
    record = record.save(return_data=True)
    if "data" in record and "_id" in record["data"]:
        record["data"]["_id"] = str(record["data"]["_id"])
    return_result = jsonify(record), 200, headers
    return return_result

# Delete
def delete_record(request, Model, db, headers):
    if "_id" in request.args.to_dict():
        record = Model(db=db)
        record.get(request.args.to_dict())
        result = record.delete()
        return_result = jsonify(result), 200, headers
    else:
        record = Model(db=db)
        result = record.delete_filter(request.args.to_dict())
        return_result = jsonify(result), 200, headers
    return return_result

# Delete
def count_records(Model, db):
    record = Model(db=db)
    result = record.get_total_rows()
    return result


# Routes for Platform Content
@app.route('/platforms', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_platform():
    Model = Platforms
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        return_result = read_record(request, Model, db, headers)

    elif request.method == 'POST':
        return_result = create_record(request, Model, db, headers)

    elif request.method == 'PUT':
        return_result = update_record(request, Model, db, headers)

    elif request.method == 'DELETE':
        return_result = delete_record(request, Model, db, headers)

    return return_result

# Routes for Third Party Reports Content
@app.route('/third_party_reports', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_third_party_reports():
    Model = ThirdPartyReports
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        return_result = read_record(request, Model, db, headers)

    elif request.method == 'POST':
        return_result = create_record(request, Model, db, headers)

    elif request.method == 'PUT':
        return_result = update_record(request, Model, db, headers)

    elif request.method == 'DELETE':
        return_result = delete_record(request, Model, db, headers)

    return return_result


# Routes for Screenshots Content
@app.route('/screenshots', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_screenshots():
    Model = Screenshots
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        return_result = read_record(request, Model, db, headers)

    elif request.method == 'POST':
        return_result = create_record(request, Model, db, headers)

    elif request.method == 'PUT':
        return_result = update_record(request, Model, db, headers)

    elif request.method == 'DELETE':
        return_result = delete_record(request, Model, db, headers)

    return return_result

# Routes for Companies Content
@app.route('/companies', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_companies():
    Model = Companies
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        return_result = read_record(request, Model, db, headers)

    elif request.method == 'POST':
        return_result = create_record(request, Model, db, headers)

    elif request.method == 'PUT':
        return_result = update_record(request, Model, db, headers)

    elif request.method == 'DELETE':
        return_result = delete_record(request, Model, db, headers)

    return return_result

# Routes for Networks Content
@app.route('/networks', methods=['GET', 'POST', 'PUT', 'DELETE'])
def route_networks():
    Model = Networks
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        return_result = read_record(request, Model, db, headers)

    elif request.method == 'POST':
        return_result = create_record(request, Model, db, headers)

    elif request.method == 'PUT':
        return_result = update_record(request, Model, db, headers)

    elif request.method == 'DELETE':
        return_result = delete_record(request, Model, db, headers)

    return return_result

# Routes for Sync records
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

@app.route('/stats', methods=['GET'])
def route_stats():
    headers = {'Content-Type': 'application/json'}
    if request.method == 'GET':
        models = {"Platform Reports": Platforms, "Screenshots": Screenshots, "Networks": Networks}
        results = {}
        for model_name, model in models.items():
            results[model_name] = count_records(model, db)
    return_result = jsonify(results), 200, headers
    return return_result


# app.run()
if __name__ == '__main__':
    debug = False
    if os.getenv('FLASK_ENV') != 'production':
        # Development server
        debug = True
    app.run(host='0.0.0.0', port=port, debug=debug)