import { Link, Router, Routes, Route } from "react-router-dom";
// import logo from "./logo.svg";
// import "./App.css";

import { useState } from "react";

export default function Crown() {
  const menubar = ["Welcome", "Red", "Gold", "Platinum"];
  const todays = ["1주", "1개월", "3개월"];
  const [selectedButton, setSelectedButton] = useState("Gold"); // "Gold"를 선택된 버튼으로 설정
  const [showCrownSection, setShowCrownSection] = useState(true);
  const [showPainSection, setShowPainSection] = useState(false);

  const infome = (item) => {
    if (item === "Welcome") {
      return {
        rating: "신규회원",
        account: <h3>회원 가입만 하셨군요 어서 한잔 시키세요</h3>,
        services: <p>가입을 하시고 다음날 되시면 음료 제공해드림</p>,
      };
    } else if (item === "Red") {
      return {
        rating: "조금 마신사람",
        account: <h3>더더 마시세요</h3>,
        services: <p>가입을 하시고 다음날 되시면 음료 제공해드림</p>,
      };
    } else if (item === "Gold") {
      return {
        rating: "카페인 중독초기",
        account: <h3>더 마시면 건강에 좋지 않습니다.</h3>,
        services: <p>가입을 하시고 다음날 되시면 음료 제공해드림</p>,
      };
    } else if (item === "Platinum") {
      return {
        rating: "카페인 중독말기",
        account: <h3>선생께서는 이미 늦으셨습니다.</h3>,
        services: <p>가입을 하시고 다음날 되시면 음료 제공해드림</p>,
      };
    } else {
      return { rating: "", account: null, services: null };
    }
  };

  const handleClick = (item) => {
    setSelectedButton(item);
  };

  const handleCrownSectionToggle = () => {
    setShowCrownSection(true);
    setShowPainSection(false);
  };

  const handlePainSectionToggle = () => {
    setShowCrownSection(false);
    setShowPainSection(true);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고, 2자리로 맞추기 위해 앞에 0을 추가
    const day = String(today.getDate()).padStart(2, "0"); // 날짜가 10보다 작을 경우 앞에 0을 추가
    return `${year}-${month}-${day}`;
  };

  const getPastDate = () => {
    const today = new Date();
    const pastDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7일(24시간 * 60분 * 60초 * 1000밀리초)을 뺀 날짜 계산
    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, "0");
    const day = String(pastDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main>
      <div>
        <button onClick={handleCrownSectionToggle}>크라운 설명</button>
        <button onClick={handlePainSectionToggle}>적립 보기</button>
      </div>
      {showCrownSection && (
        <>
          <header>
            <h3>고객님의 현재 등급은 Gold 이십니다.</h3>
            <p>
              커피를 15잔을 후루룩 마시면 서서히 중독말기가 진행되어 위험합니다.
            </p>
            <img></img>
            <span>음료 12잔을 마시면 무료음료쿠폰이 발급됩니다</span>
          </header>
          <div>
            <span>(아이콘)크라운</span>
            <p>
              크라운은 월드 바리스타 챔피언을 상징하며 폴 바셋 브랜드의 고유성과
              자부심을 표상합니다.
            </p>
          </div>
          {menubar.map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item)}
              style={{
                fontWeight: selectedButton === item ? "bold" : "normal",
                color: selectedButton === item ? "red" : "black",
              }}
            >
              {item}
            </button>
          ))}
          <p>{selectedButton} 등급 소개</p>
          <div>
            {infome(selectedButton) && <p>{infome(selectedButton).rating}</p>}
            {infome(selectedButton).account}
            {infome(selectedButton).services}
            <p>크라운의 유효기간은 1년 입니다.</p>
            <p>크라운 12개 적립 시 다음날 무료 음료 쿠폰이 발행됩니다</p>
          </div>
        </>
      )}
      {showPainSection && (
        <div>
          <header>
            <h3>적립 보기</h3>
          </header>
          <main>
            <div>
              {todays.map((days, index) => (
                <button key={index}>{days}</button>
              ))}
              <input type="date" value={getPastDate()} />
              <input type="date" value={getTodayDate()} />
              <button>검색</button>
            </div>
            <p>적립 없으니 어서 음료를 마셔서 빈칸을 채워보세요</p>
          </main>
        </div>
      )}
    </main>
  );
}
