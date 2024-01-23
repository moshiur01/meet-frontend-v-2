/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Select } from "antd";
import { useSpecializationsQuery } from "../../redux/api/specializationApi";

const DoctorSpecializationInput = ({
  name,
  label,
  style,
  setSpecializationId,
  specializationId,
  placeholder,
}) => {
  const { data, isLoading } = useSpecializationsQuery({});

  const specializations = data?.specializations?.data;

  const specializationOptions = specializations?.map((specialization) => {
    return {
      label: specialization?.name,
      value: specialization?.id,
    };
  });

  return (
    <Select
      loading={isLoading}
      size="large"
      placeholder={placeholder}
      style={{
        ...style,
        width: "200px",
        height: "50px",
      }}
      options={specializationOptions}
      value={specializationId}
      onChange={(value, label) => setSpecializationId(label)}
    />
  );
};

export default DoctorSpecializationInput;
