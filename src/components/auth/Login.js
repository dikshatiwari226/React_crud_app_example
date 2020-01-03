import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGoogle,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons' 
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class Login extends Component{

	constructor(props){
		super(props);
		this.state={
			email: '',
			password: ''
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
		const header = {
      'Content-Type': 'application/json'
    }	

    var obj = {
			email: this.state.email,
			password: this.state.password
		}

		axios.post(`http://localhost:3000/api/v1/sign_in`, obj, {headers: header})
    .then(res => {
      if (res.data.data.user) {
        var token = res.data.data.user.authentication_token
        localStorage.setItem('token', token);
        alert("Login successfully");
        window.location = "/index"
      }
      else{
        alert("Invalid email or password");
      }
    }) 
	}
	

	render(){
		return(
			<div>
				<div className="col-md-5 col-md-offset-4" id="login"><br/><br/><br/>
					<section id="inner-wrapper" className="login">
						<article>
							<form onSubmit={this.onSubmitHandler}>
								<p className="h4 mb-4 text-center">Login <i class="fa fa-sign-in"> </i></p>

								<div className="input-group mb-2">
			        		<input type="email" className="form-control" placeholder="Email"
			        		name="email" 
	       		 			value={this.state.email}
			        		onChange={this.onChangeHandler}/>
      					</div>

      					<div className="input-group mb-2">
			        		<input type="password" className="form-control" placeholder="Password"
			        		name="password" 
	       		 			value={this.state.password}
			        		onChange={this.onChangeHandler}/>
      					</div>
      					<br/>

							  <button type="submit" className="btn btn-success btn-block">Submit</button>
      					<hr/>
                <div className="text-center">
                    Don't have an account? <Link to="/signup" className="links" >Sign Up</Link>
                    <Link to="/reset" className="d-flex justify-content-center links"><i className="fa fa-key" aria-hidden="true"> Forgot password?</i></Link>
                </div>
							</form>
						</article>
					</section>
				</div>
			</div>
		);
	}

}
