
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function AdminUserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/admin/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => setError("Failed to load user"));
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Loading user details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            User Details
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View account information and role details.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3 sm:px-8">
              <p className="text-sm font-semibold text-gray-500">
                Name
              </p>

              <p className="text-sm text-gray-900 sm:col-span-2">
                {user.name}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3 sm:px-8">
              <p className="text-sm font-semibold text-gray-500">
                Email
              </p>

              <p className="text-sm text-gray-900 sm:col-span-2">
                {user.email}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3 sm:px-8">
              <p className="text-sm font-semibold text-gray-500">
                Address
              </p>

              <p className="text-sm leading-6 text-gray-900 sm:col-span-2">
                {user.address}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3 sm:px-8">
              <p className="text-sm font-semibold text-gray-500">
                Role
              </p>

              <div className="sm:col-span-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "owner"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role === "owner"
                    ? "Store Owner"
                    : user.role === "admin"
                    ? "Admin"
                    : "Normal User"}
                </span>
              </div>
            </div>

            {user.role === "owner" && (
              <div className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3 sm:px-8">
                <p className="text-sm font-semibold text-gray-500">
                  Store Rating
                </p>

                <div className="sm:col-span-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                    ★ {user.rating ?? "0"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
