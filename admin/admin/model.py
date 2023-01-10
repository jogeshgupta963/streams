from flask import request,jsonify,make_response
from extentions import mongo
import boto3
from werkzeug.utils import secure_filename
from publisher import publish



class Admin():
    def createVideo(self):
        # init s3
        s3 = boto3.client('s3',
                    aws_access_key_id='AKIA24BX2W3TLRNNYBXN',
                    aws_secret_access_key= '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',
                    )

        BUCKET_NAME='blogportalwebsite'

         # reading req 
        # data = request.get_json()
        data= request.form.to_dict()
        # validating data
        if not data['name'] and not data['released'] and not data['description'] and not data['genre'] :
            return jsonify({
                "error":"Invalid data"
        })
        print("file get")
        #getting video
        vid = request.files['video']
        if not vid:
            return jsonify({
                "error":"invalid video"
            })

        filename = secure_filename(data['name'])
        vid.save(filename)
    
        s3.upload_file(filename,BUCKET_NAME,filename,ExtraArgs={
                "ContentType": vid.content_type
            })
        
        print("to iinsert")
        #querying mongo
        data['video'] = data['name']
        resp = mongo.db.videos.insert_one(data)
        data['_id'] = str(resp.inserted_id)
        
        print(data)
        publish('video-created',data)
        # res = make_response(data)
        
        return data

  

