import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';


export default class ShowAppliedJob extends Component {
  constructor(props){
    super(props);
      this.state ={
        position: '',
        company: '',
        application_no: '',
        date_applied: '',
        application_status: '',
        resume: ''
      }
    this.goBack = this.goBack.bind(this);

  }

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(){
    var api_url = process.env;
    var id= this.props.match.params["id"]

    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/applied_jobs/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, position: res.data.position, company: res.data.company, application_no: res.data.application_no, date_applied: res.data.date_applied,  application_status: res.data.application_status, resume: res.data.resume.url, api_url: `${JSON.parse(api_url.REACT_APP_ENV).APIURL}` });
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
      return (
        <div style={{marginTop: "3%", padding: "5%"}}>
        <button type="button" className="btn btn-outline-default btn-md float-right" onClick={this.goBack}>Back</button>
          <h3 align="center">Applied Job User</h3><br/>
          <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
              <th>#Id</th>
              <th>Position</th>
              <th>Cpmpany</th>
              <th>Application_No</th>
              <th>Date_Applied</th>
              <th>Application_Status</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{this.state.id}</td>
                  <td>{ this.state.position}</td>
                  <td>{ this.state.company }</td>
                  <td>{this.state.application_no}</td>
                  <td><Moment format="DD MMM YYYY">{this.state.date_applied}</Moment></td>
                  <td>{ this.state.application_status}</td>
                  <td><img style={{width: 100, height: 100}} className='tc br3' alt='none' src={`${this.state.api_url}`+ this.state.resume } />
                  </td>
                </tr>
          </tbody>
        </table>
        </div>
      )
    }
  
}