import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import {fetchCategories} from '../store/actions'
import MainWrapper from '../components/MainWrapper'
function Home({}) {
    useEffect(() => {
        return () => {
            console.log("Unmounted Home")
        }
    }, [])
    return (
        <MainWrapper current="0">
            <Row>
                <Col lg={12}>
                    <br/>
                    <center><h2>Welcome to Admin Panel of Finladder </h2></center>
                    <br/><br/>
                </Col>
            </Row>
        </MainWrapper>
    )
}
const mapStateToProps = state => {
    return{}
}
export default connect(mapStateToProps,{})(Home)