/* eslint-disable react/prop-types */
import { Col, Row, message } from "antd";
import Form from "../../components/Forms/Form";
import FormInput from "../../components/Forms/FormInput";
import { useUpdatePatientPasswordMutation } from "../../redux/api/patient/patientApi";

const ChangePassword = (patientData) => {
  const id = patientData?.user?.id;

  //*update password api call

  const [updatePatientPassword] = useUpdatePatientPasswordMutation();
  const changePassword = async (data) => {
    message.loading("Please wait...");
    // console.log(data);

    if (!data.newPassword.length < 6) {
      message.error("password must be 6 letters");
      return;
    }
    try {
      const res = await updatePatientPassword({
        id: id,
        body: data,
      });
      console.log(res);
      res.data.id && message.success("Password  updated successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-[600] mx-2 my-5">Change Password</h1>
      <Form
        submitHandler={changePassword}
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
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="password"
                name="oldPassword"
                label="Enter Old Password"
                size="large"
                placeholder="Enter password"
              />
            </Col>

            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="password"
                name="newPassword"
                label="Enter New Password"
                size="large"
                placeholder="Enter password"
              />
            </Col>
          </Row>
          <button
            type="submit"
            className="bg-irisBlueColor mt-4 py-2 px-4  font-[600] text-md text-white  rounded-lg "
          >
            Update password
          </button>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
