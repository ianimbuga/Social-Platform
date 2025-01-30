import os
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# Initialize the extensions
db = SQLAlchemy()
migrate = Migrate()

class Config:
    # Database URI (defaults to SQLite if not set in environment variable)
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    
    # Disable tracking of modifications for performance reasons
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Secret key for session management (set in environment variable or default)
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')

    # Enable debug mode for development
    DEBUG = True

    # Configure allowed origins for CORS (set to '*' to allow all by default)
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*')

    @staticmethod
    def init_app(app):
        # Initialize CORS with the allowed origins
        CORS(app, origins=Config.CORS_ORIGINS)
