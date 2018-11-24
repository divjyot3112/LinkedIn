import React, { Component } from "react";
import { Route } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

//import Inbox from "./inbox";
import RegisterRecruiter from "./recruiterUI/registerRecruiter";
import LoginRecruiter from "./recruiterUI/loginRecruiter";


import LoginApplicant from "./applicantUI/loginApplicant";
import ApplicantHome from "./applicantUI/Home"
import FetchJobs from "./applicantUI/fetchJobs"
import ProfilePage from "./applicantUI/profilePage"
import MyNetwork from "./applicantUI/myNetwork";




import JobDetails from "./applicationUI/JobDetails";
import ApplicationsForJob from "./applicationUI/ApplicationsForJob";
import Application from "./applicationUI/Userform";
import RootReducer from "../reducers";
//import ApplicationNavbar from "./applicationUI/ApplicationNavbar";




import promise from "redux-promise";

import thunk from 'redux-thunk';
const initialState = {};
const middleware = [thunk];




// //middleware settings
// // To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const composingMiddlewareAndDevTools = composePlugin(applyMiddleware(...middleware,promise));
export const store = createStore(
  RootReducer,
  //composePlugin(applyMiddleware(promise))
  composingMiddlewareAndDevTools
);

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route
            exact
            path="/recruiter/addRecruiter"
            component={RegisterRecruiter}
          />
          <Route
            exact
            path="/recruiter/loginRecruiter"
            component={LoginRecruiter}
          />

        <Route
          exact
          path="/applicant/loginApplicant"
          component={LoginApplicant}
        />

        <Route
        exact
        path="/"
        component={LoginApplicant}
      />

        <Route
        exact
        path="/applicant/applicantHome"
        component={ApplicantHome}
      />

      <Route
        exact
        path="/applicant/fetchJobs"
        component={FetchJobs}
      />

      <Route
        exact
        path="/applicant/profile/getprofile"
        component={ProfilePage}
      />

      <Route
      exact
      path="/applicant/profile/viewConnections"
      component={MyNetwork}
      />

      <Route 
      exact path="/applicantion/job" 
      component={JobDetails} 
      />

      <Route 
      exact path="/Application" 
      component={Application} 
      />

      <Route
        exact
        path="/ApplicationsForJob"
        component={ApplicationsForJob}
      />
      {/*<Route
        exact
        path="/ApplicationNavbar"
        component={ApplicationNavbar}
      />*/}


        </div>
      </Provider>
    );
  }
}

export default Main;
