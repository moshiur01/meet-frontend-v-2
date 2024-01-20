import { Button, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { RxReload } from "react-icons/rx";

import ActionBar from "../../components/AdminUI/ActionBar";
import ViewDataTable from "../../components/Table/ViewDataTable";
import { usePatientsQuery } from "../../redux/api/patient/patientApi";

const SeeAllPatients = () => {
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
  const { data, isLoading } = usePatientsQuery({ ...query });

  //   console.log(data);
  const patients = data?.patients?.data;
  const meta = data?.patients?.meta;

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
      dataIndex: "phone",
    },
    {
      title: "Total Number of Appointments",
      dataIndex: "appointment",
      render: (text, record) => <span>{record?.appointment?.length || 0}</span>,
    },

    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodType",
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
      <ActionBar title="Admin List" className="font-[600]">
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

export default SeeAllPatients;
