import React, { useEffect } from 'react';
import { Col, Row, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router

import '../resourses/authentication.css';

function Login() {
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' });
    axios
      .post('/api/users/login', values)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        message.success('Login Successful');
        localStorage.setItem('pos-user' , JSON.stringify(response.data))
        Navigate('/home')
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        message.error('Something Went Wrong');
        console.error(error);
      });
  };

  useEffect(() => {
    if (window.location.pathname === '/login') {
      if (!localStorage.getItem('pos-user')) {
        return;
      }
      Navigate('/home');
    }
  }, []);

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <b>IKRAM POS</b>
            </h1>
            <hr />
            <h3>Login</h3>

            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">Not Yet Registered? Click Here To Register</Link>
              <Button htmlType="submit" type="primary" className="m-5">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

