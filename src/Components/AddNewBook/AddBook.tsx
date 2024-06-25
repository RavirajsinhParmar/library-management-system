import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import Input from "../../Common/Input";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

interface Values {
  title: string;
  author: string;
  genre: string;
  publishedYear: string;
}
const AddBook = () => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
    genre: yup.string().required("Genre is required"),
    publishedYear: yup.string().required("Published year is required"),
  });

  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    try {
      await addDoc(collection(db, "books"), {
        ...values,
        created: new Date(),
      });
      setSubmitting(false);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative w-full h-full my-4 pt-2 border border-gray-300 flex-col gap-4 rounded-lg text-lg text-black z-9 flex justify-center items-center">
      <div className="!text-3xl font-semibold">Add new book</div>
      <Formik
        initialValues={{
          title: "",
          author: "",
          genre: "",
          publishedYear: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form
            id="add-book-form"
            className="w-full z-10 bg-gray-300 backdrop-filter backdrop-blur-lg bg-opacity-15 flex flex-col p-8 gap-3"
          >
            <div className="flex justify-between">
              <Input
                label="Title"
                errors={errors}
                touched={touched}
                id="title"
                name="title"
                className="!border-gray-500"
                placeholder="Enter book title"
              />
              <Input
                label="Author"
                errors={errors}
                touched={touched}
                id="author"
                name="author"
                className="!border-gray-500"
                placeholder="Enter author name"
              />
              <Input
                label="Published year"
                errors={errors}
                touched={touched}
                id="publishedYear"
                name="publishedYear"
                className="!border-gray-500"
                placeholder="Enter published year"
              />
              <Input
                label="Genre"
                errors={errors}
                touched={touched}
                id="genre"
                name="genre"
                className="!border-gray-500"
                placeholder="Enter book genre (category)"
              />
            </div>

            <button
              className="my-2 self-end bg-blue-600 min-w-[8%] max-w-max text-white p-1.5 rounded-lg"
              type="submit"
              form="add-book-form"
            >
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBook;
