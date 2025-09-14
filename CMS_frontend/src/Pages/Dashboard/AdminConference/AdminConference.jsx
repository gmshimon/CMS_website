import  { useEffect, useState } from "react";
import ConferenceTable from "../../../Component/ConferenceTable/ConferenceTable";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { showSuccessToast } from "../../../Utilis/toastUtils";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../Redux/Slice/conferenceSlice";
import Loading from "../../../Component/Loading/Loading";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminConference = () => {
  const { createConferenceSuccess, conferences, getConferenceLoading,editConferenceSuccess } =
    useSelector((state) => state.conference);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const status = queryParams.get('status')

  useEffect(()=>{
    if(status === 'Active'){
      setStatusFilter(status)
    }else{
      setStatusFilter('')
    }
  },[status])
  const conferencesPerPage = 5;

  useEffect(() => {
    if (createConferenceSuccess) {
      showSuccessToast("Conference created successfully!");
      dispatch(reset());
    }
    if(editConferenceSuccess){
      showSuccessToast("Conference Updated successfully!");
      dispatch(reset());
    }
  }, [createConferenceSuccess, dispatch, editConferenceSuccess]);

  const filteredConferences = conferences.filter((conference) => {
    const matchesName = conference.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "" || conference.status === statusFilter;
    return matchesName && matchesStatus;
  });

  const totalPages = Math.ceil(filteredConferences.length / conferencesPerPage);
  const indexOfLast = currentPage * conferencesPerPage;
  const indexOfFirst = indexOfLast - conferencesPerPage;
  const currentConferences = filteredConferences.slice(
    indexOfFirst,
    indexOfLast
  );
  return (
    <div>
      <ToastContainer />
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
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Disable">De-active</option>
                  </select>
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
