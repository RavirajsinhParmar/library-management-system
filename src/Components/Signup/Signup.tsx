import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Input from "../../Common/Input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
const Background = require("../../Assets/Background_img.jpg");

interface Values {
  fullName: string;
  password: string;
  email: string;
}

const Signup = () => {
  const navigate = useNavigate();
  let validationSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("password is required"),
  });

  const Signup = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const { fullName, email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        updateProfile(user, { displayName: fullName });
        sessionStorage.setItem("token", await user?.getIdToken());
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
    setSubmitting(false);
  };

  return (
    <div className="h-screen">
      <img
        className="w-full absolute h-screen brightness-50 object-cover"
        alt="bg-img"
        src={Background}
      />
      <div className="z-[999] right-0 cursor-pointer absolute object-cover" onClick={() => navigate("/")}>
        <img
          className="h-7 w-7 m-4"
          alt="bg-img"
          src={"/images/home.svg"}
        />
      </div>
      <div className="relative flex-col gap-4 h-full text-lg text-white z-9 flex justify-center items-center">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={Signup}
        >
          {({ errors, touched }) => (
            <Form
              id="signup-form"
              className="min-w-[400px] z-10 bg-[#ffeeff] backdrop-filter backdrop-blur-lg bg-opacity-10 flex flex-col border border-gray-300 rounded-lg p-8 gap-3"
            >
              <div className="!text-3xl mb-2 font-semibold">Signup</div>
              <Input
                label="Full Name"
                errors={errors}
                touched={touched}
                id="fullName"
                name="fullName"
                placeholder="John Doe"
              />
              <Input
                label="Email"
                errors={errors}
                touched={touched}
                id="email"
                name="email"
                placeholder="John@acme.com"
                type="email"
              />
              <Input
                label="Password"
                errors={errors}
                touched={touched}
                id="password"
                name="password"
                placeholder="******"
                type="password"
              />
              <button
                className="mt-2 bg-orange-300 text-black p-2 rounded-lg"
                type="submit"
                form="signup-form"
              >
                Submit
              </button>
              <div className="text-lg font-semibold">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-orange-300 cursor-pointer"
                >
                  Login
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
