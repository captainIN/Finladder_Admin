import React from 'react';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux'
import * as actions from './store/actions';
import history from './history'
import ScrollToTop from './ScrollToTop'

import Navbar from './components/Navbar'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Course from './pages/courses/Course';
import CourseWizard from './pages/courses/CourseWizard';
import Category from './pages/category/Category';
import Banner from './pages/banners/Banner';
import Coupon from './pages/coupon/Coupon';
import User from './pages/users/User';
import EditCourseWizard from './pages/courses/EditCourseWizard';
import LatestUsers from './pages/users/LatestUsers';
function App({isAuthenticated}) {
  return (
    <>
    <BrowserRouter history={history} basename="/admin">
      <ScrollToTop>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={isAuthenticated?Home:withRouter(Login)}/>
        
        {/* Courses below */}
        <Route exact path="/courses" component={isAuthenticated?Course:withRouter(Login)}/>
        <Route exact path="/course/edit/:id" component={isAuthenticated?EditCourseWizard:withRouter(Login)}/>
        {/* <Route exact path="/detail/belt/:id" component={isAuthenticated?BeltDetailPage:withRouter(Login)}/> */}
        <Route exact path="/create/course" component={isAuthenticated?CourseWizard:withRouter(Login)}/>
        {/* <Route exact path="/edit/belt/:id" component={isAuthenticated?EditBelt:withRouter(Login)}/> */}
        

        <Route exact path="/coupons" component={isAuthenticated?Coupon:withRouter(Login)}/>

        <Route exact path="/students" component={isAuthenticated?User:withRouter(Login)}/>

        <Route exact path="/categories" component={isAuthenticated?Category:withRouter(Login)}/>

        <Route exact path="/banners" component={isAuthenticated?Banner:withRouter(Login)}/>

        {/* Category below */}
        {/* <Route exact path="/allcategories" component={isAuthenticated?AllCategories:withRouter(Login)}/>
        <Route exact path="/categories/edit/:id" component={isAuthenticated?EditCategory:withRouter(Login)}/> */}
        {/* <Route exact path="/cake/category" component={isAuthenticated?AddCategory:withRouter(Login)}/> */}
        
{/* 
        <Route exact path="/allusers" component={isAuthenticated?Users:withRouter(Login)}/>
        <Route exact path="/users/:id" component={isAuthenticated?ShowUserOrders:withRouter(Login)}/> */}

        <Route path="/login" component={withRouter(Login)}/>
        <Route path="/register" component={withRouter(Register)}/>
      </Switch>
      </ScrollToTop>
    </BrowserRouter>
    </>
  );
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, actions)(App);