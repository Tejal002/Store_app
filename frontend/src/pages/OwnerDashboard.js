import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/owner/dashboard")
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(
          err.response?.data?.message || "Failed to load dashboard"
        )
      );
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              Loading dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            Store Owner Panel
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {data.store.name}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View your store rating and customer feedback.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Average Rating
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {data.averageRating}
                  </span>

                  <span className="text-2xl text-yellow-500">★</span>
                </div>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-xl">
                ⭐
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Ratings
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {data.raters.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                👥
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Users Who Rated This Store
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Customer ratings and information for your store.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Name
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Email
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Rating
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data.raters.map((r) => (
                  <tr
                    key={r.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {r.name}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {r.email}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                        ★ {r.rating}
                      </span>
                    </td>
                  </tr>
                ))}

                {data.raters.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="text-4xl">⭐</div>

                      <p className="mt-3 text-sm font-medium text-gray-700">
                        No ratings yet
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Customer ratings will appear here.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}