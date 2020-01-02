import React, {Component} from 'react';
import axios from 'axios';

export default class Edit extends Component {

	constructor(props){
		super(props);
			this.onChangePersonName = this.onChangePersonName.bind(this);
			this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
			this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
			this.onSubmit = this.onSubmit.bind(this);

			this.state ={
				person_name: '',
				business_name: '',
				business_gst_number: ''
			}
	}

	onChangePersonName(e){
		this.setState({
			person_name: e.target.value
		});
	}

	onChangeBusinessName(e){
		this.setState({
			business_name: e.target.value
		});
	}

	onChangeGstNumber(e){
		this.setState({
			business_gst_number: e.target.value
		});
	}

	onSubmit(e){
		const header = {
      'Content-Type': 'application/json'
    }
		e.preventDefault();

		var obj = {
			person_name: this.state.person_name,
			business_name: this.state.business_name,
			business_gst_number: this.state.business_gst_number
		}

		var id = this.props.match.params["id"]
    axios.post(`http://localhost:3000/edit/${id}`, obj, {headers: header})
    .then(res=> 
    	window.location = `/show/${res.data.id}`,
    	alert("Business updated successfully")
    );
      
    }



	componentDidMount(){
		var id = this.props.match.params["id"]

    axios.get(`http://localhost:3000/businesses/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, person_name: res.data.person_name, business_name: res.data.business_name, business_gst_number: res.data.business_gst_number});
    })
    .catch(function(error){
      console.log(error);
    })
  }

    render() {
      return (
        <div style={{ marginTop: 10}}>
				<h3 className="center">Add New Business</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Person Name:</label>
						<input 
							type="text" className="form-control"
							value={this.state.person_name}
							onChange={this.onChangePersonName}
						/>
					</div>
					<div className="form-group">
						<label>Business Name:</label>
						<input 
							type="text" className="form-control"
							value={this.state.business_name}
							onChange={this.onChangeBusinessName}
						/>
					</div>
					<div className="form-group">
						<label>GST Number: </label>
						<input 
							type="text" className="form-control"
							value={this.state.business_gst_number}
							onChange={this.onChangeGstNumber}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Register Business" className="btn btn-primary"/>
					</div>
				</form>
			</div>
      )
    }
}