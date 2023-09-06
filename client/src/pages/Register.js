import React, { useEffect } from 'react';
import { Col, Row, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../resourses/authentication.css';

function Register() {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const onFinish = (values) => {
    dispatch({ type: 'showLoading' });
    axios
      .post('/api/users/register', values)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        message.success('Registration Successful. Please wait for verification.');
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        message.error('Something Went Wrong');
        console.error(error);
      });
  };
  useEffect(()=>{
    if(localStorage.getItem('pos-user'))
    Navigate('/home')
    }, [])
  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <b>IKRAM POS</b>
            </h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered? Click Here To Login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
