import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
const MainWrapper = ({ children, current }) => (
    <Container fluid>
        <Row>
            <Col lg={2} className="sidebar" >
                <div className={`side-link-cont ${current === "0"?'active-btn':''}`}><Link className="btn side-link" to="/">Home</Link></div>
                <div className={`side-link-cont ${current === "1"?'active-btn':''}`}><Link className="btn side-link" to="/courses">Courses</Link></div>
                <div className={`side-link-cont ${current === "2"?'active-btn':''}`}><Link className="btn side-link" to="/students">Student</Link></div>
                <div className={`side-link-cont ${current === "3"?'active-btn':''}`}><Link className="btn side-link" to="/coupons">Coupons</Link></div>
                <div className={`side-link-cont ${current === "4"?'active-btn':''}`}><Link className="btn side-link" to="/categories">Categories</Link></div>
                <div className={`side-link-cont ${current === "5"?'active-btn':''}`}><Link className="btn side-link" to="/banners">Home Screen Banners</Link></div>
                <div className={`side-link-cont ${current === "6"?'active-btn':''}`}>
                    <Link className="btn side-link" to="/frm">FRM</Link></div>
                    <div className={`side-link-cont ${current === "7"?'active-btn':''}`}>
                    <Link className="btn side-link" to="/eqr">EQR</Link></div>
                    <div className={`side-link-cont ${current === "8"?'active-btn':''}`}>
                    <Link className="btn side-link" to="/cla">CLA</Link></div>
                    <div className={`side-link-cont ${current === "9"?'active-btn':''}`}>
                    <Link className="btn side-link" to="/clm">Clm</Link></div>
                    <div className={`side-link-cont`}>
                  </div>
            </Col>
            <Col lg={10} className="manage-scroll" >
                <br/>
                {children}
            </Col>
        </Row>
    </Container>
)

export default MainWrapper;