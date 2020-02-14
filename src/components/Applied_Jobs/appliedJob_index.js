import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { MDBDataTable } from 'mdbreact';
import {NotificationManager} from 'react-notifications';
import Loader from 'react-loader-spinner'


export default class appliedJobs extends Component {

	constructor(props){
		super(props);
    this.goBack = this.goBack.bind(this);
      this.state = {
        appliedjobs: [],
        isLoading: true
      };
	}

  goBack(){
    this.props.history.goBack();
  }

  componentDidMount(){
    var api_url = process.env;
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.get(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/applied_jobs`, {header: headers})
    .then(result=>{
      this.setState({appliedjobs: result.data.data.applied_jobs, isLoading: false});
    })
    .catch(function(error){
      console.log(error);
    })
  }
  

  appliedJobDelete = (id) => {
    var api_url = process.env;
      const headers = {
      'Content-Type': 'application/json'
      }
      axios.delete(`${JSON.parse(api_url.REACT_APP_ENV).APIURL}/api/v1/applied_jobs/${id}`, {headers: headers})
      .then(res => {
        if(res.data.errors)
        {
          NotificationManager.error(res.data.errors);
        }
        else{
          NotificationManager.success("Applied Jobs deleted successfully", 'Successfull!', 2000);
          this.props.history.push(`/appliedJob_index`);
        } 
      });
  }

  
  render() {
    var isAdmin = localStorage.user_role
    const { appliedjobs } = this.state;
    console.log("-----applied_job", appliedjobs)
    
    const allrecords = []; 
    {
      appliedjobs.map((appliedjobsUser, index) => 
        <div key={index}>
          { 
              allrecords.push({sn: index + 1, id: appliedjobsUser.id, position: appliedjobsUser.position, company: appliedjobsUser.company, application_no: appliedjobsUser.application_no, date_applied: appliedjobsUser.date_applied ,application_status: appliedjobsUser.application_status,
                show: <Link to={"/showAppliedJob/"+appliedjobsUser.id} className="btn btn-primary">Show</Link>,
                edit: <Link to={"/editAppliedJob/"+appliedjobsUser.id} className="btn btn-warning">Edit</Link>,
                delete: <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.appliedJobDelete(appliedjobsUser.id)};}}>Delete</button> })
                  
          }
      );
    }
        </div>
      )
    }

      this.state = {allrecords};

      if (isAdmin === "admin"){
        var show_columns = [
          {
            label: 'Id',
            field: 'id',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Position',
            field: 'position',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Company',
            field: 'company',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Application_No',
            field: 'application_no',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Date_Applied',
            field: 'date_applied',
            type: 'date-dd-mmm-yyyy', 
            targets: 0,
            sort: 'asc',
            width: 100
          },
          {
            label: 'Application_Status',
            field: 'application_status',
            sort: 'asc',
            width: 100
          },
          
          {
            label: 'Show',
            field: 'show',
            sort: 'disabled',
            width: 100
          },
          {
            label: 'Edit',
            field: 'edit',
            sort: 'disabled',
            width: 100
          },
          {
            label: 'Delete',
            field: 'delete',
            sort: 'disabled',
            width: 100
          }
        ]
      }
      else{
        var show_columns = [
          {
            label: 'Id',
            field: 'id',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Position',
            field: 'position',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Company',
            field: 'company',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Application_No',
            field: 'application_no',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Date_Applied',
            field: 'date_applied',
            type: 'date-dd-mmm-yyyy', 
            targets: 0,
            sort: 'asc',
            width: 100
          },
          {
            label: 'Application_Status',
            field: 'application_status',
            sort: 'asc',
            width: 100
          },
          
          {
            label: 'Show',
            field: 'show',
            sort: 'disabled',
            width: 100
          },
        ]
        
      }

      const data = {
        columns: show_columns,
        rows: allrecords
      };

    let loadingData;
    if (this.state.isLoading) {
      loadingData = <center>
                      <Loader
                       type="TailSpin"
                       color="#00BFFF"
                       height={100}
                       width={100}
                       timeout={10000}
                      />
                    </center>
        
    }else{
      loadingData = <div style={{marginTop: "3%",padding: "5%"}}>
                      <button type="button" className="btn btn-outline-default btn-md" onClick={this.goBack}>Back</button>
                      { isAdmin === "admin" &&
                        <Link to={"/applied_jobs"} className="btn btn-info float-right">Add New</Link>
                      }
                      <h3 align="center">Applied Job Users</h3><br/>
                      <MDBDataTable
                        striped
                        hover
                        data={data}
                      />
                    </div>
    }
      return(
        <div>{loadingData}</div>   
      );
  }
}