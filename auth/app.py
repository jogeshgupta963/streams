from flask import Flask
from extensions import mongo


app = Flask(__name__)


app.config["MONGO_URI"] = "mongodb://172.17.0.3:27017/myDatabase"
mongo.init_app(app)


if __name__ == "__main__":
    app.run(debug=True)