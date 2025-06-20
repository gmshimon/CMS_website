import React, { useEffect, useState } from "react";
import ConferenceTable from "../../../Component/ConferenceTable/ConferenceTable";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { showSuccessToast } from "../../../Utilis/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../Redux/Slice/conferenceSlice";
import Loading from "../../../Component/Loading/Loading";
const AdminConference = () => {
  const { createConferenceSuccess, conferences, getConferenceLoading } =
    useSelector((state) => state.conference);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const conferencesPerPage = 5;

  useEffect(() => {
    if (createConferenceSuccess) {
      showSuccessToast("Conference created successfully!");
      dispatch(reset());
    }
  }, [createConferenceSuccess, dispatch]);
  console.log(conferences);
  const filteredConferences = conferences.filter(
    (conference) =>
      conference.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      // conference.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // conference.status.toLowerCase().includes(searchQuery.toLowerCase())
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
      {getConferenceLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <Loading />
        </div>
      ) : (
        <>
          <div className="px-6 pt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Conference
              </h2>
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
        </>
      )}
    </div>
  );
};

export default AdminConference;
