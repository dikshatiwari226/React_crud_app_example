import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Create from './components/Business/create.component';
import Edit from './components/Business/edit.component';
import Index from './components/Business/index.component';
import Show from './components/Business/show.component';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/User/Profile';
import EditProfile from './components/User/EditProfile';
import UserIndex from './components/User/UserIndex';
import ShowUser from './components/User/ShowUser';
import EditUser from './components/User/EditUser';


import './index.css';
import { FaSignOutAlt,FaSignInAlt } from 'react-icons/fa';
// import './App.css';

class App extends Component{

  Logout() {
    localStorage.clear();
    window.location = "/login"
    alert("Logout successfully");
  }

  render(){
    return(
      <Router>
        <div>
          <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique fixed-top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/create'} className="nav-link">Create</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/index'} className="nav-link">Index</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/userIndex'} className="nav-link">Users</Link>
                  </li>
                  <li className="nav-item dropdown active">
                    <Link to="" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tutorials 
                    </Link>
                      <div className="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink-3">
                          <Link to="#" className="dropdown-item">Make-up</Link>
                          <Link to="#" className="dropdown-item">Nails</Link>
                          <Link to="#" className="dropdown-item">DIY</Link>
                      </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto nav-flex-icons">
                    

                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    </form>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user"></i> 
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink">
                            
                            <a className="dropdown-item" href="/profile"><i className="fa fa-user"> Profile</i></a>
                            <Link to="#" className="dropdown-item" style={{fontWeight: "bold"}}><FaSignOutAlt/> Log out</Link>
                            <Link to="#" className="dropdown-item"><i className="fa fa-cog"> Change Password</i></Link>
                        </div>
                    </li>

                    <li className="nav-item  d-flex justify-content-end">
                      <Link to={'/signup'} className="nav-link">Sign Up</Link>
                    </li>
                        {
                          !localStorage.token &&
                        
                          <li className="nav-item  d-flex justify-content-end">
                            <Link to={'/login'} className="nav-link"><FaSignInAlt/> Login</Link>
                          </li>
                        }
                        {
                          localStorage.token &&
                        
                          <li className="nav-item  d-flex justify-content-end">
                            <button onClick={this.Logout} className="nav-link"><FaSignOutAlt/>
                            Logout</button> 
                          </li>
                        }
                </ul>
            </div>
          </nav>
          
          <br/>
           <Switch>
              <Route exact path='/create' component={Create}/>
              <Route path='/edit/:id' component={Edit}/>
              <Route path='/index' component={Index}/>
              <Route path='/show/:id' component={Show}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={Login}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/edit_profile/:id' component={EditProfile}/>
              <Route path="/userIndex" component={UserIndex}/>
              <Route path='/editUser/:id' component={EditUser}/>
              <Route path='/showUser/:id' component={ShowUser}/>
              <Route path='/' component={Index}/>
              
           </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
