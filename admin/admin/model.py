from flask import request,jsonify,make_response
from extentions import mongo
import jwt

class Admin():
    def createVideo(self):

         # reading req 
        data = request.get_json()
        # validating data
        if not data['name'] and not data['released'] and not data['video'] and not data['description'] and not data['genre'] :
            return jsonify({
                "error":"Invalid data"
        })
          
        #querying mongo
        resp = mongo.db.users.insert_one(data)
        data['_id'] = str(resp.inserted_id)

        
        res = make_response(data)
        
        return res

  

