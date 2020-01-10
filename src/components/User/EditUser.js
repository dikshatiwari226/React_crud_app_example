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
			this.fileSelectedHandler = this.fileSelectedHandler.bind(this);

			this.state ={
				name: '',
        email: '',
        gender: '',
        contact: '',
       	selectedDay: undefined,
        dob: '',
        address: '',
        profession: '',
        selectedFile: null,
        image: ''
			}
	}

	fileSelectedHandler = event =>{
		this.setState({
			selectedFile: event.target.files[0]
		})
		console.log(event.target.files[0]);
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
      this.setState({id: res.data.id, name: res.data.name, email: res.data.email, gender: res.data.gender,
      contact: res.data.contact, dob: res.data.dob, address: res.data.address, profession: res.data.profession});
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
		e.preventDefault();
		const header = {
      'Content-Type': 'application/json'
    }

		var dateAbc = `${this.state.selectedDay.getFullYear()}-${this.state.selectedDay.getMonth() + 1}-${this.state.selectedDay.getDate()}`;
		console.log(dateAbc);

		const fdata = new FormData();
		fdata.append('file', this.state.selectedFile, this.state.selectedFile.name);
		fdata.append('name', this.state.name); 
		fdata.append('email', this.state.email);
		fdata.append('gender', this.state.gender); 
		fdata.append('contact', this.state.contact); 
		fdata.append('dob',  dateAbc); 
		fdata.append('address', this.state.address);
		fdata.append('profession', this.state.profession); 

		var id = this.props.match.params["id"]
    axios.post(`http://localhost:3000/api/v1/editUser/${id}`, fdata,  {headers: header})
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

		      			<div className="input-group mb-2 form-control borderedioooi">
		      				<input type="file" onChange={this.fileSelectedHandler} />
		      			</div>
		    			<button className="btn btn-info my-4" type="submit">Update User</button>
					</form>
				</div>
  	</div>
      )
    }
}