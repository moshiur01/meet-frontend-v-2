import { Button, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import ViewDataTable from "../../components/Table/ViewDataTable";
import {
  useAllMedicinesQuery,
  useUpdateMedicineMutation,
} from "../../redux/api/medicineApi";

const MedicineStatus = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  //*get all the data
  const { data, isLoading } = useAllMedicinesQuery({ ...query });

  // console.log(data);

  const medicineData = data?.medicines?.data;
  // console.log(medicineData);

  const meta = data?.medicines?.meta;

  const onPaginationChange = (page, pageSize) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination, sorter) => {
    const { order, field } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  //* update medicine status api

  const [updateMedicine] = useUpdateMedicineMutation();

  //*delete medicine status

  const deleteMedicineStatusHandler = async (medicineId) => {
    // console.log(medicineId);

    try {
      message.loading("Please wait...");
      const res = await updateMedicine({
        id: medicineId,
        body: {
          status: "canceled",
        },
      });

      if (res?.data?.id) {
        message.success("Medicine status canceled successfully");
      } else {
        message.error("Failed to change medicine status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //*update medicine status
  const updateMedicineStatusHandler = async (medicineId) => {
    try {
      message.loading("Please wait...");
      const res = await updateMedicine({
        id: medicineId,
        body: {
          status: "delivered",
        },
      });

      if (res?.data?.id) {
        message.success("Medicine status change to delivered successfully");
      } else {
        message.error("Failed to change medicine status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Doctor Info",
      dataIndex: "appointment?.doctor?.name",
      render: (text, record) => (
        <div className="text-center">
          <img
            className="block mx-auto"
            src={record?.appointment?.doctor?.photo}
            alt="Doctor"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <p>{record?.appointment?.doctor?.name}</p>
          <p> {record?.appointment?.doctor?.email}</p>
        </div>
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "appointment?.patient?.name",
      render: (text, record) => (
        <div className="text-center">
          <img
            className="block mx-auto"
            src={record?.appointment?.patient?.photo}
            alt="Doctor"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <p>{record?.appointment?.patient?.name}</p>
          <p> {record?.appointment?.patient?.email}</p>
          <p> {record?.appointment?.patient?.phone}</p>
        </div>
      ),
    },
    {
      title: "Prescription Link",
      dataIndex: "appointment?.prescriptionLink",
      render: (text, record) => (
        <a
          href={record?.appointment?.prescriptionLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-4  py-1 font-semibold text-white bg-irisBlueColor rounded-lg  block mx-auto">
            View Proscription
          </button>
        </a>
      ),
    },
    {
      title: "Medicine Status",
      dataIndex: "status",
      render: (status) => (
        <span
          className={`block  text-center ${
            status === "pending"
              ? "text-yellow-500 font-bold "
              : status === "delivered"
              ? "text-green-500 font-bold "
              : status === "canceled"
              ? "text-red-500 font-bold"
              : ""
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Created at",
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
        if (data.status === "pending") {
          return (
            <div className="flex justify-between gap-3">
              <Button
                type="primary"
                className="bg-blue-600"
                onClick={() => updateMedicineStatusHandler(data?.id)}
              >
                <GiConfirmed />
              </Button>
              <Button
                onClick={() => deleteMedicineStatusHandler(data?.id)}
                type="primary"
                danger
              >
                <MdDeleteForever />
              </Button>
            </div>
          );
        } else {
          // If status is not "pending," return null or an empty span
          return null;
        }
      },
    },
  ];

  return (
    <div className="mt-10 w-full">
      <ViewDataTable
        loading={isLoading}
        columns={columns}
        dataSource={medicineData}
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

export default MedicineStatus;
