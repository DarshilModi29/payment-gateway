import React from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../schema";
import Cookies from "js-cookie";
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
import { useNavigate } from "react-router-dom";

const initVal = {
  email: "",
  password: ""
}

const Signin = () => {
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } = useFormik({
    initialValues: initVal,
    validationSchema: LoginSchema,
    onSubmit: async (values, action) => {
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token);
        navigate("/");
        action.resetForm();
      } else {
        alert(data.message);
      }
    }
  })

  return (
    <Container className="mt-5">
      <Card style={{ maxWidth: "400px", margin: "auto" }}>
        <CardBody>
          <CardTitle tag="h4" className="text-center mb-4">
            Register
          </CardTitle>
          <Form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Signin
