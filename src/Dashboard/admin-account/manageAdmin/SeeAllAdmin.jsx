import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

import { RxReload } from "react-icons/rx";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import {
  useAdminsQuery,
  useDeleteAdminMutation,
} from "../../../redux/api/adminApi";
import { getUserInfo } from "../../../services/auth.service";

const SeeAllAdmin = () => {
  const { id: currentAdminId } = getUserInfo();

  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteAdmin] = useDeleteAdminMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  //* admin date get api
  const { data, isLoading } = useAdminsQuery({ ...query });
  const admins = data?.admins?.data;
  const meta = data?.admins?.meta;

  const deleteHandler = async (id) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteAdmin(id);
      res?.data?.id && message.success("Admin Data Deleted successfully");
    } catch (err) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Admin Photo",
      dataIndex: "photo",
      render: (photo) => (
        <img
          src={photo} //
          alt="User Photo"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data) {
        if (data?.id === currentAdminId) {
          return null;
        }

        return (
          <Button onClick={() => deleteHandler(data?.id)} type="primary" danger>
            <MdDeleteForever />
          </Button>
        );
      },
    },
  ];

  const onPaginationChange = (page, pageSize) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination, filter, sorter) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div className="mx-8 my-4">
      <ActionBar title="Admin List" className="font-[600]">
        <Input
          type="text"
          size="large"
          value={searchTerm}
          placeholder="Search..."
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link to="/admin/profile/createAdmin">
            <Button
              type="primary"
              style={{
                backgroundColor: "blue",
              }}
            >
              Create
            </Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type="primary"
              style={{ margin: "0px 5px", backgroundColor: "blue" }}
            >
              <RxReload />
            </Button>
          )}
        </div>
      </ActionBar>

      <ViewDataTable
        loading={isLoading}
        columns={columns}
        dataSource={admins}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default SeeAllAdmin;
