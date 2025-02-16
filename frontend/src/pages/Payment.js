import React, { useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import Cookies from "js-cookie";

export const Payment = () => {
    const [upiId, setUpiId] = useState("");
    const [accNum, setAccNum] = useState("");
    const [amount, setAmount] = useState(0);
    const [mpin, setMpin] = useState("");
    const submitForm = async (e, type) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/make-transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify({
                payment_method: type,
                amount: amount,
                mpin: mpin,
                upi_id: upiId
            })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            setAccNum("");
            setUpiId("");
            setAmount(0);
            setMpin("");
        } else {
            alert(data.message);
        }
    }

    const [active, setActive] = useState("1");
    return (
        <>
            <div className="container mt-5">
                <Nav
                    justified
                    pills
                    className='border rounded'
                >
                    <NavItem>
                        <NavLink
                            active={active == "1"}
                            onClick={() => setActive("1")}
                        >
                            Card
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active == "2"}
                            onClick={() => setActive("2")}>
                            UPI
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={active}>
                    <TabPane tabId={"1"}>
                        <div className="mt-3 d-flex align-items-center justify-content-center">
                            <Card className='w-50'>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for='acc_num'>Account Number</Label>
                                            <Input name='acc_num' id='acc_num' value={accNum} onChange={(e) => setAccNum(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='amount'>Amount</Label>
                                            <Input name='amount' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                        </FormGroup>
                                        <Button type='submit' color='success'>Send Money</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </TabPane>
                    <TabPane tabId={"2"}>
                        <div className="mt-3 d-flex align-items-center justify-content-center">
                            <Card className='w-50'>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for='upi_id'>UPI ID</Label>
                                            <Input name='upi_id' id='upi_id' value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='amount'>Amount</Label>
                                            <Input name='amount' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='mpin'>Mpin</Label>
                                            <Input name='mpin' id='mpin' value={mpin} onChange={(e) => setMpin(e.target.value)} />
                                        </FormGroup>
                                        <Button type='submit' color='success' onClick={(e) => {
                                            submitForm(e, "upi");
                                        }}>Send Money</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </>
    )
}
