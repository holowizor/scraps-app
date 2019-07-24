import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Layout, Row, Col, Form, Icon, Input, Button } from 'antd';

import { authenticate, signout } from './actions';

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
    this.login = this.login.bind(this)
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  login = () => {
    this.props.authenticate(this.state.username, this.state.password)
  }

  usernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { authKey, error } = this.props

    if (authKey != null) {
      return <Redirect to={{ pathname: '/' }} />
    }

    return (
      <Layout style={{ padding: '50px' }}>
        <Row>&nbsp;</Row>
        <Row>
          <Col span={6} offset={8}>
            <Form onSubmit={this.login}>
              <h2>Flashcards login</h2>
              {error != null && (
                <span>Login error</span>
              )}
              <Form.Item>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.state.username} onChange={this.usernameChange} />
              </Form.Item>
              <Form.Item>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange} />
              </Form.Item>
              <Button type="primary" htmlType="submit" onClick={this.login}>Log in</Button>
            </Form>
          </Col>
        </Row>
      </Layout>
    )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  authenticate,
  signout
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);