import pika,json

url = 'amqps://whltukhs:yA0ZYPXezPfiaJjXRNVuNc0OH1dfsDTd@puffin.rmq2.cloudamqp.com/whltukhs'
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

def publish(queueName,body):
    # properties = pika.BasicProperties(method)
    
    channel.basic_publish(exchange='',routing_key=queueName,body=json.dumps(body))