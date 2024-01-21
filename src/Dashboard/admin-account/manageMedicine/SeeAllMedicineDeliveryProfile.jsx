import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { Link } from "react-router-dom";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import {
  useAllMedicineManQuery,
  useDeleteMedicineManMutation,
} from "../../../redux/api/medicineManApi";

const SeeAllMedicineDeliveryProfile = () => {
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
  const { data, isLoading } = useAllMedicineManQuery({ ...query });

  //   console.log(data);
  const medicineMenData = data?.medicineMen?.data;
  const meta = data?.medicineMen?.meta;

  const [deleteMedicineMan] = useDeleteMedicineManMutation();

  const deleteHandler = async (id) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteMedicineMan(id);
      res?.data?.id &&
        message.success("Medicine delivery profile deleted successfully");
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Photo",
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
      dataIndex: "phoneNumber",
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
      <ActionBar title="Medicine Delivery Man List" className="font-[600]">
        <Input
          type="text"
          value={searchTerm}
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
          <Link to="/admin/profile/createMedicineDeliveryProfile">
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
        dataSource={medicineMenData}
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

export default SeeAllMedicineDeliveryProfile;
