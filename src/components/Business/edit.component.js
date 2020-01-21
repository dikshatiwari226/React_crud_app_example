import React, {Component} from 'react';
import axios from 'axios';
import {NotificationManager} from 'react-notifications';


export default class Edit extends Component {

	constructor(props){
		super(props);
			this.onChangePersonName = this.onChangePersonName.bind(this);
			this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
			this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
			this.onSubmit = this.onSubmit.bind(this);
			this.goBack = this.goBack.bind(this);

			this.state ={
				person_name: '',
				business_name: '',
				business_gst_number: ''
			}
	}

	goBack(){
    this.props.history.goBack();
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
		var api_url = process.env;
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
    axios.post(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/edit/${id}`, obj, {headers: header})
    .then(res=> {
    		if(res.data.errors)
    	{
    		NotificationManager.error(res.data.errors[0]);
    	}
    	else{
    		var id = res.data.data.business.id
    		NotificationManager.success("Business updated successfully", 2000);
    		this.props.history.push(`/show/${id}`);
    	}});
    }



	componentDidMount(){
		var api_url = process.env;
		var id = this.props.match.params["id"]

    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/businesses/${id}`)
    .then(res=>{
      this.setState({id: res.data.id, person_name: res.data.person_name, business_name: res.data.business_name, business_gst_number: res.data.business_gst_number});
    })
    .catch(function(error){
      console.log(error);
    })
  }

    render() {
      return (
        <div style={{ marginTop: "3%",  padding: "5%"}}>
       	<button type="button" className="btn btn-secondary" onClick={this.goBack}>Back</button>
				<h3 className="text-center">Update Business</h3><br/>
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
					<div className="form-group d-flex justify-content-center">
						<input type="submit" value="Update Business" className="btn btn-primary"/>
					</div>
				</form>
			</div>
      )
    }
}