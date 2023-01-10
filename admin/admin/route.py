from flask import Blueprint
from middlewares.loggedIn import token_required
from admin.model import Admin

admin = Blueprint('admin',__name__)


@admin.route('/api/admin/video',methods=["POST"])
@token_required
def createVideo():
    video = Admin()
    return video.createVideo()


# @admin.route('/api/admin',methods=['GET'])
# def indexRoute():
#     return "server is running"