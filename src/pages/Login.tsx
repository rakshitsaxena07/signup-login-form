import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField.js";
import { loginSchema } from "../utils/validationSchemas.js";
import { toast } from "react-hot-toast";

interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("role", data.data.role);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
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
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label="Email"
                name="email"
                placeholder="Enter email"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded mt-2 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
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
