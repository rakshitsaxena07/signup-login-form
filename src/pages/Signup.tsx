import { Formik, Form } from "formik";
import { signupSchema } from "../utils/validationSchemas.js";
import InputField from "../components/InputField.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Signup() {
  const navigate = useNavigate();
  const handleSubmit = async (values: SignupValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }
      toast.success(data.message);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
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
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField label="Name" name="name" placeholder={"Enter name"} />
            <InputField
              label="Email"
              name="email"
              placeholder={"Enter email"}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder={"Enter password"}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder={"Confirm password"}
            />

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
