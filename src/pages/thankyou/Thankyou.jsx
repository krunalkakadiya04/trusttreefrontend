import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { getActionOnInviteCode } from "../../middlewares/auth";
import "../login/Login.css";

const Thankyou = () => {
  const dispatch = useDispatch();
  const { getActionOnInviteCodeMessage } = useSelector((state) => state.auth);
  let { code, status } = useParams();

  useEffect(() => {
    dispatch(getActionOnInviteCode(code, status));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-body text-center">
      <div className="logo-login">
        <img src={logo} alt="logo" />
      </div>
      <div>
        <h3 style={{ color: "white", textAlign: "center" }}>
          {/* Thanks for your submission. */}
          {getActionOnInviteCodeMessage}
        </h3>
      </div>
    </div>
  );
};

export default Thankyou;
