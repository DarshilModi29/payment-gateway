import React from 'react'
import Cookies from "js-cookie";
import { Col, Row } from 'reactstrap';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    if (!Cookies.get("token")) {
        navigate("/login");
    }
    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{ textTransform: "uppercase" }}>Welcome to express pay – Seamless Payments Made Simple!</h2>
            <Row className='mt-4'>
                <Col lg={6} md={4}>
                    <p style={{ textAlign: 'justify' }}>
                        Are you tired of juggling multiple payment methods? Say hello to [Your Payment Platform Name], your one-stop solution for all your payment needs. Whether you're shopping online, paying bills, or splitting expenses with friends, we’ve got you covered with fast, secure, and hassle-free transactions.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        <h4>Why Choose Express Pay?</h4>
                        <ul className="list-unstyled">
                            <li>
                                ✅ *All-in-One Payment Solution*
                                Accept and make payments using *debit cards, **credit cards, and **UPI* – all in one place. No more switching between apps or platforms!
                            </li>
                            <li>
                                ✅ *All-in-One Payment Solution*
                                Accept and make payments using *debit cards, **credit cards, and **UPI* – all in one place. No more switching between apps or platforms!
                            </li>
                            <li>
                                ✅ *Lightning-Fast Transactions*
                                Experience instant payments with our cutting-edge technology. Whether it’s a purchase or a transfer, your money moves at the speed of life.
                            </li>
                            <li>
                                ✅ *24/7 Customer Support*
                                Got questions? Our dedicated support team is here to help, anytime, anywhere.
                            </li>
                        </ul>
                    </p>
                </Col>
            </Row>
        </div>
    )

}

export default Home