import React, {Component} from 'react';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {NotificationManager} from 'react-notifications';

export default class EditAppliedJob extends Component {

	constructor(props){
    super(props);
    this.state={
      position: '',
      company: '',
      application_no: '',
      selectedDay: undefined,
      date_applied: '',
      selectedFile: null,
      resume: '',
      application_status:''
      
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.goBack = this.goBack.bind(this);
  }


	goBack(){
		this.props.history.goBack();
	}


	handleDayChange(selectedDay){
    this.setState({ selectedDay });
  }

  fileSelectedHandler = event =>{
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]);
  }

	componentDidMount(){
    var api_url = process.env;
    var id= this.props.match.params["id"]

    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/applied_jobs/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, position: res.data.position, company: res.data.company, application_no: res.data.application_no, date_applied: res.data.date_applied,  application_status: res.data.application_status});
    })
    .catch(function(error){
      console.log(error);
    })
  }

	handleChange(event){
    const {name, value} =  event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();
    var api_url = process.env;
    const header = {
      'Content-Type': 'application/json'
    }

    var dateAbc = `${this.state.selectedDay.getFullYear()}-${this.state.selectedDay.getMonth() + 1}-${this.state.selectedDay.getDate()}`;
    console.log(dateAbc);
    
    const fdata = new FormData();
    fdata.append('resume', this.state.selectedFile, this.state.selectedFile.name);
    fdata.append('position', this.state.position); 
    fdata.append('company', this.state.company);
    fdata.append('application_no', this.state.application_no); 
    fdata.append('date_applied',  dateAbc); 
    fdata.append('application_status', this.state.application_status);

    var id = this.props.match.params["id"]
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/applied_jobs/${id}/edit`, fdata, {headers: header})
    .then(res=> {
      if(res.data.errors)
      {
        NotificationManager.error(res.data.errors);
      }
      else{
        var id = res.data.data.applied_job.id
        NotificationManager.success("Applied Job updated successfully", 'Successfull!', 2000);
        this.props.history.push(`/showAppliedJob/${id}`);
      }
    });
  }

    render() {
      return (
      <div>
        <div className="container"><br/><br/><br/>
        <button type="button" className="btn btn-outline-default btn-md float-right" onClick={this.goBack}>Back</button>
        <p className="h4 mb-4 text-center">Edit Applied Jobs</p><br/>
          <form className="form-horizontal" method="post" onSubmit= {this.handleSubmit} >
            <div className="form-group row">
              <label className="control-label col-sm-3">Position:</label>
              <div className="col-sm-9">
                <input type="position" 
                  name="position"
                  value={this.state.position} 
                  onChange={this.handleChange} 
                  className="form-control" placeholder="Enter position"/>
              </div>
            </div>

            <div className="form-group row">
              <label className="control-label col-sm-3" >Company:</label>
              <div className="col-sm-9">
                <input type="company" 
                  name="company"
                  value={this.state.company} 
                  onChange={this.handleChange} 
                  className="form-control"  placeholder="Enter company"/>
              </div>
            </div>

            <div className="form-group row">
              <label className="control-label col-sm-3" >Application no:</label>
              <div className="col-sm-9">
                <input type="application_no" 
                  name="application_no"
                  value={this.state.application_no} 
                  onChange={this.handleChange} 
                  className="form-control" placeholder="Enter application no"/>
              </div>
            </div>

            <div className="form-group row">
              <label className="control-label col-sm-3" >Applied Date:</label>
              <div className="col-sm-9">
                <DayPickerInput inputProps={{ className: 'form-control' }} style={{width: '100%'}} 
                  placeholder="Enter Applied Date"
                  name="date_applied"
                  value={this.state.date_applied}
                  onDayChange={this.handleDayChange}  
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="control-label col-sm-3" >Resume:</label>
              <div className="col-sm-9">
                <input type="file" 
                  name="resume"
                  value={this.state.resume}
                  onChange={this.fileSelectedHandler} 
                  className="form-control" placeholder="Resume"/>
              </div>
            </div>

            <div className="form-group row">
              <label className="control-label col-sm-3">Application Status:</label>
              <div className="col-sm-9">
                <select className="form-control" id="application_status" 
                    name="application_status"
                    value={this.state.application_status}
                    onChange={this.handleChange} >
                  <option value="">Please Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div> 

            <div className="form-group d-flex justify-content-center">
              <input type="submit" value="Update" className="btn btn-primary"/>
            </div>

          </form>
         </div>
      </div>
      )
    }
}