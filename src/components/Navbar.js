import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../store/actions'

function Navbar({isAuthenticated, logout}) {
    return (
        <div className="header">
            <div className="content">
                <Link to="/"><h3>Admin Finladder</h3></Link>
                {isAuthenticated && <button onClick={logout} className="btn btn-danger">Logout</button>}
                {!isAuthenticated && <Link to="/login" className="btn btn-primary">Login</Link>}
            </div>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps,{logout})(Navbar)