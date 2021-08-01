import AuthService from "../services/auth.service";
import ScrapsService from "../services/scraps.service";
import "./Main.css";

import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react';

import React, { useState, useEffect, useMemo } from "react";
import { Layout, Menu, Breadcrumb, Button, Modal, Form, Input } from 'antd';
const { Header, Content, Footer } = Layout;

const initialValue = [{
  type: 'paragraph',
  children: [
    { text: '' },
  ],
}]

const Main = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState(initialValue)
  const [newScrap, setNewScrap] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentScrap, setCurrentScrap] = useState(undefined);
  const [scraps, setScraps] = useState([]);

  const editor = useMemo(() => withReact(createEditor()), [])

  const menuSelected = (itemEvent) => {
    scraps.map((scrap, _) => {
      if (scrap.id == itemEvent.key) {
        setCurrentScrap(scrap)
        setName(scrap.name);
        setNewScrap(false);
        if (scrap.content == "") {
          setContent(initialValue);
        } else {
          setContent(JSON.parse(scrap.content));
        }
      }
    })
  };

  const createNewScrap = () => {
    setIsModalVisible(true);
    setNewScrap(true);
  };

  const changeScrapName = () => {
    setIsModalVisible(true);
    setNewScrap(false);
  };

  const saveScrap = () => {
    setIsModalVisible(false);
    if (newScrap) {
      ScrapsService.createScrap(name).then(
        (response) => {
          var scrapsCopy = [...scraps];
          scrapsCopy.push(response.data)
          setScraps(scrapsCopy)
        },
        (error) => {
          //setScraps([])
        }
      );
    } else {
      ScrapsService.updateScrap(currentScrap.id, name, JSON.stringify(content)).then(
        (response) => {
          var filtered = scraps.filter((value, index, arr) => { 
            return value.id != currentScrap.id;
          });
          filtered.push(response.data)
          setScraps(filtered)
        },
        (error) => {
          //setScraps([])
        }
      );
    }
  };

  const deleteScrap = () => {
    ScrapsService.deleteScrap(currentScrap.id).then(
      (response) => {
        var filtered = scraps.filter((value, index, arr) => { 
          return value.id != currentScrap.id;
        });
        setScraps(filtered)
        setCurrentScrap(null)
        setContent(initialValue)
      },
      (error) => {
        //setScraps([])
      });
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      ScrapsService.getScraps().then(
        (response) => {
          setScraps(response.data)
        },
        (error) => {
          setScraps([])
        });
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" onSelect={menuSelected}>
        {scraps.map((scrap, _) => {
          return <Menu.Item key={scrap.id}>{`nav ${scrap.name}`}</Menu.Item>;
        })}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <p/>
      <Button onClick={createNewScrap}>Create Scrap</Button>
      <Button disabled={currentScrap == null} onClick={changeScrapName}>Change Name</Button>
      <Button disabled={currentScrap == null} onClick={saveScrap}>Save</Button>
      <Button disabled={currentScrap == null} onClick={deleteScrap}>Delete</Button>
      <Button onClick={logOut}>Log Out</Button>
      <p/>
      <div className="site-layout-content">
        <Slate editor={editor} value={content} onChange={onChangeContent}>
          <Editable readOnly={currentScrap == null} placeholder="Enter some plain text..." />
        </Slate>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    <Modal title="Basic Modal" visible={isModalVisible} onOk={saveScrap} onCancel={handleCancel}>
      <Form onSubmit={saveScrap}>
        <Form.Item label="Name" rules={[{ required: true }]}>
          <Input value={name} onChange={onChangeName} />
        </Form.Item>
      </Form>
    </Modal>
  </Layout>
  );
};

export default Main;