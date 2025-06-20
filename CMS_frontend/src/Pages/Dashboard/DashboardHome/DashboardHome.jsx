import React, { useEffect } from "react";
import PresenterHome from "../../../Component/PresenterHome/PresenterHome";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Component/Loading/Loading";
import AdminHome from "../../../Component/AdminHome/AdminHome";
import { getConference } from "../../../Redux/Slice/conferenceSlice";

const DashboardHome = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConference());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : (
        (user?.role?.value === "Presenter" && <PresenterHome />) ||
        (user?.role?.value === "Admin" && <AdminHome />)
      )}
    </>
  );
};

export default DashboardHome;
