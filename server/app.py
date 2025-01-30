from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize CORS
    Config.init_app(app)

    

    # Import models inside create_app function to avoid circular imports
    from models import User, Post, Comment

    # Routes
    @app.route('/')
    def home():
        return jsonify({"message": "Welcome to the Social Media Platform API!"})

    # User Routes
    @app.route('/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200

    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict()), 200

    @app.route('/users', methods=['POST'])
    def create_user():
        data = request.json
        user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=data.get('password')
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201

    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"User {user_id} deleted successfully"}), 200

    # Post Routes
    @app.route('/posts', methods=['GET'])
    def get_posts():
        posts = Post.query.all()
        return jsonify([post.to_dict() for post in posts]), 200

    @app.route('/posts/<int:post_id>', methods=['GET'])
    def get_post(post_id):
        post = Post.query.get_or_404(post_id)
        return jsonify(post.to_dict()), 200

    @app.route('/posts', methods=['POST'])
    def create_post():
        data = request.json
        post = Post(
            content=data.get('content'),
            user_id=data.get('user_id')
        )
        db.session.add(post)
        db.session.commit()
        return jsonify(post.to_dict()), 201

    @app.route('/posts/<int:post_id>', methods=['PUT'])
    def update_post(post_id):
        post = Post.query.get_or_404(post_id)
        data = request.json
        post.content = data.get('content', post.content)
        db.session.commit()
        return jsonify(post.to_dict()), 200

    @app.route('/posts/<int:post_id>', methods=['DELETE'])
    def delete_post(post_id):
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return jsonify({"message": f"Post {post_id} deleted successfully"}), 200

    # Comment Routes
    @app.route('/comments', methods=['GET'])
    def get_comments():
        comments = Comment.query.all()
        return jsonify([comment.to_dict() for comment in comments]), 200

    @app.route('/comments/<int:comment_id>', methods=['GET'])
    def get_comment(comment_id):
        comment = Comment.query.get_or_404(comment_id)
        return jsonify(comment.to_dict()), 200

    @app.route('/comments', methods=['POST'])
    def create_comment():
        data = request.json
        comment = Comment(
            content=data.get('content'),
            user_id=data.get('user_id'),
            post_id=data.get('post_id')
        )
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201

    @app.route('/comments/<int:comment_id>', methods=['PUT'])
    def update_comment(comment_id):
        comment = Comment.query.get_or_404(comment_id)
        data = request.json
        comment.content = data.get('content', comment.content)
        db.session.commit()
        return jsonify(comment.to_dict()), 200

    @app.route('/comments/<int:comment_id>', methods=['DELETE'])
    def delete_comment(comment_id):
        comment = Comment.query.get_or_404(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": f"Comment {comment_id} deleted successfully"}), 200

    # Advanced Views
    @app.route('/users/<int:user_id>/posts', methods=['GET'])
    def get_user_posts(user_id):
        user = User.query.get_or_404(user_id)
        return jsonify([post.to_dict() for post in user.posts]), 200

    @app.route('/posts/<int:post_id>/comments', methods=['GET'])
    def get_post_comments(post_id):
        post = Post.query.get_or_404(post_id)
        return jsonify([comment.to_dict() for comment in post.comments]), 200

    # Error Handling
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error"}), 500

    return app
