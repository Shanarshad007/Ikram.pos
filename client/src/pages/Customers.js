import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
function Customers() {
  const componentRef = useRef();
  const [billsData, setBillsData] = useState([]);
  
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();

  const getallBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        data.reverse()
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.error(error);
      });
  };
  

  

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "PhoneNumber",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render : (value)=><span>{value.toString().substring(0, 10)}</span>
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
    },
    
  ];

  useEffect(() => {
    getallBills();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered rowKey="_id" />
      
    </DefaultLayout>
  );
}

export default Customers;
