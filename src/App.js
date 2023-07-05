import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
// import "./index.css";

import { useState } from "react";
import Home from "./components/Home";
import Crown from "./components/Crown";
import Card from "./components/Card";
import Order from "./components/Order";

function App() {
  const navLinks = [
    { to: "/", label: "메인 페이지" },
    { to: "/crown", label: "멤버십" },
    { to: "/card", label: "기프트잔액" },
    { to: "/order", label: "주문하기" },
  ];

  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (to) => {
    setSelectedLink(to);
  };

  return (
    <Router>
      <div>
        {/* 네비게이션 링크 */}
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`app-link ${
                    selectedLink === link.to ? "selected" : ""
                  }`}
                  onClick={() => handleLinkClick(link.to)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 라우트 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crown" element={<Crown />} />
          <Route path="/card" element={<Card />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
