import React,{useRef} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {createAdmin} from '../store/actions'

function Register({msg, createAdmin, history}) {
    const nameQ = useRef(null)
    const emailQ = useRef(null)
    const mobQ = useRef(null)
    const passwordQ = useRef(null)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createAdmin(nameQ.current.value, emailQ.current.value, mobQ.current.value, passwordQ.current.value, history)
    }
    return (
        <div className="container auth-box">
            <h3>Admin Register</h3>
            {msg !== "" &&   <div className="alert alert-danger" role="alert">
                    {msg}
                </div>}
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <label >Name</label>
                    <input type="text" ref={nameQ} className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" ref={emailQ} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label >Mobile</label>
                    <input type="tel" ref={mobQ} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={passwordQ} className="form-control" placeholder="Password" />
                    <small id="emailHelp" className="form-text text-muted">Password length must be min 5 characters.</small>
                </div>
               
                <input type="submit" className="btn btn-primary" value="Create Account" />
            </form>
            <Link to="/login">Login</Link>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        msg: state.auth.signup_msg
    }
}
export default connect(mapStateToProps, {createAdmin})(Register)