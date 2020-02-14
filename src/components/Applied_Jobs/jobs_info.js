import React, {Component} from 'react';
import axios from 'axios';
import { Card, CardHeader, CardFooter, CardBody,CardTitle, CardText,Row, Col,CardLink } from 'reactstrap';
import { Link } from 'react-router-dom'; 

export default class jobs_info extends Component{ 

  constructor(props){
    super(props);
    this.state ={
      jobsinformation: []
    };
  }

  componentDidMount(){
    var api_url = process.env;
    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/job_informations`)
    .then(result=>{
    	this.setState({ jobsinformation: result.data.data.job_informations });
    })
    .catch(function(error){
      console.log(error);
    })
  }

    render(){
    	const { jobsinformation } = this.state;
	    return (
	       <div className="container"><br/><br/>
	           	<Link to={"/create"} className="btn btn-info float-right">Add New</Link><br/>
          		<h1 className="text-center">Job Information</h1><br/><br/>
          		<Row>
		          	{jobsinformation.map(jobinfo => ( 
			      				<Col sm="4">
					          	<Card>
								        <CardHeader>Company Name :- {jobinfo.company_name}</CardHeader>
								        <CardBody>
								          <CardTitle>Job Title :- {jobinfo.job_title}</CardTitle>
								          <CardText><b>Job Description :-</b> With supporting text below as a natural lead-in to additional content. <CardLink href="#">Read More</CardLink></CardText>
								          <CardLink href="#">{jobinfo.company_location}</CardLink>
								        </CardBody>
								        <CardFooter className="text-muted">{jobinfo.post_date}</CardFooter>
								      </Card>
							      </Col>
		          	))}
	    				</Row>
	       </div>
	    );
  }
}
 
