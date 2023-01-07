from functools import wraps
import jwt
from flask import request
from extentions import mongo

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
           
            if not data['isAdmin']:
                 return {
                "message": "No Admin Access!",
                "data": None,
                "error": "Unauthorized"
            }, 401

        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f( *args, **kwargs)

    return decorated