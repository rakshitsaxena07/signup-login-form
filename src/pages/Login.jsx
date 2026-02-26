import { Formik, Form } from 'formik';
import { loginSchema } from '../utils/ValidationSchemas';
import InputField from '../components/InputField';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={values => alert(JSON.stringify(values, null, 2))}
        >
          <Form>
            <InputField label="Email"    name="email"    type="email" />
            <InputField label="Password" name="password" type="password" />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-2"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600">Sign Up</a>
        </p>

      </div>
    </div>
  );
}