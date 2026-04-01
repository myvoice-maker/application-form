"use client";

import React, { useState, useEffect } from "react";

interface DataItem {
  email: string;
  last_name: string;
  first_name: string;
  phone_number: string;
  occupation: string;
  people_to_occupy: number;
  has_vehicle: boolean;
  has_pet: boolean;
  been_evicted: boolean;
  payment_method: string;
  moving_date: string;
  signature: string | null;
}

const DataTable = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user/applications");
      console.log("something went wrong");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBoolean = (value: boolean | undefined | null) => {
    if (value === undefined || value === null) return "N/A";
    return value ? "Yes" : "No";
  };

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg m-5 p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500"></div>
        <p className="mt-4 text-gray-500 text-sm">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg m-5 p-10 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">
          Error Loading Data
        </h3>
        <p className="text-gray-600 mb-4 text-sm">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-lg m-5 p-10">
        <p className="text-gray-500 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Desktop View - Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  People to Occupy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Has Vehicle
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Has Pet
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Been Evicted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moving Date
                </th>
                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signature
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 break-all">
                    {item.email || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 capitalize">
                    {item.last_name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 capitalize">
                    {item.first_name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.phone_number || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.occupation || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.people_to_occupy || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatBoolean(item.has_vehicle)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatBoolean(item.has_pet)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatBoolean(item.been_evicted)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.payment_method || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatDate(item.moving_date)}
                  </td>
                  {/* <td className="px-4 py-3 text-sm text-gray-900">
                    {item.signature ? (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                        onClick={() => window.open(item.signature!, "_blank")}
                      >
                        View
                      </button>
                    ) : (
                      "N/A"
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleRow(index)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {item.first_name} {item.last_name}
                </span>
                <span className="text-xs text-gray-500 mt-1">{item.email}</span>
              </div>
              <div className="text-gray-400 text-lg">
                {expandedRow === index ? "▼" : "▶"}
              </div>
            </div>

            {expandedRow === index && (
              <div className="border-t border-gray-100 p-4 space-y-3">
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Phone Number:
                  </span>
                  <span className="text-xs text-gray-900">
                    {item.phone_number || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Occupation:
                  </span>
                  <span className="text-xs text-gray-900">
                    {item.occupation || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    People to Occupy:
                  </span>
                  <span className="text-xs text-gray-900">
                    {item.people_to_occupy || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Has Vehicle:
                  </span>
                  <span className="text-xs text-gray-900">
                    {formatBoolean(item.has_vehicle)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Has Pet:
                  </span>
                  <span className="text-xs text-gray-900">
                    {formatBoolean(item.has_pet)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Been Evicted:
                  </span>
                  <span className="text-xs text-gray-900">
                    {formatBoolean(item.been_evicted)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Payment Method:
                  </span>
                  <span className="text-xs text-gray-900">
                    {item.payment_method || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    Moving Date:
                  </span>
                  <span className="text-xs text-gray-900">
                    {formatDate(item.moving_date)}
                  </span>
                </div>
                <div className="flex justify-between py-1 items-center">
                  <span className="text-xs font-medium text-gray-500">
                    Signature:
                  </span>
                  {item.signature ? (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      onClick={() => window.open(item.signature!, "_blank")}
                    >
                      View Signature
                    </button>
                  ) : (
                    <span className="text-xs text-gray-900">N/A</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
