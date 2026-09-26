import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [error, setError] = useState("");

  function fetchUsers() {
    setError("");

    api
      .get("/admin/users", {
        params: { ...filters, sortBy, order },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  }

  useEffect(() => {
    api
      .get("/admin/users", {
        params: { ...filters, sortBy, order },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  }, [sortBy, order]);

  function handleFilterChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  function handleSort(column) {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  }

  function handleClearFilters() {
    const clearedFilters = {
      name: "",
      email: "",
      address: "",
      role: "",
    };

    setFilters(clearedFilters);

    api
      .get("/admin/users", {
        params: {
          ...clearedFilters,
          sortBy,
          order,
        },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  }

  function getSortIcon(column) {
    if (sortBy !== column) return "↕";
    return order === "asc" ? "↑" : "↓";
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">Admin Panel</p>

          <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage users, administrators, and store owners.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {users.length} {users.length === 1 ? "User" : "Users"}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              Filter Users
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Search users by name, email, address, or role.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <input
              name="name"
              placeholder="Filter by name"
              value={filters.name}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <input
              name="email"
              placeholder="Filter by email"
              value={filters.email}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <input
              name="address"
              placeholder="Filter by address"
              value={filters.address}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={fetchUsers}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Apply Filters
            </button>

            <button
              onClick={handleClearFilters}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="cursor-pointer whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:bg-gray-100"
                  >
                    Name{" "}
                    <span className="ml-1 text-gray-400">
                      {getSortIcon("name")}
                    </span>
                  </th>

                  <th
                    onClick={() => handleSort("email")}
                    className="cursor-pointer whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:bg-gray-100"
                  >
                    Email{" "}
                    <span className="ml-1 text-gray-400">
                      {getSortIcon("email")}
                    </span>
                  </th>

                  <th
                    onClick={() => handleSort("address")}
                    className="cursor-pointer whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:bg-gray-100"
                  >
                    Address{" "}
                    <span className="ml-1 text-gray-400">
                      {getSortIcon("address")}
                    </span>
                  </th>

                  <th
                    onClick={() => handleSort("role")}
                    className="cursor-pointer whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:bg-gray-100"
                  >
                    Role{" "}
                    <span className="ml-1 text-gray-400">
                      {getSortIcon("role")}
                    </span>
                  </th>

                  <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {u.name}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {u.email}
                    </td>

                    <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                      {u.address}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "owner"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {u.role === "admin"
                          ? "Admin"
                          : u.role === "owner"
                          ? "Owner"
                          : "User"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        to={`/admin/users/${u.id}`}
                        className="inline-flex rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center"
                    >
                      <div className="text-4xl">👥</div>
                      <p className="mt-3 text-sm font-medium text-gray-700">
                        No users found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your filters.
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