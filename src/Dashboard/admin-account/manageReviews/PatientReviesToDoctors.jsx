import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxReload, RxStarFilled } from "react-icons/rx";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";

import {
  useDeleteDoctorReviewMutation,
  useDoctorReviewsQuery,
} from "../../../redux/api/DoctorReviweApi";

const PatientReviewToDoctors = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  //* admin date get api
  const { data, isLoading } = useDoctorReviewsQuery({ ...query });

  // console.log(data);

  const doctorReviews = data?.doctorReviews?.data;
  const meta = data?.doctorReviews?.meta;
  // console.log(doctorReviews);

  //* partial searching
  const filterData = doctorReviews?.filter(
    (review) =>
      review?.doctor?.name?.toLowerCase() === searchTerm.toLowerCase() ||
      review?.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.patient?.name?.toLowerCase() === searchTerm.toLowerCase() ||
      review?.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(filterData);

  //*delete doctor review
  const [deleteDoctorReview] = useDeleteDoctorReviewMutation();
  const deleteHandler = async (id) => {
    // console.log(id);
    message.loading("Deleting.....");
    try {
      const res = await deleteDoctorReview(id);
      res?.data?.id && message.success("Review Deleted successfully");
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
      title: "Doctor Info",
      dataIndex: "doctor",
      render: (doctorInfo) => (
        <div className="text-center">
          <img
            className="w-10 rounded-xl mx-auto mb-1"
            src={doctorInfo?.photo}
            alt={doctorInfo?.name}
          />
          <div>{doctorInfo?.name}</div>
        </div>
      ),
    },
    {
      title: "User Info",
      dataIndex: "patient",
      render: (patientInfo) => (
        <div className="text-center">
          <img
            className="w-10 rounded-xl mx-auto mb-1"
            src={patientInfo?.photo}
            alt={patientInfo?.name}
          />
          <div>{patientInfo?.name}</div>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (rating) => (
        <div className="flex gap-1">
          {[...Array(rating)].map((_, index) => (
            <RxStarFilled key={index} style={{ color: "gold" }} />
          ))}
        </div>
      ),
    },

    {
      title: "Review",
      dataIndex: "reviewText",
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
      <ActionBar title="Doctor Reviews" className="font-[600]">
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
        dataSource={searchTerm.length !== 0 ? filterData : doctorReviews}
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

export default PatientReviewToDoctors;
