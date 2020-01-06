import React, {Component} from 'react';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class EditUser extends Component {

	constructor(props){
		super(props);
			this.onChangeHandler = this.onChangeHandler.bind(this);
			this.handleDayChange = this.handleDayChange.bind(this);
			this.onSubmit = this.onSubmit.bind(this);

			this.state ={
				name: '',
        email: '',
        gender: '',
        contact: '',
       	selectedDay: undefined,
        dob: '',
        address: '',
        profession: ''
			}
	}

	handleDayChange(selectedDay, dayPickerInput){
		this.setState({
			selectedDay
		});
	}

	componentDidMount(){
		var id = this.props.match.params["id"]

    axios.get(`http://localhost:3000/api/v1/showUser/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, name: res.data.name, email: res.data.email, gender: res.data.gender, dob: res.data.dob, address: res.data.address, profession: res.data.profession});
    })
    .catch(function(error){
      console.log(error);
    })
  }

	onChangeHandler(event){
		const {name, value} =  event.target;
    this.setState({ [name]: value });
	}

	onSubmit(e){
		const header = {
      'Content-Type': 'application/json'
    }
		e.preventDefault();

		var dateAbc = `${this.state.selectedDay.getFullYear()}-${this.state.selectedDay.getMonth() + 1}-${this.state.selectedDay.getDate()}`;
		console.log(dateAbc);

		var obj = {
			name: this.state.name,
			email: this.state.email,
			gender: this.state.gender,
			contact: this.state.contact,
			dob: dateAbc,
			address: this.state.address,
			profession: this.state.profession
		}

		var id = this.props.match.params["id"]
    axios.post(`http://localhost:3000/api/v1/editUser/${id}`, obj, {headers: header})
    .then(res=>
    	window.location = `/showUser/${res.data.data.user.id}`,
    	alert("User updated successfully")
    );
      
    }

    render() {
      return (
        <div className="container-fluid"><br/><br/><br/>
				<div className="row d-flex justify-content-center">
					<form className="text-center border border-light p-3 shadow p-3 mb-5 bg-white rounded" action="#!" style={{marginTop: 25, width: "65%"}} onSubmit={this.onSubmit}>
		    			<p className="h4 mb-4">Edit User</p>

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
					       		<DayPickerInput inputProps={{ className: 'form-control borderedioooi ' }} 
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
		    			<button className="btn btn-info my-4" type="submit">Update User</button>
					</form>
				</div>
  	</div>
      )
    }
}