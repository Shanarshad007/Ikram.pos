import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table, Form, Input, Select, message } from "antd";
import axios from 'axios';
import {
  DeleteOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Cartpage() {
  const { cartitems } = useSelector((state) => state.rootReducer);
  const [billchargemodel, setBillchargemodel] = useState(false);
  const [SubTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
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
      title: "Quantity",
      dataIndex: "_id",
      render: (_id, record) => (
        <div>
          <PlusSquareOutlined
            className="mx-3"
            onClick={() => increaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <MinusSquareOutlined
            className="mx-3"
            onClick={() => decreaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "DeleteFromCart", payload: record })}
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartitems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setSubTotal(temp);
  }, [cartitems]);

  const onFinish = (values) => {
    const reqObject = {
      paymentMode: values.PaymentMode,
      subtotal: SubTotal,
      tax: Number(((SubTotal / 100) * 10).toFixed(2)),
      customerPhoneNumber: values.CustomerPhoneNumber,
      customerName: values.CustomerName,
      cartitems,
      totalAmount: Number(SubTotal + Number(((SubTotal / 100) * 10).toFixed(2))),
      userId: JSON.parse(localStorage.getItem('pos-user'))._id,
    };

    axios
      .post('/api/bills/charge-bill', reqObject)
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        message.success('Bill Charged Successfully');
        navigate('/bills');
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' });
        message.error('Something Went Wrong');
        console.error(error);
      });
  };

  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <Table columns={columns} dataSource={cartitems} bordered rowKey={(record) => record._id} />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>
            SUB TOTAL : <b>{SubTotal} $/-</b>
          </h3>
        </div>
        <Button type="primary" onClick={() => setBillchargemodel(true)}>
          CHARGE BILL
        </Button>
      </div>
      <Modal title="Charge Bill" visible={billchargemodel} footer={false} onCancel={() => setBillchargemodel(false)}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="CustomerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="CustomerPhoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="PaymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="charge-bill-amount">
            <h5>SubTotal : <b>{SubTotal}</b></h5>
            <h5>Tax : <b>{((SubTotal / 100) * 10).toFixed(2)}</b></h5>
            <hr />
            <h2>GrandTotal : <b>{SubTotal + ((SubTotal / 100) * 10)}</b></h2>
          </div>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              GENERATE BILL
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}

export default Cartpage;
