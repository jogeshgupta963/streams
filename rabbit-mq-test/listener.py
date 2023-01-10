import pika,json

url = 'amqps://whltukhs:yA0ZYPXezPfiaJjXRNVuNc0OH1dfsDTd@puffin.rmq2.cloudamqp.com/whltukhs'
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='test')

def callback(ch,method,properties,body):
        # print('recieved in main')
        print(body)
        

channel.basic_consume(queue='video:created',on_message_callback=callback)

print('started listen')
channel.start_consuming()

channel.close()
