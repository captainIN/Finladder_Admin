import React,{useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Modal } from 'react-bootstrap'
import { fetchCourse } from '../../store/actions'

function Course({fetchCourse, courses, categories}) {
    const [selectedCat, setselectedCat] = useState("all")
    const [show, setShow] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currentCat = useRef("all")

    useEffect( () => {
        fetchAllCourse()
        return () => {
            console.log("Unmounted All belts Page")
        }
    }, [])
    const fetchAllCourse = async () => {
        await fetchCourse()
    }
    const showDetail = (data) => {
        
        setCurrentCourse(data)
        handleShow()
    }
    return (
        <MainWrapper current="1">
            <Row>
                <Col lg={3}>
                    <select ref={currentCat} onChange={(e)=>{setselectedCat(e.target.value)}} className="form-control">
                        <option value="all">All</option>
                        {categories.map(each => {
                            return <option value={each.categoryName}>{each.categoryName}</option>
                        })}
                    </select>
                </Col>
                <Col lg={7}></Col>
                <Col lg={2}>
                    <Link to="/create/course" className="btn btn-success">New Course</Link>
                </Col>
            </Row>
            <br/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{textAlign:'center', width: '1%'}}>S.no</th>
                        <th style={{textAlign:'center', width: '1%'}}>Image</th>
                        <th style={{textAlign:'center', width: '35%' }}>Name</th>
                        <th style={{textAlign:'center', }}>Category</th>
                        <th style={{textAlign:'center', width: '10%'}}>Price</th>
                        <th style={{textAlign:'center', width: '10%'}}>Total Topics</th>
                        <th style={{textAlign:'center', width: '1%'}}>Show</th>
                        <th style={{textAlign:'center', width: '1%'}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => {
                        if(selectedCat === 'all'){
                            return <tr>
                                <td>{index+1}</td>
                                <td><img width="100" src={course.thumbnailImage} alt={index} /></td>
                                <td>{course.courseName}</td>
                                <td>{course.categoryId.categoryName}</td>
                                <td>{course.price}</td>
                                <td>{course.topics.length}</td>
                                <td><Button variant="outline-primary" onClick={()=>showDetail(course)}>Show</Button></td>
                                <td><Button variant="outline-danger">Delete</Button></td>
                            </tr>
                        }else{
                            if(selectedCat === course.categoryId.categoryName){
                                return <tr>
                                <td>{index+1}</td>
                                <td><img width="100" src={course.thumbnailImage} alt={index} /></td>
                                <td>{course.courseName}</td>
                                <td>{course.categoryId.categoryName}</td>
                                <td>{course.price}</td>
                                <td>{course.topics.length}</td>
                                <td><Button variant="outline-primary" onClick={()=>showDetail(course)}>Show</Button></td>
                                <td><Button variant="outline-danger">Delete</Button></td>
                            </tr>
                            }
                            
                        }
                        
                    })}
                </tbody>
            </table>
            {currentCourse && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{currentCourse.courseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight:'70vh', overflowY:'scroll'}}>
                    <div>
                        <img src={currentCourse.thumbnailImage} style={{width:'100%'}}/>
                        <div>
                            <h2>{currentCourse.courseName}</h2>
                            <h6>Rs {currentCourse.price}</h6>
                            <h6>{currentCourse.courseDuration} hours</h6>
                            <strong>{currentCourse.categoryId.categoryName}</strong>
                            <p>{currentCourse.description}</p>
                        </div>
                        <div>
                        <ol>
                            {currentCourse.topics.map((topic, idx) => {
                                return <li key={idx}><strong>{topic.topicName}</strong> ({topic.topicDuration} hours)
                                        {topic.subTopics.map(sub =>{
                                            return <ul>
                                                <li>{sub.subTopicName} - {sub.duration} hours</li>
                                                <li>Preview - <a href={sub.previewLink}>link</a></li>
                                                <li>Video - <a href={sub.videoLink}>link</a></li>
                                            </ul>
                                        })}
                                    </li>
                                
                            })}
                            </ol>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
                </Modal.Footer>
            </Modal>}
        </MainWrapper>
    )
}
const mapStatesToProps = state => {
    return{
        token: state.auth.token,
        courses: state.main.courses,
        categories: state.main.categories
    }
}
export default connect(mapStatesToProps,{fetchCourse})(Course);