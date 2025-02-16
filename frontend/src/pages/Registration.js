import React from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "../schema";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initVal = {
    username: "",
    email: "",
    password: "",
    pan_number: "",
    aadhar_number: "",
    phn_number: ""
}

const RegistrationForm = () => {

    const { values, errors, handleSubmit, handleChange, handleBlur, touched } = useFormik({
        initialValues: initVal,
        validationSchema: RegisterSchema,
        onSubmit: async (values, action) => {
            const response = await fetch(`http://localhost:5000/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                action.resetForm();
            } else {
                alert(data.message);
            }
        }
    })

    return (
        <Container className="mt-5">
            <Card style={{ maxWidth: "500px", margin: "auto" }}>
                <CardBody>
                    <CardTitle tag="h4" className="text-center mb-4">
                        Register
                    </CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">Name</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your name"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {
                                errors.username && touched.username ? (
                                    <div className="text-danger">{errors.username}</div>
                                ) : null
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {
                                errors.email && touched.email ? (
                                    <div className="text-danger">{errors.email}</div>
                                ) : null
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="pan_number">Pan Number</Label>
                            <Input
                                type="text"
                                name="pan_number"
                                id="pan_number"
                                placeholder="Enter your PAN number"
                                value={values.pan_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {
                                errors.pan_number && touched.pan_number ? (
                                    <div className="text-danger">{errors.pan_number}</div>
                                ) : null
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="aadhar_number">Aadhar Number</Label>
                            <Input
                                type="text"
                                name="aadhar_number"
                                id="aadhar_number"
                                placeholder="Enter your Aadhar number"
                                value={values.aadhar_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {
                                errors.aadhar_number && touched.aadhar_number ? (
                                    <div className="text-danger">{errors.aadhar_number}</div>
                                ) : null
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="phn_number">Phone Number</Label>
                            <Input
                                type="text"
                                name="phn_number"
                                id="phn_number"
                                placeholder="Enter your Phone number"
                                value={values.phn_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {
                                errors.phn_number && touched.phn_number ? (
                                    <div className="text-danger">{errors.phn_number}</div>
                                ) : null
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {
                                errors.password && touched.password ? (
                                    <div className="text-danger">{errors.password}</div>
                                ) : null
                            }
                        </FormGroup>
                        <Button color="primary" block>
                            Register
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default RegistrationForm;
