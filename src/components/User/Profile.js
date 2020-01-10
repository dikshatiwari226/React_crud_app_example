import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle,faTwitter,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import Moment from 'react-moment';

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);

      this.state ={
        name: '',
        email: '',
        gender: '',
        contact: '',
        dob: '',
        address: '',
        profession: '',
        selectedFile: null,
        image: ''
      }
  }

  fileSelectedHandler = event =>{
    debugger
    
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0]);
  }

  componentDidMount(){
    const header = {
      'Content-Type': 'application/json',
      'User-Token': localStorage.token
    }
    axios.get(`http://localhost:3000/api/v1/profile`, {headers: header})
    .then(res=>{
      this.setState({id: res.data.id, name: res.data.name, email: res.data.email, gender: res.data.gender, contact: res.data.contact, dob: res.data.dob, address: res.data.address, profession: res.data.profession, image: res.data.image.url});
    })
    .catch(function(error){
      console.log(error);
    })
  }

  onSubmit(e){
    e.preventDefault();
    const header = {
      'Content-Type': 'application/json'
    }

    const fdata = new FormData();
    fdata.append('file', this.state.selectedFile, this.state.selectedFile.name);

    var id = this.props.match.params["id"]
    axios.post(`http://localhost:3000/api/v1/editUser/${id}`, fdata,  {headers: header})
    .then(res=>
      window.location = `/profile/${res.data.data.user.id}`,
      alert("Profile picture uploaded successfully")
    );
  }

  render(){
    return(
      <div >
        <div className="container emp-profile" style={{backgroundColor: "-webkit-linear-gradient(left, #3931af, #00c6ff)"}} >
            
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img style={{width: 100, height: 100}} className='tc br3' alt='none' src={'http://localhost:3000'+ this.state.image } /><br/><br/><br/>
                            <form  onSubmit={this.onSubmit}>
                                <div className="file btn btn-md btn-primary">
                                    Change Photo
                                  <input type="file" onChange={this.fileSelectedHandler} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {this.state.name}
                                    </h5>
                                    <h6>
                                        {this.state.profession}
                                    </h6>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
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
                          <Link to="#" className="mx-2" role="button"><FontAwesomeIcon icon={faFacebookF}/></Link>
                          <Link to="#" className="mx-2" role="button"><FontAwesomeIcon icon={faGoogle}/></Link>
                          <Link to="#" className="mx-2" role="button"><FontAwesomeIcon icon={faTwitter}/></Link>
                          <Link to="#" className="mx-2" role="button"><FontAwesomeIcon icon={faLinkedin}/></Link>
                          <Link to="#" className="mx-2" role="button"><FontAwesomeIcon icon={faGithub}/></Link>
                          <p>SKILLS</p>
                          <Link to="#" >Web Designer</Link><br/>
                          <Link to="#" >Web Developer</Link><br/>
                          <Link to="#" >WordPress</Link><br/>
                          <Link to="#" >WooCommerce</Link><br/>
                          <Link to="#" >PHP, .Net</Link><br/>
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
        </div>
      </div>
    );
  }
}


