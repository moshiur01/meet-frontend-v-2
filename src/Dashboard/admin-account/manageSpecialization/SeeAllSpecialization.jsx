import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";

import { RxReload } from "react-icons/rx";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import {
  useDeleteSpecializationMutation,
  useSpecializationsQuery,
} from "../../../redux/api/specializationApi";

const SeeAllSpecialization = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteSpecialization] = useDeleteSpecializationMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  //* admin date get api
  const { data, isLoading } = useSpecializationsQuery({ ...query });
  const specializations = data?.specializations?.data;
  const meta = data?.specializations?.meta;

  const deleteHandler = async (id) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteSpecialization(id);
      res?.data?.id && message.success("Specialization deleted successfully");
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
        return (
          <>
            <Link to={`/admin/profile/editSpecialization/${data?.id}`}>
              <Button
                style={{
                  backgroundColor: "blue",
                  marginRight: "5px",
                }}
                type="primary"
              >
                <MdEditSquare />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <MdDeleteForever />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page, pageSize) => {
    // console.log("Page:", page, "PageSize:", pageSize);
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
      <ActionBar title="Specialization List" className="font-[600]">
        <Input
          type="text"
          size="large"
          placeholder="Search..."
          style={{
            width: "20%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link to="/admin/profile/createSpecialization">
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
        dataSource={specializations}
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

export default SeeAllSpecialization;
