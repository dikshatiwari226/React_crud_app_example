import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class EditProfile extends Component{

	constructor(props){
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleDayChange = this.handleDayChange.bind(this);

		this.state ={
				name: '',
        email: '',
        password: '',
        gender: '',
        contact: '',
        selectedDay: undefined,

        dob: '',
        address: '',
        profession: ''
		}
	}

	handleDayChange(selectedDay){
		this.setState({
			selectedDay
		});
	}

	componentDidMount(){
    const header = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }
    axios.get(`http://localhost:3000/api/v1/profile`, {headers: header})
    .then(res=>{
      this.setState({id: res.data.id, name: res.data.name, email: res.data.email, gender: res.data.gender, contact: res.data.contact, dob: res.data.dob, address: res.data.address, profession: res.data.profession});
    })
    .catch(function(error){
      console.log(error);
    })
  }

	onChangeHandler(event){
		const {name, value} =  event.target;
    this.setState({ [name]: value });
	}

	onSubmit(event){
		event.preventDefault();
		const header = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }	

    var dateAbc = `${this.state.selectedDay.getFullYear()}-${this.state.selectedDay.getMonth() + 1}-${this.state.selectedDay.getDate()}`;
		console.log(dateAbc);

    var obj = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			gender: this.state.gender,
			contact: this.state.contact,
			dob: dateAbc,
			address: this.state.address,
			profession: this.state.profession
		}
		axios.post(`http://localhost:3000/api/v1/edit_profile`, obj, {headers: header})
    .then(res=>{
    	window.location = "/profile";
    	alert("User updated successfully");
    });
    

	}

	render(){
		const {selectedDay} = this.state;
		return(
			<div className="container-fluid"><br/><br/><br/>
				<div className="row d-flex justify-content-center">
					<form className="text-center border border-light p-3 shadow p-3 mb-5 bg-white rounded" action="#!" style={{marginTop: 25, width: "65%"}} onSubmit={this.onSubmit}>
		    			<p className="h4 mb-4">Edit Profile</p>

		      			<div className="input-group mb-2">
					        <input type="text" className="form-control" placeholder="Username" 
				        	name="name" 
			       		 	value={this.state.name}
					        onChange={this.onChangeHandler} 
					        />
		      			</div>

		      			<div className="input-group mb-2">
					        <input type="email" className="form-control" placeholder="E-mail" 
					        name="email"
					        value={this.state.email}
					        onChange={this.onChangeHandler} 
					        />
		      			</div>

		      			<div className="input-group mb-2">
					        <input type="password" className="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"
				         	name="password"
				         	value={this.state.password}
					        onChange={this.onChangeHandler} 
					       />
		      			</div>
		      			<div className="input-group mb-2">
					        <select className="form-control borderedioooi"  
					        	name="gender"
					        	value={this.state.gender}
		                onChange={this.onChangeHandler}>
		                	<option>Male</option>
		                	<option>Female</option>
		              </select>
		      			</div>

		      			<div className="input-group mb-2">
					        <input type="text"  className="form-control" placeholder="Contact" 
					        name="contact"
					        value={this.state.contact}
					        onChange={this.onChangeHandler} 
					        />
		      			</div>

		      			<div className="input-group mb-2">
					       	<DayPickerInput inputProps={{ className: 'form-control borderedioooi ' }} placeholder="DOB"
					       		name="dob"
		         				value={this.state.dob}
		                onDayChange={this.handleDayChange}  
		              />
		      			</div>

		      			<div className="input-group mb-2">
					        <input type="text"  className="form-control" placeholder="address" 
					        name="address"
					        value={this.state.address}
					        onChange={this.onChangeHandler} 
					        />
		      			</div>

		      			<div className="input-group mb-2">
					        <input type="text"  className="form-control" placeholder="Profession" aria-describedby="defaultRegisterFormPasswordHelpBlock"
				         	name="profession"
				         	value={this.state.profession}
					        onChange={this.onChangeHandler} 
					       />
		      			</div>
		    			<button className="btn btn-info my-4" type="submit">Update Profile</button>
					</form>
				</div>
  	</div>
		);
	}

}
