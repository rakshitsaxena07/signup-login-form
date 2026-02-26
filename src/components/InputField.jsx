// components/InputField.jsx
import { Field, ErrorMessage } from 'formik';

export default function InputField({ label, name, type = 'text', placeholder }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <ErrorMessage
        name={name}
       render={msg => <p className="text-red-500 text-xs mt-1">{msg}</p>}
      />
    </div>
  );
}