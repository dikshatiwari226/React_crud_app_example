import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';


export default class ShowUser extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);

      this.state ={
        name: '',
        email: '',
        gender: '',
        contact: '',
        dob: '',
        address: '',
        profession: '',
        image: ''
      }
  }

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(){
    var api_url = process.env;
    var id= this.props.match.params["id"]

    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/showUser/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, name: res.data.name, email: res.data.email, gender: res.data.gender, contact: res.data.contact, dob: res.data.dob, address: res.data.address, profession: res.data.profession, image: res.data.image.url, api_url: `${JSON.parse(api_url.REACT_APP_ENV).APIURL}` });
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
      return (
        <div style={{marginTop: "3%", padding: "5%"}}>
          <button type="button" className="btn btn-secondary" onClick={this.goBack}>Back</button>
          <h3 align="center">Show User</h3><br/>
          <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
              <th>#Id</th>
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
                  <td>{this.state.id}</td>
                  <td>{this.state.name}</td>
                  <td>{this.state.email}</td>
                  <td>{this.state.gender}</td>
                  <td>{this.state.contact}</td>
                  <td><Moment format="DD MMM YYYY">{this.state.dob}</Moment></td>
                  <td>{this.state.address}</td>
                  <td>{this.state.profession}</td>
                  <td><img style={{width: 100, height: 100}} className='tc br3' alt='none' src={`${this.state.api_url}`+ this.state.image } /></td>
                </tr>
          </tbody>
        </table>
        </div>
      )
    }
	
}