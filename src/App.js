import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Create from './components/Business/create.component';
import Edit from './components/Business/edit.component';
import Index from './components/Business/index.component';
import Show from './components/Business/show.component';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Admin from './components/auth/Admin';
import Profile from './components/User/Profile';
import EditProfile from './components/User/EditProfile';
import './index.css';

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
            <a className="navbar-brand" href="#">React CRUD Example</a>
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
                  <li className="nav-item dropdown active">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tutorials 
                    </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink-3">
                          <a className="dropdown-item" href="#">Make-up</a>
                          <a className="dropdown-item" href="#">Nails</a>
                          <a className="dropdown-item" href="#">DIY</a>
                      </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto nav-flex-icons">
                    <li className="nav-item  d-flex justify-content-end">
                      <Link to={'/signup'} className="nav-link">Sign Up</Link>
                    </li>
                    {
                      !localStorage.token &&
                    
                      <li className="nav-item  d-flex justify-content-end">
                        <Link to={'/login'} className="nav-link"><i class="fa fa-sign-in"> Login</i></Link>
                      </li>
                    }
                    {
                      localStorage.token &&
                    
                      <li className="nav-item  d-flex justify-content-end">
                        <Link onClick={this.Logout} className="nav-link"><i class="fa fa-sign-out"></i>Logout</Link> 
                      </li>
                    }

                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    </form>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user"></i> 
                            </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-unique" aria-labelledby="navbarDropdownMenuLink">
                            
                            <a className="dropdown-item" href="/profile"><i className="fa fa-user">Profile</i></a>
                            <a className="dropdown-item" href="#"><i className="fa fa-sign-out" aria-hidden="true">Log out</i></a>
                            <a className="dropdown-item" href="#"><i className="fa fa-cog"> Change Password</i></a>
                        </div>
                    </li>
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
           </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
