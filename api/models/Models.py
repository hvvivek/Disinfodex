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

    def get(self, filter, project=None, return_data=False):
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
        now = datetime.now().isoformat()
        if self.collection:
            if '_id' in self.data:  
                self.data["updatedAt"] = now  
                update_result = self.collection.replace_one({'_id': self.data['_id']}, self.data)
                if update_result.acknowledged:
                    if return_data:
                        return {"status": True, "data": self.data}
                    else:
                        return {"status": True}
                else:
                    return {"status": False, "error": "Update failed in DB"}
            else:
                self.data["createdAt"] = now
                self.data["updatedAt"] = now
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



class Platforms(MongoORM):
    # Schema:
        # name - String
        # content_type - String (HTML, Attachment)
        # html_content - String
        # attachments - [String]
    def __init__(self, data=None, db=None):
        MongoORM.__init__(self, model_name="Platforms", data=data, db=db)

    def get_sync_ids(self):
        results = self.collection.find({}, projection={'_id': False, 'sync_id': True})
        # results = [result for result in results]
        results = [result['sync_id'] for result in results]
        return results

    def delete_filter(self, filter):
        if self.collection:
            delete_result = self.collection.delete_many(filter)
            if delete_result.acknowledged:
                return {"status": True, "count": delete_result.deleted_count}
            else:
                return {"status": False, "error": "Deleted failed in DB"}
        else:
            return {"status": False, "error": "Not connected to Database"}

class ThirdPartyReports(MongoORM):
    # Schema:
        # name - String
        # content_type - String (HTML, Attachment)
        # html_content - String
        # attachments - [String]
    def __init__(self, data=None, db=None):
        MongoORM.__init__(self, model_name="ThirdPartyReports", data=data, db=db)
        
    def get_sync_ids(self):
        results = self.collection.find({}, projection={'_id': False, 'sync_id': True})
        # results = [result for result in results]
        results = [result['sync_id'] for result in results]
        return results

    def delete_filter(self, filter):
        if self.collection:
            delete_result = self.collection.delete_many(filter)
            if delete_result.acknowledged:
                return {"status": True, "count": delete_result.deleted_count}
            else:
                return {"status": False, "error": "Deleted failed in DB"}
        else:
            return {"status": False, "error": "Not connected to Database"}

class Screenshots(MongoORM):
    # Schema:
        # name - String
        # content_type - String (HTML, Attachment)
        # html_content - String
        # attachments - [String]
    def __init__(self, data=None, db=None):
        MongoORM.__init__(self, model_name="Screenshots", data=data, db=db)
        
    def get_sync_ids(self):
        results = self.collection.find({}, projection={'_id': False, 'sync_id': True})
        # results = [result for result in results]
        results = [result['sync_id'] for result in results]
        return results

    def delete_filter(self, filter):
        if self.collection:
            delete_result = self.collection.delete_many(filter)
            if delete_result.acknowledged:
                return {"status": True, "count": delete_result.deleted_count}
            else:
                return {"status": False, "error": "Deleted failed in DB"}
        else:
            return {"status": False, "error": "Not connected to Database"}

class Companies(MongoORM):
    # Schema:
        # name - String
        # content_type - String (HTML, Attachment)
        # html_content - String
        # attachments - [String]
    def __init__(self, data=None, db=None):
        MongoORM.__init__(self, model_name="Companies", data=data, db=db)
        
    def get_sync_ids(self):
        results = self.collection.find({}, projection={'_id': False, 'sync_id': True})
        # results = [result for result in results]
        results = [result['sync_id'] for result in results]
        return results

    def delete_filter(self, filter):
        if self.collection:
            delete_result = self.collection.delete_many(filter)
            if delete_result.acknowledged:
                return {"status": True, "count": delete_result.deleted_count}
            else:
                return {"status": False, "error": "Deleted failed in DB"}
        else:
            return {"status": False, "error": "Not connected to Database"}

class Networks(MongoORM):
    # Schema:
        # name - String
        # content_type - String (HTML, Attachment)
        # html_content - String
        # attachments - [String]
    def __init__(self, data=None, db=None):
        MongoORM.__init__(self, model_name="Networks", data=data, db=db)
        
    def get_sync_ids(self):
        results = self.collection.find({}, projection={'_id': False, 'sync_id': True})
        # results = [result for result in results]
        results = [result['sync_id'] for result in results]
        return results

    def delete_filter(self, filter):
        if self.collection:
            delete_result = self.collection.delete_many(filter)
            if delete_result.acknowledged:
                return {"status": True, "count": delete_result.deleted_count}
            else:
                return {"status": False, "error": "Deleted failed in DB"}
        else:
            return {"status": False, "error": "Not connected to Database"}

class Sync(MongoORM):
    # Schema:
        # name - String
        # content_type - String (HTML, Attachment)
        # html_content - String
        # attachments - [String]
    def __init__(self, data=None, db=None):
        MongoORM.__init__(self, model_name="Sync", data=data, db=db)

    def get_all(self):
        results = self.collection.find({})
        results = [result for result in results]
        for result in results:
            result["_id"] = str(result["_id"])
        return results
