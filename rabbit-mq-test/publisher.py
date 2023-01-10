import pika,json

url = 'amqps://whltukhs:yA0ZYPXezPfiaJjXRNVuNc0OH1dfsDTd@puffin.rmq2.cloudamqp.com/whltukhs'
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

def publish(method,body):
    # properties = pika.BasicProperties(method)
    dict= {
        "_id":"63b8a0ed5cbdc5eb6fde0a4b",
        "name":"spidey",
        "description":"spiderman",
        "video":"location",
        "released":"idk",
        "genre":"sci-fi"
    }
    channel.basic_publish(exchange='',routing_key='video:created',body=json.dumps(dict))

publish('created',"hello")