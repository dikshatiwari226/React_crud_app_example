import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { MDBDataTable } from 'mdbreact';

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
      axios.get(`http://localhost:3000/api/v1/delete/${id}`, {headers: headers})
      .then(response => {
        window.location = "/UserIndex"
      })
  }

  
  render() {

    const {users} = this.state
    console.log("--Users", users)

    const allrecords = []
    {
      users.map( (user, index) => 
        <div key={index}>
          {
              allrecords.push({sn: index + 1, id: user.id, name: user.name, email: user.email, show: <Link to={"/showUser/"+user.id} className="btn btn-primary">Show</Link>, edit: <Link to={"/editUser/"+user.id} className="btn btn-warning">Edit</Link>, delete: <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.userDelete(user.id)};}}>Delete</button> })
              })
          }
        </div>
      )

    this.state = {allrecords};

    const data = {
      columns: [
        {
          label: 'SNo.',
          field: 'sn',
          sort: 'disabled',
          width: 100
        },
        {
          label: 'Id',
          field: 'id',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Show',
          field: 'show',
          sort: 'disabled',
          width: 100
        },
        {
          label: 'Edit',
          field: 'edit',
          sort: 'disabled',
          width: 100
        },
        {
          label: 'Delete',
          field: 'delete',
          sort: 'disabled',
          width: 100
        }
      ],
      rows: allrecords
    };
    
    return (
      <div style={{marginTop: "3%",padding: "5%"}}>
        <h3 align="center">All Users</h3><br/>
        <MDBDataTable
          striped
          hover
          data={data}
        />
      </div>
    )
  }
}