import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import $ from 'jquery';


export default class ResetPasswordForm extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
			email: '',
			confirm_password: '',
		}
	}
	

	componentDidMount(){
		// custom rule will have name 'isPasswordMatch'
		ValidatorForm.addValidationRule('isPasswordMatch', (value)=>{
			if (value !== this.state.password) {
				return false;
			}
				return true;
		});
	}

	componentWillUnmount() {
    // remove rule when it is not needed
      ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  handleChange = (event) => {
    const {name, value} =  event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    // your submit logic
  }

  render(){
  	return (
            <ValidatorForm
              onSubmit={this.handleSubmit}>
                <TextValidator
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.password}
                />
                <TextValidator
                    label="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={this.state.repeatPassword}
                />
                <Button type="submit">Submit</Button>
            </ValidatorForm>
        );
  }
}