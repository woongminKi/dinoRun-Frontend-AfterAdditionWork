import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../firebase";
import { logoutRequest } from "../features/slice/authSlice";
import { removeCookie } from "../util/cookies";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const signOut = () => {
    auth.signOut();
    dispatch(logoutRequest());
    removeCookie("accessToken");
    removeCookie("refreshToken");

    navigate("/");
  };

  return (
    <HeaderWrapper>
      {isLoggedIn && (
        <button className="action-button" onClick={signOut}>
          로그 아웃
        </button>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  background-color: #f5f5f5;

  .action-button {
    cursor: pointer;
    margin-top: 5px;
    padding: 7px 10px 7px 10px;
    border-radius: 10px;
    transition: 0.3s;
    font-size: 8px;
    font-weight: 10;
    position: absolute;
    right: 0;
  }

  .action-button:hover {
    padding: 10px 15px 10px 15px;
    transition: all 0.2s linear 0s;
  }
`;
