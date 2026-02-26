import { Formik, Form } from "formik";
import { signupSchema } from "../utils/ValidationSchemas";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        >
          <Form>
            <InputField label="Name" name="name"  placeholder={"Enter name"}/>
            <InputField label="Email" name="email" type="email" placeholder={"Enter mail id"} />
            <InputField label="Password" name="password" type="password" placeholder={"Enter password"}/>
            <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder={"Confirm password"}/>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-2"
            >
              Sign Up
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
