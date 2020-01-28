import React, {Component} from 'react';
import './style.css';
import './chpass.js';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';


export default class ChangePassword extends Component{
  constructor(props){
    super(props);

    this.state ={
      oldPassword: '',
      newPassword: '',
      isChanging: false,  
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
  }

  validateForm(){
    return (
      this.state.oldPassword.length > 0 &&
      this.state.newPassword.length > 0 &&
      this.state.newPassword === this.state.confirmPassword
    );
  }

  handleChange(event){
    const {name, value} =  event.target;
    this.setState({ [name]: value });
  }

  handleChangeClick(event){

    var api_url = process.env;
    event.preventDefault();
    this.setState({ isChanging: true });
    
    const header = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }
    var obj = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    }
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/change_password`, obj, {headers: header})
    .then(res=>{
        if(res.data.errors)
      {
        NotificationManager.error(res.data.errors);
      }
      else{
        NotificationManager.success("Changed Password", 'Successfull!', 2000);
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
                      <form className="form" role="form" autoComplete="off" onSubmit={this.handleChangeClick}>
                          <div className="form-group">
                              <label htmlFor="inputPasswordOld">Old Password</label>
                              <input type="password" className="form-control" id="inputPasswordOld" required=""
                                name="oldPassword" 
                                value={this.state.oldPassword}
                                onChange={this.handleChange} 
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="inputPasswordNew">New Password</label>
                              <input type="password" className="form-control" id="inputPasswordNew" required=""
                                name="newPassword" 
                                value={this.state.newPassword}
                                onChange={this.handleChange} 
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
                                onChange={this.handleChange} 
                              />
                              <span className="form-text small text-muted">
                                  To confirm, type the new password again.
                              </span>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg float-right" 
                              loadingText="Changing..."
                              disabled = {!this.validateForm()} 
                              isLoading={this.state.isChanging} >
                              Change Password
                            </button>
                          </div>
                      </form>
                  </div>
              </div>
        </div>
      </div>
		);
	}

}


