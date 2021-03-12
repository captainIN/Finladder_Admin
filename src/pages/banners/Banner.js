import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { fetchCategory, createNewBanner, updateCategory, deleteCategory, fetchHomePageBanner } from '../../store/actions'
function Banner({fetchHomePageBanner,createNewBanner, updateCategory, deleteCategory, categories, banners}) {
    useEffect(() => {
        getAllBanners()
    }, [])
    const [newBannerURL, setnewBannerURL] = useState("")
    const [newBannerHeading, setnewBannerHeading] = useState("")
    const [newBannerSubHeading, setnewBannerSubHeading] = useState("")
    const [newCTAText, setnewCTAText] = useState("")
    const [newTargetURL, setnewTargetURL] = useState("")


    
    const [updateCategoryName, setUpdateCategoryName] = useState("")
    const [currentCategory, setcurrentCategory] = useState({})

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getAllBanners = async () => {
        await fetchHomePageBanner()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createNewBanner({
            "bannerURL":newBannerURL,
            "bannerHeading":newBannerHeading, 
            "bannerSubHeading":newBannerSubHeading, 
            "targetURL":newTargetURL, 
            "ctaText": newCTAText
        })
        handleClose()
        getAllBanners()
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
        getAllBanners()
    }
    return (
        
        <MainWrapper current="5">
            <Button style={{float:'right'}} onClick={handleShow}>Add New Banner</Button>
            <br/>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Banner Heading</th>
                        <th>Banner Sub Heading</th>
                        <th>CTA Button Text</th>
                        <th>CTA Button Target Url</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banners.map(item => {
                        return <tr key={item._id}>
                            <td><img src={item.bannerURL} style={{width:'95px'}}/></td>
                            <td>{item.bannerHeading}</td>
                            <td>{item.bannerSubHeading}</td>
                            <td>{item.ctaText}</td>
                            <td><a href={item.targetURL}>{item.targetURL}</a></td>
                            
                            <td>
                                <Button variant="outline-primary" onClick={()=>{beginUpdate(item._id, item.bannerHeading)}}>Edit</Button>
                                <span> </span>
                                <Button variant="outline-danger" onClick={async ()=>{await deleteCategory(item._id); getAllBanners()}}>Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Banner</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff'}}>
                        <Form.Group>
                            <Form.Label>Banner Url</Form.Label>
                            <Form.Control required type="text" placeholder="Enter Name" onChange={e => setnewBannerURL(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Banner Heading</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={e => setnewBannerHeading(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Banner Sub Heading</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={e => setnewBannerSubHeading(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CTA Text</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={e => setnewCTAText(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Target URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={e => setnewTargetURL(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" >
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={show1} onHide={handleClose1} animation={false}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Banner - {currentCategory.name}</Modal.Title>
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
        categories: state.main.categories,
        banners: state.main.banners
    }
}
export default connect(mapStateToProps, {fetchHomePageBanner, createNewBanner, updateCategory, deleteCategory })(Banner)
