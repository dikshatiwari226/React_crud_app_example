import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import {NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'
require("bootstrap/scss/bootstrap.scss");


export default class Index extends Component {

	constructor(props){
		super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      business: [],
      loading: true
    };
	}

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(){
    var api_url = process.env;
    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/businesses`)
    .then(res=>{
      this.setState({business: res.data, loading: false});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  

  businessDelete = (id) => {
      var api_url = process.env;  
      const headers = {
      'Content-Type': 'application/json'
      }
      axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/delete/${id}`, {headers: headers})
      .then(res => {
        if(res.data.errors)
        {
          NotificationManager.error(res.data.errors[0]);
        }
        else{
          NotificationManager.success("Business deleted successfully", 'Successfull!', 2000);
          this.props.history.push(`/index`);
        }
      });
  }

   handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  
  render() {
    var isAdmin = localStorage.user_role
    const {business} = this.state
    return (
      <div>

        {
          this.state.loading ? <center><Loader
           type="TailSpin"
           color="#00BFFF"
           height={100}
           width={100}
          /></center> : null 
        }

      <div style={{marginTop: "3%",padding: "5%"}}>
        <button type="button" className="btn btn-outline-default btn-md" onClick={this.goBack}>Back</button>
        { isAdmin === "admin" &&
          <Link to={"/create"} className="btn btn-info float-right">Add New</Link>
        }
        <h3 align="center">Business List</h3><br/>
        <table className="table table-striped" style={{ marginTop: 20}} >
          <thead>
            <tr>
              <th>#Id</th>
              <th>Person</th>
              <th>Business</th>
              <th>GST Number</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {business.map(busi => (
                <tr key={busi.id}>
                  <td>{busi.id}</td>
                  <td>{busi.person_name}</td>
                  <td>{busi.business_name}</td>
                  <td>{busi.business_gst_number}</td>
                  <td><Link to={"/show/"+busi.id} className="btn btn-primary">Show</Link></td>
                  { isAdmin === "admin" && 
                    <td><Link to={"/edit/"+busi.id} className="btn btn-warning">Edit</Link></td> 
                  }
                  { isAdmin === "admin" &&
                    <td><button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.businessDelete(busi.id)};}}>Delete</button></td>
                  }
                </tr>
              ))} 
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}