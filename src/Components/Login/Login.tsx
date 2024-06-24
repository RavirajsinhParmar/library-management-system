import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../Common/Input";
const Background = require("../../Assets/Background_img.jpg");

type Props = {};

interface Values {
  password: string;
  email: string;
}

const Login = (props: Props) => {
  const navigate = useNavigate();
  let validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("password is required"),
  });

  return (
    <div className="h-screen">
      <img
        className="w-full absolute h-screen brightness-50 object-cover"
        alt="bg-img"
        src={Background}
      />
      <div className="relative h-full flex-col gap-4 text-lg text-white z-9 flex justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ errors, touched }) => (
            <Form
              id="login-form"
              className="min-w-[400px] z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-15 flex flex-col border border-white rounded-lg p-8 gap-3"
            >
              <div className="!text-3xl font-semibold">Login</div>
              <Input
                label="Email"
                errors={errors}
                touched={touched}
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
              <Input
                label="Password"
                errors={errors}
                touched={touched}
                id="password"
                name="password"
                type="password"
                placeholder="******"
              />

              <button
                className="my-2 bg-orange-300 text-black p-2 rounded-lg"
                type="submit"
                form="login-form"
              >
                Submit
              </button>
              <div className="text-lg font-semibold">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-orange-300 cursor-pointer"
                >
                  Sign up
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
