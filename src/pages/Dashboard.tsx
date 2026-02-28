import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
 const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate= useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      

      if (response.status === 401) {
        localStorage.removeItem("token"); 
        navigate("/login");
        return;
      }
      const data = await response.json(); 
      
      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

     setSuccess(data.message || "Ticket created successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Task</h2>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </div>

      
        {success && (
          <p
            className="text-green-600 text-sm bg-green-50 border border-green-200
                        rounded px-3 py-2 mb-4"
          >
            {success}
          </p>
        )}

       
        {error && (
          <p
            className="text-red-500 text-sm bg-red-50 border border-red-200
                        rounded px-3 py-2 mb-4"
          >
            {error}
          </p>
        )}

      
        <div className="bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
