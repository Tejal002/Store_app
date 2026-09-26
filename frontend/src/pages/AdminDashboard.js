
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load dashboard stats"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Overview of users, stores, and submitted ratings.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!stats && !error && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Loading dashboard...
            </p>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-gray-900">
                    {stats.totalUsers}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    Registered users
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  👥
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Stores
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-gray-900">
                    {stats.totalStores}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    Registered stores
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl">
                  🏪
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Ratings
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-gray-900">
                    {stats.totalRatings}
                  </h2>

                  <p className="mt-2 text-xs text-gray-400">
                    Submitted ratings
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-xl">
                  ⭐
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

