import React, { useEffect } from "react";
import SideBar from "./sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../middlewares/users";
import { getCurrency, getLanguages } from "../middlewares/brands";

const AppLayout = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getLanguages())
    dispatch(getCurrency())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Wrapper">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
