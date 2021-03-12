import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import MainWrapper from '../../components/MainWrapper'
import { fetchCoupons, createCoupon, updateCategory, deleteCoupon, fetchCouponsategory } from '../../store/actions'
function Coupon({fetchCoupons,createCoupon, updateCategory, deleteCoupon, coupons}) {
    useEffect(() => {
        getAllCoupons()
    }, [])
    const [newCouponCode, setNewCouponCode] = useState("")
    const [newDiscount, setNewDiscount] = useState(0)
    const [newMaxDiscount, setNewMaxDiscount] = useState(0)
    const [updateCategoryName, setUpdateCategoryName] = useState("")

    const [currentCategory, setcurrentCategory] = useState({})

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const getAllCoupons = async () => {
        await fetchCoupons()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createCoupon({
            "couponCode":newCouponCode, 
            "discount":newDiscount, 
            "maxDiscount":newMaxDiscount
        })
        handleClose()
        getAllCoupons()
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
        getAllCoupons()
    }
    return (
        
        <MainWrapper current="3">
            <Button style={{float:'right', marginBottom: '10px'}} onClick={handleShow}>New Coupon</Button>
            <br/>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Coupon Code</th>
                        <th>Discount</th>
                        <th>Max Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map(item => {
                        return <tr key={item._id}>
                            <td>{item.couponCode}</td>
                            <td>{item.discount}</td>
                            <td>{item.maxDiscount}</td>
                            <td>
                                <Button variant="outline-danger" onClick={async ()=>{await deleteCoupon(item._id); getAllCoupons()}}>Delete</Button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>New Coupon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#fff'}}>
                        <Form.Group>
                            <Form.Label>Coupon Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter CODE" onChange={e => setNewCouponCode(e.target.value)} required={true}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Discount(%)</Form.Label>
                            <Form.Control type="number" placeholder="Enter Discount" onChange={e => setNewDiscount(e.target.value)} required={true}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Discount(Enter amount in INR)</Form.Label>
                            <Form.Control type="number" placeholder="Enter Max Dicount" onChange={e => setNewMaxDiscount(e.target.value)} required={true}/>
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
        coupons: state.main.coupons
    }
}
export default connect(mapStateToProps, {fetchCoupons, createCoupon, updateCategory, deleteCoupon })(Coupon)
