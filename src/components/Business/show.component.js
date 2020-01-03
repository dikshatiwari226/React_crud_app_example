import React, { Component } from 'react';
import axios from 'axios';


export default class Show extends Component {
  constructor(props){
    super(props);
      this.state ={
        person_name: '',
        business_name: '',
        business_gst_number: ''
      }
  }

  componentDidMount(){
    var id= this.props.match.params["id"]

    axios.get(`http://localhost:3000/businesses/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, person_name: res.data.person_name, business_name: res.data.business_name, business_gst_number: res.data.business_gst_number});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
      return (
        <div style={{marginTop: "3%", padding: "5%"}}>
          <h3 align="center">Show Details</h3><br/>
          <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
              <th>Person</th>
              <th>Business</th>
              <th>GST Number</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{this.state.person_name}</td>
                  <td>{this.state.business_name}</td>
                  <td>{this.state.business_gst_number}</td>
                </tr>
          </tbody>
        </table>
        </div>
      )
    }
	
}