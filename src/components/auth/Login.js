import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';
import { FaSignInAlt } from 'react-icons/fa';

export default class Login extends Component{

	constructor(props){
		super(props);
		this.state={
			email: '',
			password: '',
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
    var obj = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/sign_in`, obj, {headers: header})
    .then(res=>{
      if(res.data.errors)
	    	{
	    		NotificationManager.error(res.data.errors);
	    	}
      else{
        var token = res.data.data.user.authentication_token
        localStorage.setItem('token', token);
        localStorage.setItem('user_role', res.data.data.user.role);
        localStorage.setItem('user_email', res.data.data.user.email)
        // NotificationManager.success("Login successfully", 'Successfull !', 2000);
        // this.props.history.push(`/index`);
        window.location = '/index';
      }
    }); 
	}

	
	 

	render(){
		const {submitted, email, password} = this.state;
		return(
			<div>
				<div className="col-md-5 col-md-offset-4" id="login"><br/><br/><br/>
					<section id="inner-wrapper" className="login">
						<article>
							<form onSubmit={this.onSubmitHandler}>
								<p className="h4 mb-4 text-center">Login <FaSignInAlt/> </p>

								<div className={'input-group mb-2' + (submitted && !email ? '  has-error' : ' ')}>
			        		<input type="text" className="form-control" placeholder="Email" 
			        		name="email" 
	       		 			value={this.state.email}
			        		onChange={this.onChangeHandler}
			        		noValidate/>
			        		 {
			        		 	submitted && !email &&
			        		 		<div className="help-block">Email is required!</div>
			        		 }
      					</div>

      					<div className={'input-group mb-2' + (submitted && !password ? '  has-error' : ' ')}>
			        		<input type="password" className="form-control" placeholder="Password" 
			        		name="password" 
	       		 			value={this.state.password}
			        		onChange={this.onChangeHandler}
			        		/>
			        		{
			        		 	submitted && !password &&
			        		 		<div className="help-block">Password is required!</div>
			        		 }
      					</div>

							  <button type="submit" className="btn btn-success btn-block">Submit</button>
							  <br/>
							  
      					<hr/>
                <div className="text-center">
                    Don't have an account? <Link to="/signup" className="links" >Sign Up</Link>
                    <Link to="/forgotPassword" className="d-flex justify-content-center links"><i className="fa fa-key" aria-hidden="true"> Forgot password?</i></Link>
                </div>
							</form>
						</article>
					</section>
				</div>
			</div>
		);
	}

}
