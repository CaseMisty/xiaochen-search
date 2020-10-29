import React, { useState } from 'react';
import { Form, Input, Button, Table, Tag, Space } from 'antd';
import axios from 'axios';
import './App.css';

const App = () => {
  const [form] = Form.useForm();

  const [tableData, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
  ]);

  const onFinish = async ({ paramA, paramB }) => {
    try {
      const response = await axios.get(
        `/api?paramA=${paramA}&paramB=${paramB}`
      );
      // console.log(response);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="form">
        <Form
          layout={'inline'}
          form={form}
          onFinish={onFinish}
          initialValues={
            {
              // layout: formLayout,
            }
          }
          // onValuesChange={onFormChange}
        >
          <Form.Item label="字段 A" name="paramA">
            <Input placeholder="input placeholder" allowClear />
          </Form.Item>
          <Form.Item label="字段 B" name="paramB">
            <Input placeholder="input placeholder" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table columns={columns} dataSource={tableData} />
    </main>
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
export default App;
