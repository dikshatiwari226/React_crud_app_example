import React, {Component} from 'react';
import './style.css';
import './chpass.js';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';


export default class ChangePassword extends Component{
  constructor(props){
    super(props);

    this.state ={
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeHandler(event){
    debugger
    const {name, value} =  event.target;
    this.setState({ [name]: value });
  }

  onSubmit(event){
    var api_url = process.env;
    event.preventDefault();

    const header = {
      'Content-Type': 'application/json',
      'Token': localStorage.token
    }
    var obj = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    }
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/change_password`, obj, {headers: header})
    .then(res=>{
        if(res.data.errors)
      {
        NotificationManager.error(res.data.errors[0]);
      }
      else{
        NotificationManager.success("User Signup successfully", 'Successfull!', 2000);
        this.props.history.push(`/userIndex`);
      }
    }); 
  }

	render(){
		return(
		  <div>
        <div className="Changepasswordform-gap"></div>
          <div className="col-md-6 offset-md-3">
            <span className="anchor" id="formChangePassword"></span>
              <div className="card card-outline-secondary">
                  <div className="card-header">
                      <h3 className="mb-0">Change Password</h3>
                  </div>
                  <div className="card-body">
                      <form className="form" role="form" autoComplete="off">
                          <div className="form-group">
                              <label htmlFor="inputPasswordOld">Current Password</label>
                              <input type="password" className="form-control" id="inputPasswordOld" required=""
                                name="currentPassword" 
                                value={this.state.currentPassword}
                                onChange={this.onChangeHandler} 
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="inputPasswordNew">New Password</label>
                              <input type="password" className="form-control" id="inputPasswordNew" required=""
                                name="newPassword" 
                                value={this.state.newPassword}
                                onChange={this.onChangeHandler} 
                              />
                              <span className="form-text small text-muted">
                                  The password must be 8-20 characters, and must <em>not</em> contain spaces.
                              </span>
                          </div>
                          <div className="form-group">
                              <label htmlFor="inputPasswordconfirmPassword">Confirm Password</label>
                              <input type="password" className="form-control" id="inputPasswordconfirmPassword" required=""
                                name="confirmPassword" 
                                value={this.state.confirmPassword}
                                onChange={this.onChangeHandler} 
                              />
                              <span className="form-text small text-muted">
                                  To confirm, type the new password again.
                              </span>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg float-right">Save</button>
                          </div>
                      </form>
                  </div>
              </div>
        </div>
      </div>
		);
	}

}


