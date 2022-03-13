import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { WHITE, BLACK, MAIN_COLOR_1 } from "../../util/styles";

export default function MakeRoomModal({ onMake, onClose, children }) {
  return (
    <>
      <Dimmed onClick={onClose} />
      <MakeRoomMadalWrapper>
        <Div>{children}</Div>
        <Button data-testid="real-make-button" onClick={onMake}>
          레알 만들기
        </Button>
        <Button data-testid="cancel-button" onClick={onClose}>
          취소
        </Button>
      </MakeRoomMadalWrapper>
    </>
  );
}

MakeRoomModal.propTypes = {
  onMake: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const MakeRoomMadalWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 360px;
  height: 220px;
  position: absolute;
  margin-left: -180px;
  margin-top: -110px;
  text-align: center;
  border-radius: 0.5rem;
  background-color: ${WHITE};
`;

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Div = styled.div`
  color: ${BLACK};
  margin-top: 50px;
  margin-bottom: 45px;
  font-size: 1.4rem;
  font-weight: 100;
`;

const Button = styled.button`
  width: 40%;
  height: 40px;

  text-align: center;
  background: ${WHITE};
  color: ${BLACK};
  border-style: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 100;
  border-radius: 0.4rem;

  :hover {
    color: ${MAIN_COLOR_1};
    font-size: 1.5rem;
    font-weight: 400;
    transition: 0.2s;
  }
`;
