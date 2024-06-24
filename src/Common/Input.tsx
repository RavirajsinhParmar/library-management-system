import { Field } from "formik";
import React from "react";

type Props = {
  errors: { [key: string]: any };
  touched: { [key: string]: any };
  label: string;
  id: string;
  name: string;
  placeholder: string;
  type?: string;
};

const Input = (props: Props) => {
  const { errors, touched, label, id, name, placeholder, type } = props;
  return (
    <div className="flex flex-col gap-2">
      <label className="text-left" htmlFor="email">
        {label}
      </label>
      <Field
        className="bg-transparent border border-white p-2 rounded-lg"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      {errors?.[name] && touched?.[name] ? (
        <div className="text-base font-semibold text-red-700 text-left">
          {errors?.[name]}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
