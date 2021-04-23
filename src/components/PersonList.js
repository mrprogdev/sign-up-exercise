//------------------------------------------------------------------------------ Get Request

// import React from 'react';
// import axios from 'axios';

// export default class PersonList extends React.Component {
//   state = {
//     persons: []
//   }

//   componentDidMount() {
//     axios.get(`https://jsonplaceholder.typicode.com/users`)
//       .then(res => {
//         const persons = res.data;
//         this.setState({ persons });
//       })
//   }

//   render() {
//     return (
//       <ul>
//         { this.state.persons.map(person => <li>{person.name}</li>)}
//       </ul>
//     )
//   }
// }

import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production`,
});

export default class PersonList extends React.Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      //name: this.state.name
      email: "bb@cc.com",
      password: "abcd3fgh",
    };

    axios({
      method: "get",
      url: `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/users`,
      headers: {
        Authorization: "Bearer f40g0493mjg09ug8u3409g",
      },
    }).then((response) => {
      console.log(response);
    });

    // axios({
    //   method: "post",
    //   url: `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/login`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   data: {
    //     email: "bb@cc.com",
    //     password: "abcd3fgh",
    //   },
    // }).then((response) => {
    //   this.setState({ data: response.data });
    //   console.log(this.state.data);
    // });

    //     axios.post(
    //         `https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/register`,
    //  {
    // 	"name": "Person A",
    // 	"email": "bb@cc.com",
    // 	"password": "abcd3fgh"
    // }
    // ).then(response => {
    //     this.setState({data:response.data});
    //     console.log(this.state.data);
    // });

    //axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
    // axios.post(`https://5k9okv4iu0.execute-api.ap-southeast-1.amazonaws.com/production/login`, { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })
  };

  createCourse = async () => {
    let res = await api.post(`/login`, {
      email: "bb@cc.com",
      password: "abcd3fgh",
    });
    console.log(res);
  };

  registerUser = async () => {
    let res = await api.post(`/register`, {
      name: "Person A",
      email: "bb@cc.com",
      password: "abcd3fgh",
    });
    console.log(res);
  };

  getUser = async () => {
    let res = await api.get(`/users`, {
      headers: {
        Authorization: "Bearer f40g0493mjg09ug8u3409g",
      },
    });
    console.log(res);
  };

  render() {
    return (
      <div>
        <br />
        <button onClick={this.createCourse}>Login</button>
        <br />
        <button onClick={this.registerUser}>Register</button>
        <br />
        <button onClick={this.getUser}>List Users</button>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
