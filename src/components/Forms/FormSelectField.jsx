/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  loading,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={onChange}
            size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            loading={loading}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
