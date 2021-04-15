import React, { useEffect, useState } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import MainWrapper from '../../components/MainWrapper'
import { editCourse, fetchCourse } from '../../store/actions'
import {connect} from 'react-redux'
import moment from 'moment'
import Axios from 'axios'

function EditCourseWizard({editCourse, categories, match, courses, fetchCourse}) {
    const [courseInfo, setcourseInfo] = useState(null)
    const [topics, settopic] = useState([])
    useEffect(() => {
        courses.map(item => {
            if(item._id === match.params.id){
                setcourseInfo(
                    {
                        "courseName":item.courseName,
                        "courseDuration":item.courseDuration,
                        "price":item.price,
                        "thumbnailImage":item.thumbnailImage,
                        "categoryId":item.categoryId?item.categoryId:categories[0]._id,
                        "description":item.description,
                        "rating": item.rating
                    }
                )
                settopic(item.topics)
            }
        })
    }, [])
    const addTopics = () => {
        let temp = [...topics]
        temp.push({
            "topicName":"",
            "topicDuration": "",
            "subTopics":[]
        })
        settopic(temp)
    }
    const removeTopic = (idx) => {
        let temp = [...topics]
         temp.splice(idx, 1);
         settopic(temp)
         getCourseDuration()
    }
    const addSubTopics = (idx) => {
        let temp = [...topics]
        temp[idx].subTopics.push({
            "subTopicName":"",
            "duration":"",
            "videoLink":"",
            "previewLink":"",
            "docUrl":"",
            "description": ""
         })
         settopic(temp)
    }
    const removeSubTopics = (idx1, idx2) => {
        let temp = [...topics]
         temp[idx1].subTopics.splice(idx2, 1);
         settopic(temp)
         getTopicDuration(idx1)
    }
    const updateSubValue = (idx1, idx2, key, value) => {
        let temp = [...topics]
        temp[idx1].subTopics[idx2][key] = value
        settopic(temp)
    }
    const updateTopicValue = (idx1, key, value) => {
        let temp = [...topics]
        temp[idx1][key] = value
        settopic(temp)
    }
    const updateCourseValue = (key, value) => {
        let temp = {...courseInfo}
        temp[key] = value
        setcourseInfo(temp)
    }
    const getTimeDuration = async (link, idx, index) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = link.match(regExp);
        if(match&&match[7].length==11){
            const res = await Axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${match[7]}&part=contentDetails&key=AIzaSyCOscc7A9jIRE6aC2rmxJlWWtfiRzLs0OE`)
            console.log(res.data.items[0].contentDetails.duration)
            var somevalue = moment.duration(res.data.items[0].contentDetails.duration).asSeconds()
            updateSubValue(idx, index, "duration", somevalue)
            getTopicDuration(idx)
        }
    }
    const getTopicDuration = (idx) => {
        var sumValue = 0
        topics[idx].subTopics.map(sub => {
            sumValue += Number(sub.duration)
        })
        updateTopicValue(idx, "topicDuration", sumValue)
        getCourseDuration()
    }
    const getCourseDuration = () => {
        var sumValue = 0
        topics.map(top => {
            sumValue += Number(top.topicDuration)
        })
        updateCourseValue('courseDuration', sumValue)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()  
        let data = {
            ...courseInfo, topics
        }
        console.log(data)
        await editCourse(match.params.id, data)
        alert("Successfully Updated!")
        fetchCourse()
    }
    return (
        <MainWrapper current="1">
            <br/>
            <div className="course-wizard" style={{backgroundColor:'#fff', padding: '10px 20px'}}>
            <h2>Edit Course Wizard</h2>
            <hr/>
            {courseInfo && <Form onSubmit={e => handleSubmit(e)}>
                <Row>
                            <Form.Group as={Col} lg={5} controlId="formGridAddress2">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={courseInfo.courseName} onChange={e=>{updateCourseValue('courseName', e.target.value)}}/>
                            </Form.Group>
                            <Form.Group as={Col} lg={3} controlId="formGridAddress2">
                                <Form.Label>Course Duration</Form.Label>
                                <Form.Control type="text" placeholder="" value={courseInfo.courseDuration} onChange={e=>{updateCourseValue('courseDuration', e.target.value)}}/>
                            </Form.Group>
                            <Form.Group as={Col} lg={3} controlId="formGridAddress2">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="" value={courseInfo.price}  onChange={e=>{updateCourseValue('price', e.target.value)}}/>
                            </Form.Group>
                            <Form.Group as={Col} lg={5} controlId="formGridAddress2">
                                <Form.Label>Thumbnail Image URL</Form.Label>
                                <Form.Control type="text" placeholder="" value={courseInfo.thumbnailImage} onChange={e=>{updateCourseValue('thumbnailImage', e.target.value)}}/>
                            </Form.Group>
                            <Form.Group as={Col} lg={1} controlId="formGridAddress2">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type="text" placeholder="" value={courseInfo.rating} onChange={e=>{updateCourseValue('rating', e.target.value)}}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" custom onChange={e=>{updateCourseValue('categoryId', e.target.value)}}>
                                    {categories.map(item =>{
                                        return <option value={item._id}>{item.categoryName}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} lg={9} controlId="formGridAddress2">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="" value={courseInfo.description}  onChange={e=>{updateCourseValue('description', e.target.value)}}/>
                            </Form.Group>
                            </Row>

                {topics.map((topi, idx) => {
                    return (
                        
                        <Form.Row className="topicBody">
                            <Col lg={12} className="head"><strong style={{'color':'#fff'}}>Topic - {idx+1}</strong><Button variant="danger" size="sm" onClick={()=>removeTopic(idx)}>Delete Topic</Button></Col>
                            <Form.Group as={Col} lg={6} controlId="formGridAddress2">
                                <Form.Label>Topic Name</Form.Label>
                                <Form.Control type="text" placeholder="" value={topi.topicName} onChange={e => updateTopicValue(idx, "topicName", e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} lg={6} controlId="formGridAddress2">
                                <Form.Label>Topic Duration</Form.Label>
                                <Form.Control type="text" placeholder="" value={topi.topicDuration} onChange={e => updateTopicValue(idx, "topicDuration", e.target.value)}/>
                            </Form.Group>
                            {topi.subTopics.map((subT, index) => {
                                return (
                                    <div  className="subtopicBody">
                                    <Col lg={12} className="head">
                                        <strong style={{'color':'#0013f2'}}>Sub Topic #{index+1}</strong>
                                        <Button variant="danger" size="sm" onClick={()=>removeSubTopics(idx,index)}>Delete Sub-Topic</Button>
                                    </Col>
                                <Col lg={12}>
                                <Row>
                                    
                                    <Form.Group as={Col} lg={3} controlId="formGridAddress2">
                                        <Form.Label>Sub Topic Name</Form.Label>
                                        <Form.Control type="text" onChange={e => updateSubValue(idx, index, "subTopicName", e.target.value)} placeholder="" value={subT.subTopicName}/>
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} lg={3} controlId="formGridAddress2">
                                        <Form.Label>Link Of Video</Form.Label>
                                        <Form.Control type="text" onChange={e => {updateSubValue(idx, index, "videoLink", e.target.value); getTimeDuration(e.target.value,idx, index);}} placeholder="" value={subT.videoLink}/>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={3  } controlId="formGridAddress2">
                                        <Form.Label>Duration</Form.Label>
                                        <Form.Control type="text" onChange={e => updateSubValue(idx, index, "duration", e.target.value)} placeholder="" value={subT.duration}/>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={3} controlId="formGridAddress2">
                                        <Form.Label>Link of Preview</Form.Label>
                                        <Form.Control type="text" onChange={e => updateSubValue(idx, index, "previewLink", e.target.value)} placeholder="" value={subT.previewLink}/>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={9} controlId="formGridAddress2">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={2} onChange={e => updateSubValue(idx, index, "description", e.target.value)} placeholder="" value={subT.description}/>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={3} controlId="formGridAddress2">
                                        <Form.Label>Upload Document</Form.Label>
                                        <Form.Control type="text" onChange={e => updateSubValue(idx, index, "docUrl", e.target.value)} placeholder="" value={subT.docUrl}/>
                                    </Form.Group>
                                </Row>
                                
                                </Col>
                                </div>)
                            })}
                            <Col lg={12} className="bottom"><Button variant="outline-primary" className="ml-auto" onClick={()=>addSubTopics(idx)}>Add Subtopic</Button></Col>
                            
                        </Form.Row>
                    )
                })}
                <div style={{display: 'flex', justifyContent:'space-between', marginTop: '10px'}}>
                    <Button variant="outline-primary" onClick={()=>addTopics()}>Add Topic</Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
                
            </Form>}
            </div>
        </MainWrapper>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.main.categories,
        courses: state.main.courses

    }
}
export default connect(mapStateToProps, {editCourse, fetchCourse})(EditCourseWizard)
