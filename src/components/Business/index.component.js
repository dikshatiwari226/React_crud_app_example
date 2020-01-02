import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 


export default class Index extends Component {

	constructor(props){
		super(props);
      this.state = {business: []};
	}

  componentDidMount(){
    axios.get(`http://localhost:3000/businesses`)
    .then(res=>{
      this.setState({business: res.data});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  

  businessDelete = (id) => {
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
    const {business} = this.state
    console.log("--business", business)
    return (
      <div style={{ padding: "5%"}}>
        <h3 align="center">Business List</h3>
        <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
              <th>Person</th>
              <th>Business</th>
              <th>GST Number</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {business.map(busi => (
                <tr key={busi.id}>
                  <td>{busi.person_name}</td>
                  <td>{busi.business_name}</td>
                  <td>{busi.business_gst_number}</td>
                  <td><Link to={"/show/"+busi.id} className="btn btn-primary">Show</Link></td>
                  <td><Link to={"/edit/"+busi.id} className="btn btn-primary">Edit</Link></td>
                  <td><button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.businessDelete(busi.id)};}}>Delete</button></td>

                </tr>
              ))} 
          </tbody>
        </table>
      </div>
    )
  }
}