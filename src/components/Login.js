import React, { useState } from "react";
import { Layout, Row, Col, Form, Input, Button } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";

import AuthService from "../services/auth.service";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setError(false);

    AuthService.login(username, password).then(
      () => {
        props.history.push("/home");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setError(true);
      }
    );
  };

  return (
  <Layout style={{ padding: '50px' }}>
    <Row>&nbsp;</Row>
    <Row>
      <Col span={6} offset={8}>
        <Form onSubmit={handleLogin}>
          <h2>Scraps login</h2>
          {error && (
            <span>Login error</span>
          )}
          <Form.Item>
            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={username} onChange={onChangeUsername} />
          </Form.Item>
          <Form.Item>
            <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={password} onChange={onChangePassword} />
          </Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleLogin}>Log in</Button>
        </Form>
      </Col>
    </Row>
  </Layout>
  );
};

export default withRouter(Login);