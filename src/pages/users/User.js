import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import Spinner from '../../Spinner-1s.svg'
import { fetchUsers, fetchUsersCourses, fetchCourse, createCoupon, updateCategory, deleteCoupon, assignCourse, unassignCourse, fetchNextUsers } from '../../store/actions'
function User({fetchUsers, fetchUsersCourses, fetchCourse, createCoupon, updateCategory, deleteCoupon, users, assignCourse, courses, unassignCourse, fetchNextUsers, total_users, page_no, fetching}) {
    const [searchQuery, setsearchQuery] = useState("")
    useEffect(() => {
        getAllUsers()
    }, [])

    const [selectedUserCourse, setselectedUserCourse] = useState(null)
    const [courseLoading, setCourseLoading] = useState(true)
    const [selectedUser, setselectedUser] = useState(null)
    const [updateCategoryName, setUpdateCategoryName] = useState("")

    const [currentCategory, setcurrentCategory] = useState({})

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getAllUsers = async () => {
        // await fetchCourse()
        await fetchUsers()
    }
    const handleSubmit = async (courseId) => {
        const res = await assignCourse({
            'id': selectedUser,
            'courses': [courseId]
        })
        handleClose()
        alert("Course Assigned Successfully!")
        // getAllUsers()
    }
    const showHisCourse = async (userid) => {
        setselectedUser(userid)
        handleShow1()
        setCourseLoading(true)
        const assigned_courses = await fetchUsersCourses(userid);
        console.log(assigned_courses)
        
        setselectedUserCourse(assigned_courses.data.myCart)
        setCourseLoading(false)
        
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const res = await updateCategory({
            "categoryName": updateCategoryName,
            "categoryId": currentCategory.id
        })
        handleClose1()
        getAllUsers()
    }
    const beginAssigning = async (id) => {
        setselectedUser(id)
        handleShow()
    }
    const showUpdatedCart = async (id) => {
        const assigned_courses = await fetchUsersCourses(id);
        setselectedUserCourse(assigned_courses.data.myCart)
        alert("Course Revoked");
    }
    return (
        
        <MainWrapper current="2">
            {/* <Button style={{float:'right', marginBottom: '10px'}} onClick={handleShow}>New Coupon</Button> */}
            <br/>
            <p>Total Users: {users.length}</p>
            
            <input type="text" className="form-control" onChange={(e)=>{setsearchQuery(e.target.value)}} placeholder="Search..." style={{width:'300px'}}/>
            <br/>
            <Table bordered>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {users.slice(0).reverse().map((item,idx) => {
                        if(item.name.toLowerCase().includes(searchQuery.toLowerCase())){
                            return <tr key={item._id}>
                                <td>{idx+1}</td>
                                <td>{item.name}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td><Button variant="primary" style={{padding:'1px 5px', fontSize:'13px'}} onClick={async ()=>{await showHisCourse(item._id);}}>View</Button></td>
                                <td>
                                    <Button variant="outline-info" onClick={async ()=>{await beginAssigning(item._id);}}>Assign Course</Button>
                                </td>
                            </tr>
                        }
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select A Course To Assign</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff', maxHeight:'500px',overflowY:'scroll'}}>
                        {courses && courses.map((item)=>{
                            return <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', border: '1.5px solid rgb(7 96 19 / 73%)', background:'#fff', marginBottom:'5px', padding:'2px 8px'}}>
                                <p>{item.courseName}</p>
                                <button onClick={() => handleSubmit(item._id)} className="btn btn-primary">Assign</button>
                            </div>
                        })}
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => handleSubmit(e)}>
                            Create
                        </Button>
                    </Modal.Footer> */}
            </Modal>
            <Modal show={show1} onHide={handleClose1} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enrolled Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff', position:'relative !important'}}>
                        {!courseLoading && selectedUserCourse.length>0 && <ol>
                        {selectedUserCourse && selectedUserCourse.map((item,idx) => {
                            
                                        return <li>{item.courseId.courseName} <button onClick={async ()=>{await unassignCourse({id:selectedUser,courseId:item.courseId._id}); showUpdatedCart(selectedUser);}} className="btn btn-outline-danger" style={{padding:2}}>Revoke</button></li>
                                  
                        })}
                        </ol>}
                        {!courseLoading && selectedUserCourse.length===0 && <div>No course assigned.</div>}
                        {courseLoading && <div className="d-flex justify-content-center"><img src={Spinner}/></div>}
                    </Modal.Body>
            </Modal>
        </MainWrapper>
    )
}
const mapStateToProps = state => {
    return {
        users: state.main.users,
        courses: state.main.courses,
        total_users: state.main.total_users,
        page_no: state.main.page_no,
        fetching: state.main.fetching
    }
}
export default connect(mapStateToProps, {fetchUsers, fetchUsersCourses,fetchCourse, createCoupon, updateCategory, deleteCoupon, assignCourse, unassignCourse, fetchNextUsers })(User)
