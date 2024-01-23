import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

import { RxReload } from "react-icons/rx";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import {
  useDeleteRoomMutation,
  useRoomsQuery,
} from "../../../redux/api/roomApi";

const SeeAllRoom = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteRoom] = useDeleteRoomMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  //* admin date get api
  const { data, isLoading } = useRoomsQuery({ ...query });
  const rooms = data?.rooms?.data;
  //   console.log(rooms);
  const meta = data?.rooms?.meta;
  //   console.log(meta);

  //*delete handler
  const deleteHandler = async (id) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteRoom(id);
      res?.data?.id && message.success("Room number deleted successfully");
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
      title: "Room Number",
      dataIndex: "roomNumber",
      render: (text, record) => (
        <span className=" block text-center">
          {record.roomNumber} <br />
          {record?.doctor?.name ? (
            `(${record?.doctor?.name})`
          ) : (
            <span className="font-semibold text-yellow-600">
              No doctor assigned
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Room Number Status",
      dataIndex: "isBooked",
      render: (isBooked) => (
        <span
          className={`font-semibold ${
            isBooked ? "text-red-500" : "text-green-500"
          }`}
        >
          {isBooked ? "Booked" : "Available"}
        </span>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Updated At",
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
            {/* <Link to={`/admin/profile/editSpecialization/${data?.id}`}>
              <Button
                style={{
                  backgroundColor: "blue",
                  marginRight: "5px",
                }}
                type="primary"
              >
                <MdEditSquare />
              </Button>
            </Link> */}

            {!data?.doctor && (
              <Button
                onClick={() => deleteHandler(data?.id)}
                type="primary"
                danger
              >
                <MdDeleteForever />
              </Button>
            )}
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
      <ActionBar title="Room List" className="font-[600]">
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
          <Link to="/admin/profile/createRoomNumber">
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
        dataSource={rooms}
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

export default SeeAllRoom;
