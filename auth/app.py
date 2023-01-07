from flask import Flask
from extensions import mongo
from auth.route import auth

app = Flask(__name__)


# app.config["MONGO_URI"] = "mongodb://172.17.0.2:27017/myDatabase"
app.config["MONGO_URI"] = "mongodb://admin-mongo-srv:27017/myDatabase"
mongo.init_app(app)
app.register_blueprint(auth)


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)