import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { socketAction } from "../../modules/useSocket";
import { getMyScore, gameFinished } from "../../features/game/gameSlice";

import DinoPlayer from "./character/DinoPlayer";
import DinoTrex from "./character/DinoTrex";
import Cactus from "./character/Cactus";
import Bird from "./character/Bird";
import Ground from "./background/Ground";

import {
  dinoCharacterImage,
  cactusCharacterImage,
  birdCharacterImage,
  groundImage,
} from "./gameImages/CharaterImages";

export default function DinoRunCanvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const gameResource = useRef(null);

  const [score, setScore] = useState("");
  const [isCollision, setIsCollision] = useState(false);

  const dinoImage = new Image();
  dinoImage.src = dinoCharacterImage;

  const cactusImage = new Image();
  cactusImage.src = cactusCharacterImage;

  const birdImage = new Image();
  birdImage.src = birdCharacterImage;

  const backGroundImage = new Image();
  backGroundImage.src = groundImage;

  const handleGoToMain = () => {
    navigate("/main");
  };

  useEffect(() => {
    dispatch(getMyScore(score));
    socketAction.gameScore(score);
  }, [score]);

  useEffect(() => {
    dispatch(gameFinished());
  }, [isCollision]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    const obstacleArray = [];
    let animationFrameId = null;
    let timer = 0;
    let gameSpeed = 3;

    const collisionCheck = (currentScore, differenceX, differenceY) => {
      if (differenceX < 0 && differenceY < 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrameId);
        setIsCollision(true);
      }

      setScore(currentScore);
    };

    const dinoTrex = new DinoTrex(context, dinoImage);
    const cactus = new Cactus(context, cactusImage);
    const ground = new Ground(context, backGroundImage, canvas.width);

    gameResource.current = new DinoPlayer(
      context,
      10,
      200,
      50,
      50,
      dinoTrex,
      cactus,
      canvas.width,
      canvas.height
    );
    const dinoPlayer = gameResource.current;

    const drawGame = () => {
      animationFrameId = requestAnimationFrame(drawGame);
      context.clearRect(0, 0, canvas.width, canvas.height);

      timer++;

      if (timer % 144 === 0) {
        const cactusElement = new Cactus(context, cactusImage);
        const birdElement = new Bird(context, birdImage);
        obstacleArray.push(cactusElement);
      }
      obstacleArray.forEach((obstacleItem, index, array) => {
        if (obstacleItem.x < 0) {
          array.splice(index, 1);
        }

        if (timer % 500 === 0) {
          gameSpeed += 1;
        }

        obstacleItem.x -= gameSpeed;

        obstacleItem.draw();

        const { differenceX, differenceY } =
          dinoTrex.collisionCheck(obstacleItem);
        collisionCheck(timer, differenceX, differenceY);
      });
      collisionCheck(timer);
      dinoTrex.draw();
      ground.draw();
    };
    drawGame();
    dinoPlayer.start();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);

  return (
    <Div>
      <canvas ref={canvasRef} />
      {isCollision && (
        <button className="action-button" onClick={handleGoToMain}>
          나가기
        </button>
      )}
    </Div>
  );
}

const Div = styled.div`
  .action-button {
    cursor: pointer;
    margin-top: 5px;
    padding: 12px 15px 12px 15px;
    border-radius: 10px;
    transition: 0.3s;
    font-size: 8px;
    font-weight: 10;
  }

  .action-button:hover {
    padding: 15px 19px 15px 19px;
    transition: all 0.2s linear 0s;
  }
`;
