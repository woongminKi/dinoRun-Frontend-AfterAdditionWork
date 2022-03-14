# 🦖 Dino Run

디노런은 인터넷 연결이 안 됐을 때 크롬에서 할 수 있는 구글 공룡 게임을 온라인화 해 친구들과 함께 즐길 수 있는 게임입니다.
키보드 조작도 가능하지만, 안면 인식으로 감정에 따라 공룡 캐릭터를 조작할 수도 있습니다.

## 📈Preview

https://user-images.githubusercontent.com/96522144/158065592-c8e80a69-4aaf-4ada-82d4-909f59805ad0.mov

배포 사이트 : https://www.dinorun.site/

## 🚀 ShortCut

- 💡 Motivation
- ✅ Features
- 📅 Schedule
- 🖥 Tech Stack
- 🕹 Getting Started
- 🤔 Why we used it
- 🔥 Challenge

## 💡 Motivation

이전에 쿠키런을 재밌게 했으며 이와 유사하지만 인터넷 연결이 안 될 때만 할 수 있는 구글 공룡 게임을 온라인으로 친구들과 함께 플레이하면 어떨까 하는 생각이 들어 프로젝트를 기획하게 됐습니다.

모니터를 보며 키보드로 조작을 하는 게임은 많지만 내 얼굴을 보며 감정에 따라 캐릭터가 움직이는 게임은 많이 없다고 생각했습니다. 

이를 친구들과 함께 할 수 있다면 보다 주도적으로 재미있는 게임을 할 수 있을 것이라 생각했습니다. 안면 인식&감정 판별에 따른 게임 조작을 할 수 있게 해 게임의 재미를 향상시켰습니다.


## ✅ Features

플레어이어는 방을 생성해 상대 플레이어와 실시간 대전을 할 수 있습니다.

방장은 게임을 시작, 방 삭제를 할 수 있으며 게임 시작을 누르면 게임이 시작되고, 방 삭제를 누르면 상대 플레이어에게 방이 삭제됐다는 알림이 뜹니다.

상대 플레이어가 게임 시작 전 방을 나가면 방장 화면에는 플레이어를 기다리는 중이라는 화면으로 바뀌면서 플레이어가 사라집니다.

게임이 시작하면 카메라가 켜지며 안면 인식을 시작함과 동시에 웃는 얼굴(Happy)일 때 캐릭터가 점프를 합니다. 스페이스바로도 조작 할 수 있습니다.

실시간으로 상대방의 점수가 내 화면에 나타나며 그에 따른 승 패 여부도 실시간으로 확인 할 수 있습니다.

장애물에 부딪히면 게임이 종료되며 방을 나갈 수 있습니다.

## 📅 Schedule

2022.02.21 ~ 2022.03.13(21일)
총 3주 동안 프로젝트를 진행했습니다.

### 1주차 - 기획 및 설계

- 아이디어 검토
- DB Schema 설계
- Mock up Design
- 기술 스택 조사 및 선정
- API 명세 작성
- Task Card 작성

### 2,3주차 - 개발 및 마무리

- Frontend, Backend Setup
- Frontend
    - 로그인 기능
    - face-api로 안면, 감정 인식에 따른 캐릭터 점프 기능(키보드 조작도 가능)
    - [Socket.io](http://Socket.io) 실시간 통신
    - Redux-Saga 도입
- Backend
    - 로그인 정보 GET, POST
    - 방 정보 GET, POST, DELETE
    - Socket 통신
- Test Code 작성
- CSS 작업
- Frontend 배포 (Netlify)
- Backend 배포 (AWS Elastic Beanstalk)
- README 작성


## 🖥 Tech Stack

### Frontend
- Javascript
- React
- Redux
- Redux-saga
- Redux-toolkit
- socket.io-client
- Goole login api(+firebase)
- styled-component
- jest
- react-test-library
- face-api

### Backend
- node.js
- mongoDB
- Express
- socket.io

### Convention
- prettier
- eslint

## 🕹 Getting Started

### Installation

- Local 환경에서 실행하기 위해서 몇 가지 사전 준비가 필요합니다.
- 각 Repository를 Clone 한 후, .env 파일에 환경 변수를 입력해주세요.

```
git clone https://github.com/woongminKi/dino-run-frontend.git
npm install
npm run start
```

```
git clone https://github.com/woongminKi/dino-run-backend.git
npm install
npm run start
```


## 🤔 Why (About Tech Stack)



## 🔥 Challenge


