import React from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Menu } from 'antd'

import history from './history'

const { Header, Content, Footer } = Layout

class Category extends React.Component {
  constructor() {
    super()

    this.state = {
    }
  }

  handleLogout = (e) => {
    if (e.key == 'logout') history.push('/logout')
  }

  render() {
    const { loading, error } = this.props

    if (error != null) {
      if (error.response.status == 401) history.push('/logout')
      return (
        <div>Logging out...</div>
      )
    }

    if (loading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Layout className="layout">
        <Header>
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            onClick={this.handleLogout}>
            <Menu.Item disabled={true}>Flashcards Admin Panel</Menu.Item>
            <Menu.Item key="logout">logout</Menu.Item>
          </Menu>
        </Header>
        {/* if category != null - show edit this category */}
        {/* else these are root categories */}
        <Content style={{ padding: '0 50px' }}>
          <Row>
            <Col>
            Hello
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Scraps ©2019 Created by Holowizor@Devbuild
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);