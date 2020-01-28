import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

export default class Signup extends Component{

  constructor(props){
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state ={
      fields: {},
      errors: {}
    }
  }

  
  onChangeHandler(e){
    let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
  }

  onSubmit(event){
    var api_url = process.env;
    event.preventDefault();
    if (this.validateForm()) {
          let fields = {};
          fields["name"] = "";
          fields["email"] = "";
          fields["password"] = "";
          fields["password_confirmation"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
    }
    const header = {
      'Content-Type': 'application/json'
    } 
    var obj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/sign_up`, obj, {headers: header})
    .then(res=>{
        if(res.data.data.errors)
      {
        NotificationManager.error(res.data.data.errors);
      }
      else{
        NotificationManager.success("User Signup successfully", 'Successfull!', 2000);
        this.props.history.push(`/userIndex`);
      }
    });
  }


  validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["name"]) {
        formIsValid = false;
        errors["name"] = "*Please enter your name.";
      }

      if (typeof fields["name"] !== "undefined") {
        if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["name"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your email-ID.";
      }

      if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
      }

      

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password(Must be at least 8 characters,At least 1 special character from @#$%&,At least 1 number, 1 lowercase, 1 uppercase letter).";
        }
      }

      if (!fields["password_confirmation"]) {
        formIsValid = false;
        errors["password_confirmation"] = "*Please enter your password_confirmation.";
      }

      if (typeof fields["password_confirmation"] !== "undefined") {
        if (!fields["password_confirmation"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password_confirmation"] = "*Please enter secure and strong password_confirmation(Must be at least 8 characters,At least 1 special character from @#$%&,At least 1 number, 1 lowercase, 1 uppercase letter).";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


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
                value={this.state.fields.name}
                onChange={this.onChangeHandler} 
              />
            </div>
              <div className="errorMsg">{this.state.errors.name}</div>

            <div className="input-group mb-2">
              <input type="text"  className="form-control" placeholder="E-mail"
                name="email"
                value={this.state.fields.email}
                onChange={this.onChangeHandler} 
              />
            </div>
              <div className="errorMsg">{this.state.errors.email}</div>

            <div className="input-group mb-2">
              <input type="password"  className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"
                name="password"
                value={this.state.fields.password}
                onChange={this.onChangeHandler} 
              />
            </div>
              <div className="errorMsg">{this.state.errors.password}</div>

            <div className="input-group mb-2">
              <input type="password"  className="form-control" placeholder="Confirm Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"
                name="password_confirmation"
                value={this.state.fields.password_confirmation}
                onChange={this.onChangeHandler} 
              />
            </div>
              <div className="errorMsg">{this.state.errors.password_confirmation}</div>

          <button className="btn btn-info my-4 btn-block" type="submit">Sign in</button>
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
