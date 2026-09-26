import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: "", address: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function fetchStores() {
    setError("");

    api
      .get("/user/stores", { params: search })
      .then((res) => setStores(res.data))
      .catch(() => setError("Failed to load stores"));
  }

  useEffect(() => {
  api.get("/user/stores", {
      params: { name: "", address: "" },
    })
    .then((res) => setStores(res.data))
    .catch(() => setError("Failed to load stores"));
}, []);

  function handleSearchChange(e) {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }

  async function handleRate(storeId, rating) {
    setError("");
    setMessage("");

    try {
      await api.post(`/user/stores/${storeId}/rating`, { rating });
      setMessage("Rating saved");
      fetchStores();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save rating"
      );
    }
  }

  function handleClearSearch() {
    const clearedSearch = { name: "", address: "" };
    setSearch(clearedSearch);

    api
      .get("/user/stores", { params: clearedSearch })
      .then((res) => setStores(res.data))
      .catch(() => setError("Failed to load stores"));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            User Panel
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Stores
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Search stores, view ratings, and share your experience.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Search Stores
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Find stores by name or address.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              name="name"
              placeholder="Search by store name"
              value={search.name}
              onChange={handleSearchChange}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <input
              name="address"
              placeholder="Search by address"
              value={search.address}
              onChange={handleSearchChange}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={fetchStores}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>

            <button
              onClick={handleClearSearch}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mb-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {stores.length} {stores.length === 1 ? "Store" : "Stores"}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Store Name
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Address
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Overall Rating
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Your Rating
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Rate This Store
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {stores.map((s) => (
                  <tr
                    key={s.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-gray-900">
                      {s.name}
                    </td>

                    <td className="max-w-xs px-6 py-5 text-sm text-gray-600">
                      {s.address}
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                        ★ {s.overall_rating}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5">
                      {s.user_rating ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                          ★ {s.user_rating}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Not rated
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleRate(
                              s.id,
                              parseInt(e.target.value)
                            );
                            e.target.value = "";
                          }
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="" disabled>
                          {s.user_rating
                            ? "Modify rating"
                            : "Select rating"}
                        </option>

                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} Star{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}

                {stores.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center"
                    >
                      <div className="text-4xl">🏪</div>

                      <p className="mt-3 text-sm font-medium text-gray-700">
                        No stores found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search criteria.
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