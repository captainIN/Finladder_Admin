import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { fetchUsers, fetchCourse, createCoupon, updateCategory, deleteCoupon, assignCourse, unassignCourse } from '../../store/actions'
function User({fetchUsers, fetchCourse, createCoupon, updateCategory, deleteCoupon, users, assignCourse, courses, unassignCourse}) {
    const [searchQuery, setsearchQuery] = useState("")
    useEffect(() => {
        getAllUsers()
    }, [])

    const [selectedUserCourse, setselectedUserCourse] = useState(null)
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
        await fetchCourse()
        await fetchUsers(fetchCourse,)
    }
    const handleSubmit = async (courseId) => {
        const res = await assignCourse({
            'id': selectedUser,
            'courses': [courseId]
        })
        handleClose()
        alert("Course Assigned Successfully!")
        getAllUsers()
    }
    const showHisCourse = (userid,id) => {
        setselectedUser(userid)
        setselectedUserCourse(id)
        handleShow1()
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
    return (
        
        <MainWrapper current="2">
            {/* <Button style={{float:'right', marginBottom: '10px'}} onClick={handleShow}>New Coupon</Button> */}
            <br/>
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
                    {users.map((item,idx) => {
                        if(item.name.toLowerCase().includes(searchQuery.toLowerCase())){
                            return <tr key={item._id}>
                                <td>{idx+1}</td>
                                <td>{item.name}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td>Total : {item.myCart.length} | <Button variant="primary" style={{padding:'1px 5px', fontSize:'13px'}} onClick={async ()=>{await showHisCourse(item._id, item.myCart);}}>View</Button></td>
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
                        <ol>
                        {selectedUserCourse && selectedUserCourse.map((item,idx) => {
                            return courses.map(element => {
                                    if(item.courseId === element._id){
                                        return <li>{element.courseName} <button onClick={async ()=>{await unassignCourse({id:selectedUser,courseId:element._id});await getAllUsers(); alert("Course Revoked"); handleClose1()}} className="btn btn-outline-danger" style={{padding:2}}>Revoke</button></li>
                                    }
                                })
                            
                        })}
                        </ol>
                    </Modal.Body>
            </Modal>
        </MainWrapper>
    )
}
const mapStateToProps = state => {
    return {
        users: state.main.users,
        courses: state.main.courses
    }
}
export default connect(mapStateToProps, {fetchUsers,fetchCourse, createCoupon, updateCategory, deleteCoupon, assignCourse, unassignCourse })(User)
