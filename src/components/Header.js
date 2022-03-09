import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { auth } from "../firebase";
import { logoutRequest } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const signOut = () => {
    auth.signOut();
    dispatch(logoutRequest());
  };

  return (
    <HeaderWrapper>
      {isLoggedIn && <button onClick={signOut}>로그 아웃</button>}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  z-index: 1000;
`;
