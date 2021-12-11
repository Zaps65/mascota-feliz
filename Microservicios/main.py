import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask, request
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

load_dotenv(find_dotenv())
app = Flask(__name__)

@app.route('/')
def index():
    return 'Microservicio de mensajeria para la app Mascota Feliz. '

@app.route('/send_sms/', methods=['GET', 'POST'])
def send_sms():
    try:
        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        client = Client(account_sid, auth_token)


        message = client.messages.create(
            to = '+57'+request.args.get('to'),
            from_ =os.getenv('TWILIO_PHONE_NUMBER'),
            body = request.args.get('body')
        )
        print(message.sid)
        return "Mensaje enviado"
    except Exception as e:
        return str(e)

@app.route('/send_email/', methods=['GET', 'POST'])
def send_email():

    message = Mail(
        from_email=os.getenv('SENDGRID_EMAIL'),
        to_emails=request.args.get('to'),
        subject=request.args.get('subject'),
        html_content=request.args.get('body'),
    )

    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Enviando email"
    except Exception as e:
        return str(e.message)

if __name__ == '__main__':
    app.run(debug=True)


