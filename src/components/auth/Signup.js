import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';


export default class Signup extends Component{

	constructor(props){
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state ={
			name: '',
			email: '',
			password: ''
		}
	}

	onChangeHandler(event){
		const {name, value} =  event.target;
    this.setState({ [name]: value });
	}

	onSubmit(event){
		event.preventDefault();
		const header = {
      'Content-Type': 'application/json'
    }	

    var obj = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}

		axios.post(`http://localhost:3000/api/v1/sign_up`, obj, {headers: header})
    .then(res=>
    	window.location = "/index",
    	alert("User created successfully")
    );
	}

	render(){
		return(
			<div className="container-fluid"><br/><br/><br/>
			<div className="row d-flex justify-content-center">
			<form className="text-center border border-light p-3 shadow p-3 mb-5 bg-white rounded" action="#!" style={{marginTop: 25, width: "35%"}} onSubmit={this.onSubmit}>
    			<p className="h4 mb-4">Sign up</p>

      			<div className="input-group mb-2">
			        <input type="text"  className="form-control" placeholder="Username" 
		        	name="name" 
	       		 	value={this.state.name}
			        onChange={this.onChangeHandler} 
			        />
      			</div>

      			<div className="input-group mb-2">
			        <input type="email"  className="form-control" placeholder="E-mail" 
			        name="email"
			        value={this.state.email}
			        onChange={this.onChangeHandler} 
			        />
      			</div>

      			<div className="input-group mb-2">
			        <input type="password"  className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"
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
