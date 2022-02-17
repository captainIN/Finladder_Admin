import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { fetchfrms, CREATEFRM, updateCategory, deleteFrm } from '../../store/actions'
import CKEditor from 'ckeditor4-react';

function FRM({fetchfrms, CREATEFRM, updateCategory, deleteFrm, Frm}) {
    useEffect(() => {
        console.log("F")
        getAllFrms()
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

    const getAllFrms = async () => {
        console.log(':running')
        await fetchfrms()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await CREATEFRM({
            heading:newHeading,image:newImage,content:newContent
        })
        console.log(res)
        handleClose()
        getAllFrms()
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
        getAllFrms()
    }
    return (
        
        <MainWrapper current="6">
            <Button style={{float:'right', marginBottom: '10px'}} onClick={handleShow}>New Frm</Button>
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
                    {Frm.map(item => {
                        return <tr key={item._id}>
                            <td>{item.heading}</td>
                            <td><img style={{width:'80px'}} src={item.image}/></td>
                            <td>{item.content?.slice(0,20)}....</td>
                            <td>
                                <Button variant="outline-danger" onClick={async ()=>{await deleteFrm(item._id); getAllFrms()}}>Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>New Frm</Modal.Title>
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
        Frm: state.main.Frm
    }
}
export default connect(mapStateToProps, {fetchfrms, CREATEFRM, updateCategory, deleteFrm })(FRM)
