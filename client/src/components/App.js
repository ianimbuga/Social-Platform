import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import UserList from "./UserList";
import PostList from "./PostList";
import PostForm from "./PostForm"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/posts" render={() => <>
            <PostForm />
            <PostList />
          </>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
