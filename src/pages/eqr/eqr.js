import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { fetcheqrs, CREATEEQR, updateCategory, deleteEqr } from '../../store/actions'
import CKEditor from 'ckeditor4-react';

function Eqr({fetcheqrs, CREATEEQR, updateCategory, deleteEqr, eqr}) {
    useEffect(() => {
        console.log("F")
        getAlleqrs()
    }, [0])
    const [newImage, setNewImage] = useState("")
    const [newHeading, setNewHeading] = useState("")
    const [newContent, setNewContent] = useState("")
    const [updateCategoryName, setUpdateCategoryName] = useState("")

    const [currentCategory, setcurrentCategory] = useState({})

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getAlleqrs = async () => {
        console.log(':running')
        await fetcheqrs()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await CREATEEQR({
            heading:newHeading,image:newImage,content:newContent
        })
        console.log(res)
        handleClose()
        getAlleqrs()
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
        getAlleqrs()
    }
    return (
        
        <MainWrapper current="7">
            <Button style={{float:'right', marginBottom: '10px'}} onClick={handleShow}>New eqr</Button>
            <br/>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Image</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {eqr.map(item => {
                        return <tr key={item._id}>
                            <td>{item.heading}</td>
                            <td><img style={{width:'80px'}} src={item.image}/></td>
                            <td>{item.content?.slice(0,20)}....</td>
                            <td>
                                <Button variant="outline-danger" onClick={async ()=>{await deleteEqr(item._id); getAlleqrs()}}>Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>New eqr</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff'}}>
                        <Form.Group>
                            <Form.Label>Heading</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title"
                             onChange={e => setNewHeading(e.target.value)} required={true}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control type="text"
                             placeholder="Enter Image Url" onChange={e => setNewImage(e.target.value)} required={true}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <CKEditor
                 
                   onChange={evt => setNewContent(evt.editor.getData())}
                    
                  
                />
                      
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
    console.log(state)
    return {
        eqr: state.main.eqr
    }
}
export default connect(mapStateToProps, {fetcheqrs, CREATEEQR, updateCategory, deleteEqr })(Eqr)
