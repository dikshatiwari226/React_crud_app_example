import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import Moment from 'react-moment';


export default class Profile extends Component{
  constructor(props){
    super(props);
      this.state ={
        name: '',
        email: '',
        gender: '',
        contact: '',
        dob: '',
        address: '',
        profession: ''
      }
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


  render(){
    return(
      <div >
        <div className="container emp-profile" style={{backgroundColor: "-webkit-linear-gradient(left, #3931af, #00c6ff)"}} >
          <form method="post">
              <div className="row">
                  <div className="col-md-4">
                      <div className="profile-img">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                          <div className="file btn btn-lg btn-primary">
                              Change Photo
                              <input type="file" name="file"/>
                          </div>
                      </div><br/>
                  </div>
                  <div className="col-md-6">
                      <div className="profile-head">
                                  <h5>
                                      {this.state.name}
                                  </h5>
                                  <h6>
                                      {this.state.profession}
                                  </h6><br/>
                                  
                          <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item">
                                  <a href="#" className="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true">About</a>
                              </li>
                              <li className="nav-item">
                                  <a href="#" className="nav-link" id="profile-tab" data-toggle="tab"  role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="col-md-2">
                     
                       <Link to={`/edit_profile/${this.state.id}`} className="profile-edit-btn">Edit Profile</Link>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-4">
                      <div className="profile-work">
                        <a href="#" className="mx-2" role="button"><FontAwesomeIcon icon={faFacebookF}/></a>
                        <a href="#" className="mx-2" role="button"><FontAwesomeIcon icon={faGoogle}/></a>
                        <a href="#" className="mx-2" role="button"><FontAwesomeIcon icon={faTwitter}/></a>
                        <a href="#" className="mx-2" role="button"><FontAwesomeIcon icon={faLinkedin}/></a>
                        <a href="#" className="mx-2" role="button"><FontAwesomeIcon icon={faGithub}/></a>
                          <p>SKILLS</p>
                          <a href="#" >Web Designer</a><br/>
                          <a href="#" >Web Developer</a><br/>
                          <a href="#" >WordPress</a><br/>
                          <a href="#" >WooCommerce</a><br/>
                          <a href="#" >PHP, .Net</a><br/>
                      </div>
                  </div>
                  <div className="col-md-8">
                      <div className="tab-content profile-tab" id="myTabContent">
                          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>User Id</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.id}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Name</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.name}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Email</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.email}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Phone</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.contact}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Profession</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.profession}</p>
                                          </div>
                                      </div>
                          </div>
                          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Gender</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.gender}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Address</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p>{this.state.address}</p>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-md-6">
                                              <label>Date of Birth</label>
                                          </div>
                                          <div className="col-md-6">
                                              <p><Moment format="DD MMM YYYY">{this.state.dob}
                                              </Moment></p>
                                          </div>
                                      </div>
                          </div>
                      </div>
                  </div>
              </div>
          </form>           
        </div>
      </div>
    );
  }
}


