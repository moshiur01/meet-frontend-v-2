/* eslint-disable react/prop-types */

import { Layout } from "antd";
const { Content } = Layout;

const AdminContents = ({ children }) => {
  return (
    <Content
      style={{
        minHeight: "90vh",
      }}
    >
      {children}
    </Content>
  );
};

export default AdminContents;
