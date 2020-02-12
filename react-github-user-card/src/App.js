import React from 'react';
import axios from 'axios';
import './App.css';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: row;
  margin: 50px;
  background: #f0dc82;
  border: 1px solid blue;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  length: 250px;
  border: 5px dotted orange;
  padding: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 50px;
`;

const Image = styled.img`
width: 250px;
length: 150px;
`;

const Location = styled.p`
  font-style: italic;
  font-size: 12px;
  line-height: 1px;
`;

const Follow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled.h3`
  padding-top: 5px;
  line-height: 1px;
`;

const Title = styled.h4`
  margin-left: 50px;
`;

const Followers = styled.div`
  margin-left: 50px;
  display: flex;
  flex-direction: row;
`;

const FollowImg = styled.img`
  width: 50px;
  length: 50px;
  padding-right: 3px;
`;

const FollowName = styled.h6`
  padding-right: 3px;
`;

const Others = styled.div`
  border-left: 5px solid gray;
  padding-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

class App extends React.Component {

  state = {
    userData: {},
    userFollowers: [],
    userFollowing: []
  };

  componentDidMount() {
    axios
    .all([
      axios.get(`https://api.github.com/users/KejdaCelaj`),
      axios.get(`https://api.github.com/users/KejdaCelaj/followers`),
      axios.get(`https://api.github.com/users/KejdaCelaj/following`)
    ])
    .then( res => {
      this.setState({
        userData: res[0].data,
        userFollowers: res[1].data,
        userFollowing: res[2].data
      })
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.user !== this.state.user){
      axios
      .all([
        axios.get(`https://api.github.com/users/KejdaCelaj`),
        axios.get(`https://api.github.com/users/KejdaCelaj/followers`),
        axios.get(`https://api.github.com/users/KejdaCelaj/following`)
      ])
      .then( res => {
        this.setState({
          userInfo: res[0].data,
          userFollowers: res[1].data,
          userFollowing: res[2].data
        })
        console.log(this.state)
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <Card>
        <UserCard>
            <Image 
              className="card_avatar"
              alt={this.state.userData.login}
              src={this.state.userData.avatar_url}
            />
            <Name>{this.state.userData.login}</Name>
            <Location>{this.state.userData.location}</Location>
            <p>{this.state.userData.bio}</p>
            <Follow>
              <p>Followers: {this.state.userData.followers}</p>
              <p>Following: {this.state.userData.following}</p>
            </Follow>
          </UserCard>

          <Others>
          <Title>Followers</Title>
          <Followers>
            {this.state.userFollowers.map( follower => {
                return (
                    <a href={follower.html_url} className="card">
                      <div>
                        <FollowImg 
                          className="card_avatar"
                          alt={follower.login}
                          src={follower.avatar_url}
                        />
                        <FollowName>{follower.login}</FollowName>
                      </div>
                    </a>
                );
              })}
          </Followers>

          <Title>Following</Title>
          <Followers>
          {this.state.userFollowing.map( follower => {
               return (
                  <a href={follower.html_url} className="card">
                    <div>
                      <FollowImg 
                        className="card_avatar"
                        alt={follower.login}
                        src={follower.avatar_url}
                      />
                      <FollowName>{follower.login}</FollowName>
                    </div>
                  </a>
               );
             })}
            </Followers>
          </Others>
        </Card>
    );
  };
}

export default App;
