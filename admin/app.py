from flask import Flask
from extentions import mongo
from admin.route import admin

app = Flask(__name__)


app.config["MONGO_URI"] = "mongodb://auth-mongo-srv:27017/myDatabase"
mongo.init_app(app)
app.register_blueprint(admin)


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)