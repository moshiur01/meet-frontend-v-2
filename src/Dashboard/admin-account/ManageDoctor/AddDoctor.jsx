import { Col, Row, message } from "antd";
import Form from "../../../components/Forms/Form";
import FormInput from "../../../components/Forms/FormInput";
import FormSelectField from "../../../components/Forms/FormSelectField";
import FormTextArea from "../../../components/Forms/FormTextArea";
import { useAddDoctorMutation } from "../../../redux/api/doctorApi";
import { useSpecializationsQuery } from "../../../redux/api/specializationApi";

const AddDoctor = () => {
  const [addDoctor] = useAddDoctorMutation();

  const { data, isLoading } = useSpecializationsQuery({ limit: 100, page: 1 });
  const specializations = data?.specializations?.data;

  const specializationOptions =
    specializations &&
    specializations?.map((specialization) => {
      return {
        label: specialization?.name,
        value: specialization?.id,
      };
    });

  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  const doctorOnSubmit = async (data) => {
    // Check if the email contains "@gmail.com"
    if (!data.email.includes("@gmail.com")) {
      message.error("Invalid Email");
      return;
    }
    message.loading("Creating Doctor Data...");

    // console.log(data);
    try {
      const res = await addDoctor({
        ...data,
      });

      //@ts-ignore
      res.data.id && message.success("Doctor successfully created");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-[600] mx-2 my-5">Create Doctor</h1>
      <Form
        submitHandler={doctorOnSubmit}
        style={{
          marginLeft: "20px",
        }}
      >
        {/* doctor information */}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
            Doctor information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="name"
                label="Enter Name"
                size="large"
                placeholder="Enter doctor name"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                name="email"
                label="Enter Email"
                size="large"
                placeholder="Enter doctor email"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="password"
                name="password"
                label="Password"
                size="large"
                placeholder="Enter temporary password"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="gender"
                label="Gender"
                options={genderOptions}
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectField
                name="specializationId"
                label="Specialization"
                options={specializationOptions}
                loading={isLoading}
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="number"
                name="phone"
                label="Contact No."
                size="large"
                placeholder="Enter contact number"
              />
            </Col>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormTextArea
                type="text"
                name="bio"
                label="Doctor Bio"
                size="large"
                placeholder="Enter doctor bio"
              />
            </Col>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormTextArea
                type="text"
                name="about"
                label="Doctor About"
                size="large"
                placeholder="Write something about doctor"
              />
            </Col>
          </Row>
        </div>

        <button
          type="submit"
          className="bg-irisBlueColor py-2 px-4 ml-4 font-[600] text-lg text-white  rounded-lg "
        >
          Create
        </button>
      </Form>
    </>
  );
};

export default AddDoctor;
