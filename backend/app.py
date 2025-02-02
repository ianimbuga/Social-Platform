from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Post, Comment, Like
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Instagram-like Social Media API!"})

# User Routes (Auth)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if not all(key in data for key in ("username", "email", "password")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        hashed_password = generate_password_hash(data['password'])
        user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            "message": "User created successfully!",
            "user_id": user.id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not all(key in data for key in ("email", "password")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password, data['password']):
            return jsonify({
                "message": "Login successful!",
                "user_id": user.id
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.all()
        posts_with_comments = []
        
        for post in posts:
            # Fetch the user who created the post
            user = User.query.get(post.user_id)
            poster_username = user.username if user else "Unknown User"  # Add username or handle if user doesn't exist
            
            # Fetch comments related to the post
            comments = Comment.query.filter_by(post_id=post.id).all()
            post_comments = []
            
            for comment in comments:
                # Fetch the user who made the comment
                comment_user = User.query.get(comment.user_id)
                comment_dict = comment.to_dict()
                comment_dict['username'] = comment_user.username if comment_user else "Unknown User"
                post_comments.append(comment_dict)

            post_dict = post.to_dict()
            post_dict['poster_username'] = poster_username  # Add poster username to the post data
            post_dict['comments'] = post_comments
            posts_with_comments.append(post_dict)

        return jsonify(posts_with_comments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
# Route to fetch comments for a specific post
@app.route('/comments/<int:post_id>', methods=['GET'])
def get_comments(post_id):
    try:
        comments = Comment.query.filter_by(post_id=post_id).all()
        return jsonify([comment.to_dict() for comment in comments]), 200
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
