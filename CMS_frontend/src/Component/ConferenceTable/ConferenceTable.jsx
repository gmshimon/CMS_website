import React from "react";
import { format } from "date-fns";
import { IoMdEye } from "react-icons/io";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

const ConferenceTable = ({
  currentConferences,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const navigate = useNavigate()
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-3 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto h-[400px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 table-zebra">
            <thead className="bg-slate-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase">
                  Conference ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-black font-bold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentConferences.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No conferences found.
                  </td>
                </tr>
              ) : (
                currentConferences.map((conference) => (
                  <tr key={conference._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {conference._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {conference.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {format(conference.createdAt, "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {conference.city},{conference.country}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          conference.status
                        )}`}
                      >
                        {conference.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        <button
                          className="hover:text-blue-600 transition p-1 rounded-full hover:bg-blue-100"
                          title="View Details"
                        >
                          <IoMdEye className="text-lg" />
                        </button>
                        <button
                          className="hover:text-blue-600 transition p-1 rounded-full hover:bg-blue-100"
                          title="View Details"
                          onClick={()=>navigate(`/admin/edit-conference/${conference._id}`)}
                        >
                          <FaEdit className="text-lg"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200">
          {totalPages > 1 && (
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConferenceTable;
