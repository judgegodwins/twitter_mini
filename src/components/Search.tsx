import { FC } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

const Search: FC<{}> = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {},
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}></Form>
    </FormikProvider>
  );
};
