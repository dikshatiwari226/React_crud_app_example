import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';


export default class ShowUser extends Component {
  constructor(props){
    super(props);
      this.state ={
        name: '',
        email: '',
        gender: '',
        contact: '',
        dob: '',
        address: '',
        profession: ''
      }
  }

  componentDidMount(){
    var id= this.props.match.params["id"]

    axios.get(`http://localhost:3000/api/v1/showUser/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, name: res.data.name, email: res.data.email, gender: res.data.gender, contact: res.data.contact, dob: res.data.dob, address: res.data.address, profession: res.data.profession, image: res.data.iamge});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
      return (
        <div style={{marginTop: "3%", padding: "5%"}}>
          <h3 align="center">Show User</h3><br/>
          <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Profession</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{this.state.name}</td>
                  <td>{this.state.email}</td>
                  <td>{this.state.gender}</td>
                  <td>{this.state.contact}</td>
                  <td><Moment format="DD MMM YYYY">{this.state.dob}</Moment></td>
                  <td>{this.state.address}</td>
                  <td>{this.state.profession}</td>
                  <td>{this.state.image}</td>
                </tr>
          </tbody>
        </table>
        </div>
      )
    }
	
}