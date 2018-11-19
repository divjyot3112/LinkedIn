import React,{Component} from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { SplitButton,DropdownButton, MenuItem, Button, Image } from 'react-bootstrap';
//import { createUser } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";
import { loginUser } from "../../actions";
import { logoutUser } from "../../actions";
import { Field, reduxForm } from "redux-form";



//create the Navbar Component
class SearchBar extends Component {
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            // email : "",
            // password : "",
            // type : "",
            loginFlag : false,
            err : null //"Enter valid credentials"
        }
    }

    // componentDidMount(){
    // //    let signup_res= this.props.createUser();
    // //    console.log("signup response",signup_res)
                 
    // }
    
    //handle logout to destroy the cookie

    renderFieldTitle(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input style={{fontSize:"1.2rem"}} className="form-control" type="email" {...field.input}  placeholder={field.placeholder}/>
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }

      renderFieldLocation(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input  style={{fontSize:"1.2rem"}} className="form-control" type="password" {...field.input}  placeholder={field.placeholder}/>
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }


      onSubmit(values) {
        console.log("search data",values);
        this.props.loginUser(values, () => {
           //this.props.history.push("/applicant/applicantHome");
          // window.location.reload(1); //refreshes the page so redux state is lost
           console.log("tested")
         });
      }

      handleFocus = () => { 
        this.setState({err : null});
    }
    
    render(){

        const { handleSubmit } = this.props;
       // this.state.email=localStorage.getItem("email")
        //if Cookie is set render Logout and user Button
        //<li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
       
            //Else display login button
            

            let redirectVar = null;

        return(
            <div style={{opacity:"1",zIndex:"1000",position:"absolute"}}> 
            {redirectVar}  
            <div class="container">
                <div class="login-form"> 
                    <div class="main-div-search" >

                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                    <div class="nav navbar-nav navbar-right navbar-brand" style={{marginTop:"-2%"}}>
                    <button class="btn btn-primary" style={{backgroundColor:"transparent",borderColor:"white",fontSize:"18px"}}>Search</button>
                    </div>

                    <div class="col-sm-4" style={{marginTop:"-2%"}}>
                    <Field
                    name="password"
                    component={this.renderFieldLocation}
                    placeholder="Location"
                    />
                    </div>

                    <div class="col-sm-4" style={{marginTop:"-2%"}}>
                    <Field
                    name="email"
                    component={this.renderFieldTitle}
                    placeholder="Job Title"
                    />
                    </div>
                    </form>
                      
                </div>
                </div>
                </div>
            
    </div>
            
        )
    }
}

function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.username) {
      errors.username = "Enter an ID";
    }
    if (!values.password) {
      errors.password = "Enter Password";
    }
    
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }

  function mapStateToProps(state) {
    return { loginApplicant: state.loginApplicant };
  }


export default reduxForm({
    validate,
    form: "NewLoginForm"
  })(connect(mapStateToProps, { loginUser, logoutUser })(SearchBar));
 
  
//export default connect(mapStateToProps, { loginUser, logoutUser })(LoginNavbar);
//export default Navbar;