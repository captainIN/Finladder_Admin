import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { fetchCategory, createCategory, updateCategory, deleteCategory } from '../../store/actions'
function Category({fetchCategory,createCategory, updateCategory, deleteCategory, categories}) {
    useEffect(() => {
        getAllCategory()
    }, [])
    const [newCategoryName, setnewCategoryName] = useState("")
    const [updateCategoryName, setUpdateCategoryName] = useState("")

    const [currentCategory, setcurrentCategory] = useState({})

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getAllCategory = async () => {
        await fetchCategory()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createCategory({
            "categoryName": newCategoryName
        })
        handleClose()
        getAllCategory()
    }
    const beginUpdate = (id, name) => {
        setcurrentCategory({id: id, name: name})
        setUpdateCategoryName(name)
        handleShow1()
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const res = await updateCategory({
            "categoryName": updateCategoryName,
            "categoryId": currentCategory.id
        })
        handleClose1()
        getAllCategory()
    }
    return (
        
        <MainWrapper current="4">
            <Button style={{float:'right'}} onClick={handleShow}>New Category</Button>
            <br/>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(item => {
                        return <tr key={item._id}>
                            <td>{item.categoryName}</td>
                            <td>
                                <Button variant="outline-primary" onClick={()=>{beginUpdate(item._id, item.categoryName)}}>Edit</Button>
                                <span> </span>
                                <Button variant="outline-danger" onClick={async ()=>{await deleteCategory(item._id); getAllCategory()}}>Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>New Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff'}}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={e => setnewCategoryName(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => handleSubmit(e)}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={show1} onHide={handleClose1} animation={false}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Category - {currentCategory.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff'}}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={updateCategoryName} onChange={e => setUpdateCategoryName(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose1}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={e => handleUpdate(e)}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </MainWrapper>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.main.categories
    }
}
export default connect(mapStateToProps, {fetchCategory, createCategory, updateCategory, deleteCategory })(Category)
