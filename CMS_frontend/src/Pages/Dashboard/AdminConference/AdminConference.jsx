import React, { useState } from "react";
import ConferenceTable from "../../../Component/ConferenceTable/ConferenceTable";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
const AdminConference = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const conferencesPerPage = 5;

  const dummyConferences = [
    {
      id: "CONF001",
      title: "International Conference on AI",
      date: new Date(2025, 7, 12),
      location: "Berlin, Germany",
      status: "Upcoming",
    },
    {
      id: "CONF002",
      title: "Tech Summit 2025",
      date: new Date(2025, 5, 20),
      location: "Munich, Germany",
      status: "Ongoing",
    },
    {
      id: "CONF003",
      title: "Cyber Security Conference",
      date: new Date(2025, 3, 15),
      location: "Frankfurt, Germany",
      status: "Completed",
    },
    {
      id: "CONF004",
      title: "Blockchain Expo",
      date: new Date(2025, 9, 1),
      location: "Hamburg, Germany",
      status: "Upcoming",
    },
    {
      id: "CONF005",
      title: "Health Tech Forum",
      date: new Date(2025, 4, 10),
      location: "Cologne, Germany",
      status: "Completed",
    },
    {
      id: "CONF006",
      title: "Cloud DevCon",
      date: new Date(2025, 6, 8),
      location: "Stuttgart, Germany",
      status: "Upcoming",
    },
  ];

  const filteredConferences = dummyConferences.filter(
    (conference) =>
      conference.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conference.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conference.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredConferences.length / conferencesPerPage);
  const indexOfLast = currentPage * conferencesPerPage;
  const indexOfFirst = indexOfLast - conferencesPerPage;
  const currentConferences = filteredConferences.slice(
    indexOfFirst,
    indexOfLast
  );
  return (
    <div>
      <div className="px-6 pt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Conference</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search Conference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <button
                  onClick={() => navigate(`/admin/create-conference`)}
                className="btn btn-active btn-primary"
              >
                Create Conference <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConferenceTable
        currentConferences={currentConferences}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default AdminConference;
