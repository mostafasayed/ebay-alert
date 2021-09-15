import pika
import json


MQ_URL = 'rabbitmq'
QUEUE = 'cheapest_insights_queue'


def consume_one_message():
    connection = pika.BlockingConnection(pika.ConnectionParameters(MQ_URL))
    channel = connection.channel()

    # Consume only one message at a time
    method_frame, _, data = channel.basic_get(queue=QUEUE)
    if not method_frame:
        connection.close()
        return ''
    else:
        channel.basic_ack(delivery_tag=method_frame.delivery_tag)
        connection.close()
        try:
            return json.loads(data)
        except:
            return data
