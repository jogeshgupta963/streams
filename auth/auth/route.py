from flask import Blueprint
from auth.model import Auth
from middleware.middleware import token_required

auth = Blueprint('auth',__name__)


@auth.route('/signup',methods=["POST"])
def signup():
    user =  Auth()
    return user.signup()



@auth.route('/login',methods=["POST"])
def login():
    user = Auth()
    return user.login()

@auth.route('/user')
@token_required
def getUser(current_user):
    user = Auth()
    return user.getUser(current_user)