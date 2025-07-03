import os
import logging
from flask import Flask
from flask_login import LoginManager
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'index'
login_manager.login_message = 'Please log in to access this page.'
login_manager.login_message_category = 'info'

# Import models and routes
from models import User, users, books, transactions, activity_logs
from routes import *

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)