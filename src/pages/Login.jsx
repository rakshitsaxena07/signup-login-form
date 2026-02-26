import { Formik, Form } from "formik";
import { loginSchema } from "../utils/ValidationSchemas";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit= async (values) => {
    try{
      const response = await fetch("http://localhost:8080/api/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
     
      alert(JSON.stringify(data, null, 2));
    }
    catch (error) {
    console.error(error);
  }
    
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter mail id"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-2"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
