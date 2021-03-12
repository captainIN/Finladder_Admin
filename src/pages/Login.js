import React,{useRef} from 'react'
import {Link} from 'react-router-dom'
import {checkAdmin} from '../store/actions'
import {connect} from 'react-redux'
import { Container } from 'react-bootstrap'

function Login({checkAdmin, msg, history}) {
    const emailQ = useRef(null)
    const passwordQ = useRef(null)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        checkAdmin(emailQ.current.value, passwordQ.current.value, history)
    }
    return (
        <Container className="auth-box">
            <h3>Admin Login</h3>
            {msg !== "" &&   <div className="alert alert-danger" role="alert">
                    {msg}
                </div>}
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" ref={emailQ} className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={passwordQ} className="form-control" placeholder="Password" />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <Link to="/register">Register</Link>
        </Container>
    )
}
const mapStateToProps = state => {
    return{
        msg: state.auth.login_msg
    }
}
export default connect(mapStateToProps, {checkAdmin})(Login)