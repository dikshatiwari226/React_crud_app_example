import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

function validate(name, email, password) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (name.length === 0) {
    errors.push("Name can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}

export default class Signup extends Component{

	constructor(props){
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state ={
			name: '',
			email: '',
			password: '',
			errors: []
		}
	}

	onChangeHandler(event){
		const {name, value} =  event.target;
    this.setState({ [name]: value });
	}

	onSubmit(event){
    var api_url = process.env;
		event.preventDefault();

	 	const name = ReactDOM.findDOMNode(this._nameInput).value;
    const email = ReactDOM.findDOMNode(this._emailInput).value;
    const password = ReactDOM.findDOMNode(this._passwordInput).value;
		const errors = validate(name, email, password);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
		const header = {
      'Content-Type': 'application/json'
    }	
    var obj = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}
		axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/sign_up`, obj, {headers: header})
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
		 const { errors } = this.state;	
		return(
			<div className="container-fluid"><br/><br/><br/>
			<div className="row d-flex justify-content-center">
			<form className="text-center border border-light p-3 shadow p-3 mb-5 bg-white rounded" action="#!" style={{marginTop: 25, width: "35%"}} onSubmit={this.onSubmit}>
    			<p className="h4 mb-4">Sign up</p>
		    			{errors.map(error => (
		          	<p key={error} style={{color: "red"}}>Error: {error}</p>
		        	))}

      			<div className="input-group mb-2">
			        <input type="text"  className="form-control" placeholder="Username" 
			        ref={nameInput => (this._nameInput = nameInput)}
		        	name="name" 
	       		 	value={this.state.name}
			        onChange={this.onChangeHandler} 
			        />
      			</div>

      			<div className="input-group mb-2">
			        <input type="email"  className="form-control" placeholder="E-mail"
              ref={emailInput => (this._emailInput = emailInput)}
			        name="email"
			        value={this.state.email}
			        onChange={this.onChangeHandler} 
			        />
      			</div>

      			<div className="input-group mb-2">
			        <input type="password"  className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"
              ref={passwordInput => (this._passwordInput = passwordInput)}
		         	name="password"
		         	value={this.state.password}
			        onChange={this.onChangeHandler} 
			       />
      			</div>

  				<div className="custom-control custom-checkbox">
      			<input type="checkbox" className="custom-control-input" id="defaultRegisterFormNewsletter"/>
        		<label className="custom-control-label" for="defaultRegisterFormNewsletter">Remember me</label>
    			</div>

    			<button className="btn btn-info my-4 btn-block" type="submit">Sign in</button>
    			
    			<p>or sign up with:</p>

		    <Link to="#" className="links mx-2" role="button"><FontAwesomeIcon icon={faFacebookF}/></Link>
		    <Link to="#" className="links mx-2" role="button"><FontAwesomeIcon icon={faGoogle}/></Link>
 				<Link to="#" className="links mx-2" role="button"><FontAwesomeIcon icon={faTwitter}/></Link>
        <Link to="#" className="links mx-2" role="button"><FontAwesomeIcon icon={faLinkedin}/></Link>
        <Link to="#" className="links mx-2" role="button"><FontAwesomeIcon icon={faGithub}/></Link>
    		<hr/>
    		<div className="mt-4">
          <div className="d-flex justify-content-center links">
            Already have an account? Click <Link href="/login" to="/login" className="link" style={{"paddingLeft": "10px"}}>here</Link>
        	</div>
        </div>

		</form>
		</div>
  	</div>
		);
	}

}
