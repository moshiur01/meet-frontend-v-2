/* eslint-disable react/prop-types */

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminContents from "../../components/AdminUI/AdminContents";
import AdminSidebar from "../../components/AdminUI/Sidebar";

const AdminDashboard = ({ children }) => {
  return (
    <Layout hasSider>
      <AdminSidebar />
      <AdminContents>
        {children}
        <Outlet />
      </AdminContents>
    </Layout>
  );
};
export default AdminDashboard;
