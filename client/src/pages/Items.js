import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Select, Table, message } from "antd";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Button } from "antd"; // Import Button from 'antd' here
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Items() {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModelVisibilty, setaddEditModelVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const getallitems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.error(error);
      });
  };
  const deleteItem = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item", { itemId: record._id })
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("Item Deleted Successfully");
        getallitems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something Went Wrong");
        console.error(error);
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setaddEditModelVisibilty(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ];
  useEffect(() => {
    getallitems(); // Call the function inside useEffect
  }, []);
  const onFinish = (values) => {
    dispatch({ type: "showLoading", values });
    if (editingItem === null) {
      axios
        .post("/api/items/add-item", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added Successfully");
          setaddEditModelVisibilty(false);
          getallitems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something Went Wrong");
          console.error(error);
        });
    } else {
      axios
        .post("/api/items/edit-item", { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited Successfully");
          setEditingItem(null);
          setaddEditModelVisibilty(false);
          getallitems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something Went Wrong");
          console.error(error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setaddEditModelVisibilty(true)}>
          Add Items
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered rowKey="_id" />
      {addEditModelVisibilty && (
        <Modal
          open={addEditModelVisibilty}
          onCancel={() => {
            setEditingItem(null);
            setaddEditModelVisibilty(false);
          }}
          title={`${editingItem !== null ? "Edit Item" : "Add New Item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegitables">Vegitables</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Items;
