import { Button, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RxReload } from "react-icons/rx";
import { Link } from "react-router-dom";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import { useDoctorsQuery } from "../../../redux/api/doctorApi";

const SeeAllDoctors = () => {
  //   const { id: currentAdminId } = getUserInfo();

  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  //   const [deleteAdmin] = useDeleteAdminMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  //* admin date get api
  const { data, isLoading } = useDoctorsQuery({ ...query });

  //   console.log(data);
  const patients = data?.doctors?.data;
  const meta = data?.doctors?.meta;

  // console.log(patients);

  //   const deleteHandler = async (id) => {
  //     message.loading("Deleting.....");
  //     try {
  //       const res = await deleteAdmin(id);
  //       res?.data?.id && message.success("Admin Data Deleted successfully");
  //     } catch (err) {
  //       message.error(err.message);
  //     }
  //   };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "Doctor name",
      dataIndex: "name",
      render: (text, record) => (
        <span className=" block text-center">
          {record.name} <br />({record.specialization?.name})
        </span>
      ),
    },
    {
      title: "Doctor  Photo",
      dataIndex: "photo",
      render: (photo) => (
        <img
          className="rounded-lg"
          src={photo}
          alt="User Photo"
          style={{ maxWidth: "40px", maxHeight: "50px" }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Total Number of Appointments",
      dataIndex: "appointment",
      render: (text, record) => (
        <span>{record?.appointments?.length || 0}</span>
      ),
    },

    {
      title: "Gender",
      dataIndex: "gender",
    },

    {
      title: "Member Since",
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
    // {
    //   title: "Action",
    //   render: function (data) {
    //     if (data?.id === currentAdminId) {
    //       return null;
    //     }

    //     return (
    //       <Button

    //       onClick={() => deleteHandler(data?.id)} type="primary" danger>
    //         <MdDeleteForever />
    //       </Button>
    //     );
    //   },
    // },
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
      <ActionBar title="Doctor List" className="font-[600]">
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
          <Link to="/admin/profile/addDoctors">
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
        dataSource={patients}
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

export default SeeAllDoctors;
