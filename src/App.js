import "./styles.css";
import React from "react";
import axios from "axios";

const CardList = (props) => (
  <div className="CardList">
    {props.profiles.map((profile) => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    let profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="profile-pic" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
          <div className="bio">{profile.bio}</div>
          <div className="location">{profile.location}</div>
          <div className="followers">Followers: {profile.followers}</div>
          <div className="following">Following: {profile.following}</div>
          <div className="card__date">
            Account Created At : {profile.created_at}
          </div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(this.state.userName);
    try {
      const resp = await axios.get(
        `https://api.github.com/users/${this.state.userName}`
      );
      this.props.onSubmit(resp.data);
      this.setState({ userName: "" });
    } catch (error) {
      console.log("Error occured!", error);
      alert(
        "Username Not Found! Please search valid UserName.\nOr check the server connection or try again.."
      );
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub Username"
          required
        />
        <button className="btn">Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }

  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData]
    }));
    console.log("APP", profileData);
  };
  render() {
    return (
      <div class="App">
        <div className="header">GitHub Cards App</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
