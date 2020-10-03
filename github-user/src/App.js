import React from 'react';
import axios from 'axios';
import './App.css';

import UserCard from './Components/UserCard';
import FollowerCard from './Components/FollowerCard';

const followers = [];
const user = [];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      user: [],
      followers: []
    };
  };
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      ...this.state,
      username: e.target.value
    });
  };

  componentDidMount() {
    console.log("Component did mount");
    axios
      .get(`https://api.github.com/users/Veilios`)
      .then((res) => {
        console.log("Res", res.data)
        this.setState({
          ...this.state,
          user: res.data.login
        });
        console.log("User", user);
        console.log("Followers", followers);
      })
      .catch((err) => console.log("Error 1", err));
      ;
  };

  componentDidUpdate(PrevState) {
    console.log("Component did Update");
    if (PrevState !== this.state.user) {
      console.log("User has changed")
    }
  };

  getUser = () => {
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then((res) => {
        this.setState({
          ...this.state,
          username: "",
          user: res.data.message
        });
        console.log(user);
      })
      .catch((err) => console.log("Error 2", err))
  };

  render() {
    return (
      <div>

        <div className="header" >
          <h1>
            Github User
          </h1>
          <input type="text" className="user-search" onChange={this.handleChange} value={this.state.username} placeholder="Github Username" />
          <button onClick={this.getUser} >Find User</button>
        </div>

        <div>
          <UserCard user={this.state.user} />
        </div>

        <div>
          <FollowerCard followers={this.state.followers} />
        </div>

      </div>
    );
  }
}

export default App;
