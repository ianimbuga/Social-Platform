from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Post, Comment, Like
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Instagram-like Social Media API!"})

# User Routes
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if not all(key in data for key in ("username", "email", "password")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        user = User(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Post Routes
@app.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        return jsonify([post.to_dict() for post in posts]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json
    if not all(key in data for key in ("content", "user_id")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        post = Post(
            content=data['content'],
            image_url=data.get('image_url'),
            user_id=data['user_id']
        )
        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Comment Routes
@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.json
    if not all(key in data for key in ("content", "user_id", "post_id")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        comment = Comment(
            content=data['content'],
            user_id=data['user_id'],
            post_id=data['post_id']
        )
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Like Routes
@app.route('/likes', methods=['POST'])
def create_like():
    data = request.json
    if not all(key in data for key in ("user_id", "post_id")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        like = Like(
            user_id=data['user_id'],
            post_id=data['post_id']
        )
        db.session.add(like)
        db.session.commit()
        return jsonify(like.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
