from functools import wraps
import jwt
from flask import request
import bson
from extensions import mongo

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        
        token = request.cookies.get("JWT")
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token,"zxcvbnm", algorithms=["HS256"])
            current_user = mongo.db.users.find_one({
                "_id":bson.ObjectId(oid=data["id"])
                })
            if current_user is None:
                return {
                "message": "Invalid Authentication token!",
                "data": None,
                "error": "Unauthorized"
            }, 401
            current_user['_id'] = str(current_user['_id'])
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)

    return decorated