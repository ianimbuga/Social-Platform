from faker import Faker
from app import db, create_app

def seed_data():
    from models import User, Post, Comment  # Import models after db initialization
    fake = Faker()

    try:
        # Clear existing data
        Comment.query.delete()
        Post.query.delete()
        User.query.delete()

        # Add Users
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=fake.password()
            )
            db.session.add(user)
            users.append(user)

        db.session.commit()

        # Add Posts
        posts = []
        for user in users:
            for _ in range(3):  # Each user creates 3 posts
                post = Post(
                    content=fake.paragraph(),
                    user_id=user.id
                )
                db.session.add(post)
                posts.append(post)

        db.session.commit()

        # Add Comments
        for post in posts:
            for _ in range(5):  # Each post gets 5 comments
                comment = Comment(
                    content=fake.sentence(),
                    user_id=fake.random_element(users).id,
                    post_id=post.id
                )
                db.session.add(comment)

        db.session.commit()

        print("Seed data successfully added!")

    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    app = create_app()
    with app.app_context():  # Ensure we're in the app context
        seed_data()
