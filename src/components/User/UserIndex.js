import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { MDBDataTable } from 'mdbreact';
import {NotificationManager} from 'react-notifications';


export default class UserIndex extends Component {

	constructor(props){
		super(props);
    this.goBack = this.goBack.bind(this);
      this.state = {users: []};
	}

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(){
    var api_url = process.env;
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/users`, {header: headers})
    .then(res=>{
      this.setState({users: res.data.data.user});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  

  userDelete = (id) => {
    var api_url = process.env;
      const headers = {
      'Content-Type': 'application/json'
      }
      axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/delete/${id}`, {headers: headers})
      .then(res => {
        if(res.data.errors)
        {
          NotificationManager.error(res.data.errors[0]);
        }
        else{
          NotificationManager.success("User deleted successfully", 'Successfull!', 2000);
          this.props.history.push(`/UserIndex`);
        } 
      });
  }

  
  render() {
    
    const {users} = this.state
    console.log("--Users", users)
    const allrecords = []; 
    {
      users.map((user, index) => 
        <div key={index}>
          {
              allrecords.push({sn: index + 1, id: user.id, name: user.name, email: user.email, show: <Link to={"/showUser/"+user.id} className="btn btn-primary">Show</Link>,  edit: <Link to={"/editUser/"+user.id} className="btn btn-warning">Edit</Link> , delete: <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.userDelete(user.id)};}}>Delete</button> })
              });
          }
        </div>
      )
    }

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
        <button type="button" className="btn btn-secondary" onClick={this.goBack}>Back</button>
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