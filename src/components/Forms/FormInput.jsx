/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  disabled,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {type === "password" ? (
              <Input.Password
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
                disabled={disabled}
                required={required}
              />
            ) : (
              <Input
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
                disabled={disabled}
                required={required}
              />
            )}
          </>
        )}
      />
    </>
  );
};

export default FormInput;
