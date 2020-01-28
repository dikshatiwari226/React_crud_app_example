import React, {Component} from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import './style.css';

export default class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      submitted: false
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e){
    const {name, value} =  e.target;
    this.setState({ [name]: value });
  }

  onSubmitHandler(e){
    e.preventDefault();
    this.setState({ submitted: true});
    var api_url = process.env;
    const header = {
      'Content-Type': 'application/json'
    } 
    var user = {email: this.state.email}
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/forgot`, user, {headers: header})
    .then(res=>{
      if(res.data.errors)
        {
          NotificationManager.error(res.data.errors);
        }
      else{
        NotificationManager.success("Password updated successfully", 'Successfull !', 2000);
        this.props.history.push(`/index`);
      }
    }); 
  }

	render(){
		return(
			<div className="container-fluid">
        <div className="form-gap"></div>
  			  <div className="container">
              <div className="row d-flex justify-content-center">
                <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <div className="text-center">
                              <h3><i className="fa fa-lock fa-4x"></i></h3>
                              <h2 className="text-center">Forgot Password?</h2>
                              <p>You can reset your password here.</p>
                              <div className="panel-body">
                
                               <form onSubmit={this.onSubmitHandler}>              
                                  <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                      
                                      <input type="text" className="form-control" placeholder="Email" 
                                        name="email" 
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                        />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <button type="submit" className="btn btn-lg btn-primary btn-block">Reset Password</button>
                                  </div>  
                                </form>
                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
              </div>
          </div>
    	</div>
		);
	}

}
