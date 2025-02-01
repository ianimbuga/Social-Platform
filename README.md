
## Social Media Platform
The Social Media Platform is a React-based app where users can create posts, comment, and like content. It uses JSON Server as a mock backend to manage users, posts, comments, and likes. This project includes content creation, and interaction features.

## Table of Contents

* Overview
* Features
* Technologies Used
* Setup and Installation
* Usage
* API Endpoints
* Folder Structure
* Contributing
* License

## Overview

The Social Media Platform allows users to post content, and interact with others through comments and likes.

This project features:

* Post Creation: Users can create posts with text and images.
* Interaction: Comment on and like posts.
* Mock Backend: JSON Server simulates API requests for user, post, comment, and like data.


## Use Case
The Social Platform is designed for users to share posts, comment, and like content. It enables social interactions, content sharing, and engagement, providing a community-driven platform for users to connect and express themselves.

## Features
* Post Creation: Users can create and share posts with text and images.
* Comment System: Add and view comments on posts.
* Like System: Users can like posts.
* CRUD Operations: Full create, read, update, and delete functionality for users, posts, and comments.

## Technlogies Used

* React: JavaScript library for building dynamic user interfaces.
* JSON Server: Mock backend to simulate REST API for data management (users, posts, comments, likes).
* CSS Modules: Scoped styles for better maintainability and isolation.
* React Hooks: State management with useState and side effects with useEffect.
## Setup and Installation

To run this project locally, follow these steps:
# Prerequisites
* Node.js installed on your machine.

1. Clone the repository
git clone https://github.com/ianimbuga/Social-Platform.git
cd Social platform

2. Install dependencies
npm install

3. Set up JSON Server 
Social Platform JSON Server is used to simulate the backend for data management, including users, posts, comments, and likes. It allows you to mock a REST API for the project without needing a full backend setup initially.

To install it globally, run:
npm install -g json-server

4. Start the React App
Finally, run the React development server:
npm start

## Usage
Once the project is up and running, you can interact with it as follows:
1. Create Posts: Registered users can create posts by providing text content. Posts are saved to the backend and displayed to other users.

2. View Comments: Each post can have multiple comments, and users can view all the comments under each post.

3. Add Comments: Users can add comments to any post by typing in a text input box below the post. The comment will be added to the post.

4. Like Posts: Users can like a post by clicking a "Like" button. The number of likes will be updated accordingly.


## API Endpoints
The Social Media Platform uses a mock API (JSON Server) to simulate backend functionality. The following endpoints are available:

* POST /comments: Creates a new comment.

*  POST /posts: Creates a new post.

* PUT /users/{id}: Updates a user's information.

* POST /likes: Likes a post.

## Folder Structure
instagram-like-social-media-platform/
│
├── backend/                        # Backend directory (Flask API)
│   ├── app.py                      # Main file for the Flask application
│   ├── config.py                   # Configuration settings (e.g., database URI, environment)
│   ├── models.py                   # Database models for User, Post, Comment, Like
│   ├── migrations/                 # Folder for Flask-Migrate migrations
│   ├── requirements.txt            # List of Python dependencies (Flask, SQLAlchemy, etc.)
│   └── .env                        # Environment variables (e.g., database URL, secret keys)
│
├── frontend/                       # Frontend directory (React application)
│   ├── public/                     # Public folder for static assets like index.html
│   │   └── index.html              # Main HTML file
│   ├── src/                        # Source code folder for React components
│   │   ├── App.js                  # Main React component for routing
│   │   ├── components/             # Folder for UI components
│   │   │   ├── Navbar.js           # Navigation bar component
│   │   │   ├── PostList.js         # Component to list posts
│   │   │   ├── CommentList.js      # Component to list comments under a post
│   │   │   ├── CommentForm.js      # Form to add a new comment
│   │   │   ├── Post.js             # Component for creating new posts
│   │   │   └── UserList.js         # Component to list users
│   │   ├── api/                    # Folder for API interaction logic (axios requests)
│   │   │   └── api.js              # API call functions (GET, POST, DELETE for posts, comments, etc.)
│   │   ├── App.css                 # Global CSS file for styling
│   │   └── index.js                # Entry point for the React app
│   ├── package.json                # React app dependencies, scripts, and metadata
│   ├── .gitignore                  # Git ignore file to exclude certain files/folders from version control
│   └── README.md                   # Project description, setup instructions, and documentation
│
├── .gitignore                      # Git ignore file (for both backend and frontend)
└── README.md                       # Root level project README (can be an overview of the project)

xfvb

## Contributing

We welcome contributions! If you'd like to improve or extend Social Platform, feel free to fork the repository, create a new branch, and submit a pull request.

# Steps to Contribute
1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes.
4. Commit your changes (git commit -m 'Add feature').
5. Push to your branch (git push origin feature-name).
6. Submit a pull request.

## License
The content of this project is licensed under the MIT license Copyright (c) 2025.
