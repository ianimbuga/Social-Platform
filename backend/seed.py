from faker import Faker
from models import db, User, Post, Comment, Like
from app import app

faker = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Seed Users
    users = []
    for _ in range(10):
        user = User(
            username=faker.user_name(),
            email=faker.email(),
            password=faker.password()
        )
        db.session.add(user)
        users.append(user)

    db.session.commit()

    # Seed Posts
    posts = []
    for _ in range(15):
        post = Post(
            content=faker.sentence(),
            image_url=faker.image_url(),
            user_id=faker.random.choice(users).id
        )
        db.session.add(post)
        posts.append(post)

    db.session.commit()

    # Seed Comments
    for _ in range(30):
        comment = Comment(
            content=faker.sentence(),
            user_id=faker.random.choice(users).id,
            post_id=faker.random.choice(posts).id
        )
        db.session.add(comment)

    db.session.commit()

    # Seed Likes
    for _ in range(50):
        like = Like(
            user_id=faker.random.choice(users).id,
            post_id=faker.random.choice(posts).id
        )
        db.session.add(like)

    db.session.commit()
