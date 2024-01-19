import { Layout, Menu } from "antd";
import { useState } from "react";
import { sidebarItems } from "./SidebarItem";

const { Sider } = Layout;

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems()}
      />
    </Sider>
  );
};

export default AdminSidebar;
