import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 


export default class UserIndex extends Component {

	constructor(props){
		super(props);
      this.state = {users: []};
	}

  componentDidMount(){
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:3000/api/v1/users`, {header: headers})
    .then(res=>{
      this.setState({users: res.data.data.user});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  

  userDelete = (id) => {
      const headers = {
      'Content-Type': 'application/json'
      }
      console.log("******************************************", id)
      axios.get(`http://localhost:3000/delete/${id}`, {headers: headers})
      .then(response => {
        window.location = "/index"
      })
  }

  
  render() {
    const {users} = this.state
    console.log("--Users", users)
    return (
      <div style={{marginTop: "3%",padding: "5%"}}>
        <h3 align="center">All Users</h3><br/>
        <table className="table table-striped" style={{ marginTop: 20}} >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><Link to={"/profile/"+user.id} className="btn btn-primary">Show</Link></td>
                  <td><Link to={"/edit_profile/"+user.id} className="btn btn-warning">Edit</Link></td>
                  <td><button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.userDelete(user.id)};}}>Delete</button></td>
                </tr>
              ))} 
          </tbody>
        </table>
      </div>
    )
  }
}