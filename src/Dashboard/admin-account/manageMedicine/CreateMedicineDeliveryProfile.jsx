import { Col, Row, message } from "antd";
import Form from "../../../components/Forms/Form";
import FormInput from "../../../components/Forms/FormInput";

import { useAddMedicineManMutation } from "../../../redux/api/medicineManApi";

const CreateMedicineDeliveryProfile = () => {
  const [addMedicineMan] = useAddMedicineManMutation();

  const medicineManCreateOnSubmit = async (data) => {
    // Check if the email contains "@gmail.com"
    if (!data.email.includes("@gmail.com")) {
      message.error("Invalid Email");
      return;
    }
    // console.log(data);

    message.loading("Please wait...");

    try {
      const res = await addMedicineMan({
        ...data,
      });

      if (res?.data?.id) {
        message.success("Medicine delivery man profile successfully created");
      } else {
        message.error("Failed to create profile");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-[600] mx-2 my-5">
        Create Medicine Delivery Profile
      </h1>
      <Form
        submitHandler={medicineManCreateOnSubmit}
        style={{
          marginLeft: "20px",
        }}
      >
        {/* medicine man information */}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
            Insert necessary information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput
                name="name"
                label="Enter Name"
                size="large"
                placeholder="Enter name"
              />
            </Col>

            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput
                name="email"
                label="Enter Email"
                size="large"
                placeholder="Enter email"
              />
            </Col>

            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput
                type="password"
                name="password"
                label="Password"
                size="large"
                placeholder="Enter temporary password"
              />
            </Col>

            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput
                type="number"
                name="phoneNumber"
                label="Contact No."
                size="large"
                placeholder="Enter contact number"
              />
            </Col>
          </Row>
        </div>

        <button
          type="submit"
          className="bg-irisBlueColor py-1 px-4 ml-4 font-[500] text-lg text-white  rounded-lg "
        >
          Create
        </button>
      </Form>
    </>
  );
};

export default CreateMedicineDeliveryProfile;
