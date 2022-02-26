import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../features/auth/authSlice";
import { auth, signInWithGoogle } from "../firebase";
import styled from "styled-components";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        const { email, displayName, photoURL } = userData;
        const token = await userData.getIdToken();

        if (!isLoggedIn) {
          dispatch(loginRequest({ email, displayName, photoURL, token }));
        }

        navigate("/main");
      }
    });
  }, []);

  return (
    <Container>
      <div className="dino-title">Dino Run</div>
      <button className="login-button" onClick={signInWithGoogle}>
        로그인 하기
      </button>
    </Container>
  );
}

const Container = styled.div`
  background: url(https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile8.uf.tistory.com%2Fimage%2F993F4C3359C52BF5379685);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .dino-title {
    font-size: 10rem;
    font-weight: 700;
  }

  .login-button {
    cursor: pointer;
    margin-top: 30px;
    padding: 15px 130px 15px 130px;
    border-radius: 10px;
    border: none;
    transition: 0.3s;
    font-size: 20px;
    font-weight: 100;
  }

  .login-button:hover {
    padding: 20px 132px 20px 132px;
    transition: all 0.2s linear 0s;
  }
`;
