from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

class MongoORM:
    def __init__(self, model_name=None, data=None, db=None):
        now = datetime.now().isoformat()
        self.model_name = model_name
        if data:
            self.data = data
        else:
            self.data = {'updatedAt': now, 'createdAt': now}
        if db:
            self.connect(db)
        else:
            self.collection = False

    def connect(self, db):
        if self.model_name:
            self.collection = db[self.model_name]
            return {"status": True, "data": self.collection}
        else:
            self.collection = None
            return {"status": False, "data": self.collection}

    def get(self, filter, return_data=False):
        if self.collection:
            if "_id" in filter:
                filter['_id'] = ObjectId(filter["_id"])
            find_one_result = self.collection.find_one(filter)
            if find_one_result:
                self.data = find_one_result
                return {"status": True, "data": find_one_result}
            else:
                return {"status": False, "error": "Could not find matching data"}
        else:
            return {"status": False, "error": "Not connected to Database"}
    
    def save(self, return_data = False):
        if self.collection:
            if '_id' in self.data:    
                update_result = self.collection.replace_one({'_id': self.data['_id']}, self.data)
                if update_result.acknowledged:
                    if return_data:
                        return {"status": True, "data": self.data}
                    else:
                        return {"status": True}
                else:
                    return {"status": False, "error": "Update failed in DB"}
            else:
                insert_result = self.collection.insert_one(self.data)
                if insert_result.acknowledged:
                    self.data['_id'] = insert_result.inserted_id
                    if return_data:
                        return {"status": True, "data": self.data}
                    else:
                        return {"status": True, "data": self.data["_id"]}
                else:
                    return {"status": False, "error": "Insert failed in DB"}
        else:
            return {"status": False, "error": "Not connected to Database"}

    def delete(self):
        if self.collection:
            if "_id" in self.data:
                delete_result = self.collection.delete_one({"_id": self.data["_id"]})
                if delete_result.acknowledged:
                    return {"status": True}
                else:
                    return {"status": False, "error": "Delete failed in DB"}
            else:
                return {"status": False, "error": "No record found with that ID"}
        else:
            return {"status": False, "error": "Not connected to Database"}