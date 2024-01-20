import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxReload, RxStarFilled } from "react-icons/rx";
import ActionBar from "../../../components/AdminUI/ActionBar";
import ViewDataTable from "../../../components/Table/ViewDataTable";
import {
  useAllPlatformReviewsQuery,
  useDeletePlatformReviewMutation,
} from "../../../redux/api/platformReview";

const PlatformReviews = () => {
  const query = {};

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [deletePlatformReview] = useDeletePlatformReviewMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  //* admin date get api
  const { data, isLoading } = useAllPlatformReviewsQuery({ ...query });
  const platformReviews = data?.platformReviews?.data;
  const meta = data?.platformReviews?.meta;

  const deleteHandler = async (id) => {
    message.loading("Deleting.....");
    try {
      const res = await deletePlatformReview(id);
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
      title: "User name",
      dataIndex: "userName",
    },
    {
      title: "User Photo",
      dataIndex: "userImg",
      render: (userImg) => (
        <img
          className="rounded-lg"
          src={userImg} //
          alt="User Photo"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        />
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
      <ActionBar title="Reviews to Our Platform" className="font-[600]">
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
        dataSource={platformReviews}
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

export default PlatformReviews;
