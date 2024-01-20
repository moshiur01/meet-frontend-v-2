import { Button, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RxReload } from "react-icons/rx";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import { useGetAllAppointmentsQuery } from "../../../redux/api/appointmentApi";

const DoctorAppointment = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  //* admin date get api
  const { data, isLoading } = useGetAllAppointmentsQuery({ ...query });

  const appointments = data?.appointments?.data;
  const meta = data?.appointments?.meta;
  //   console.log(appointments);

  //* partial searching
  const filterData = appointments?.filter(
    (x) =>
      x?.doctor?.name?.toLowerCase() === searchTerm.toLowerCase() ||
      x?.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      x?.patient?.name?.toLowerCase() === searchTerm.toLowerCase() ||
      x?.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //   console.log(filterData);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },

    {
      title: "Doctor info",
      dataIndex: "doctor",
      render: (doctor) => (
        // console.log(doctor),
        <div className="flex items-center space-x-4">
          <img
            src={doctor?.photo}
            alt={doctor?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{doctor?.name}</p>
            <p className="text-gray-500">{doctor?.specialization?.name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "User Info",
      dataIndex: "patient",
      render: (patient) => (
        <div className="flex items-center space-x-4">
          <img
            src={patient?.photo}
            alt={patient?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{patient?.name}</p>
            <p className="text-gray-500">{patient?.phone}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Appointment Status",
      dataIndex: "status",
      render: (status) => (
        <span
          className={`
              inline-block px-2 py-1 rounded  ${
                status === "finished" ? "bg-green-500 text-white" : ""
              } ${status === "pending" ? "bg-yellow-500 text-white" : ""} ${
            status === "canceled" ? "bg-red-500 text-white" : ""
          }`}
        >
          {status}
        </span>
      ),
    },

    {
      title: "Booked at",
      dataIndex: "createdAt",
      render: function (data) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    // {
    //   title: "UpdatedAt",
    //   dataIndex: "updatedAt",
    //   render: function (data) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
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
      <ActionBar title="Doctor Appointments" className="font-[600]">
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
        dataSource={searchTerm?.length !== 0 ? filterData : appointments}
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

export default DoctorAppointment;
