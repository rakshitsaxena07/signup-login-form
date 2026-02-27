import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField.js";
import { loginSchema } from "../utils/validationSchemas.js";
 interface LoginValues {
  email:    string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>('');

  const handleSubmit= async (values: LoginValues) => {
    try{
         setServerError('');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if(!response.ok) {throw new Error(data.message || 'Invalid email or password');}
      localStorage.setItem("token", data.data.token);
      navigate('/dashboard'); 
    }
    catch (error:unknown) {
    if (error instanceof Error) {
    setServerError(error.message); 
  }
  }
    
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {serverError && (<p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">
            {serverError}
          </p>
        )}

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
