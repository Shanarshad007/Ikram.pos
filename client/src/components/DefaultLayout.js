import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { cartitems, loading } = useSelector((state) => state.rootReducer);
  useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartitems));
  }, [cartitems]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: "Home",
      route: "/home",
    },
    {
      key: "/cart",
      icon: <ShoppingCartOutlined />,
      label: "Cart",
      route: "/cart",
    },
    {
      key: "/bills",
      icon: <CopyOutlined />,
      label: "Bills",
      route: "/bills",
    },
    {
      key: "/items",
      icon: <UnorderedListOutlined />,
      label: "Items",
      route: "/items",
    },
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: "Customers",
      route: "/customers",
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onclick: () => {
        localStorage.removeItem('pos-user');
        console.log("User removed from localStorage");
        navigate('/login'); // Corrected to use Navigate with an uppercase "N"
        // Add any additional logout logic here
      },
    }
    
      
  ];
  return (
    <Layout>
      {loading && (
        <div className="spinner">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3>{collapsed ? 'IP' : 'IKRAM POS'}</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/home"]}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.route}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="cart-count d-flex align-items-center"
            onClick={() => navigate("/Cart")}
          >
            <b>
              <p className="mt-3 mr-2">{cartitems.length}</p>
            </b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "80vh",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
