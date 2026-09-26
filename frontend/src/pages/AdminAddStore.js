
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminAddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get("/admin/users", { params: { role: "owner" } })
      .then((res) => setOwners(res.data))
      .catch(() => {});
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/admin/stores", {
        ...form,
        owner_id: form.owner_id || null,
      });

      setSuccess("Store added successfully");

      setForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(
          err.response.data.errors.map((e) => e.msg).join(", ")
        );
      } else {
        setError(
          err.response?.data?.message || "Failed to add store"
        );
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Add New Store
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add a new store and optionally assign a store owner.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Store Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter store name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-xs text-gray-400">
                Must be between 20 and 60 characters.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Store Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="store@example.com"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Store Address
                </label>

                <span className="text-xs text-gray-400">
                  {form.address.length}/400
                </span>
              </div>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter complete store address"
                maxLength={400}
                rows={4}
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Store Owner
              </label>

              <select
                name="owner_id"
                value={form.owner_id}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">No owner assigned</option>

                {owners.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.email})
                  </option>
                ))}
              </select>

              <p className="mt-1 text-xs text-gray-400">
                You can assign an owner now or assign one later.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setForm({
                    name: "",
                    email: "",
                    address: "",
                    owner_id: "",
                  })
                }
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Clear
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Add Store
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

