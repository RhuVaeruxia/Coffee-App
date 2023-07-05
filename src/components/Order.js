import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

export default function Order() {
  const coffee = [
    { menuId: 1, name: "아메리카노", pay: 4700 },
    { menuId: 2, name: "롱고", pay: 4900 },
    { menuId: 3, name: "카페라떼", pay: 5700 },
    { menuId: 4, name: "아이스크림 카페 라떼", pay: 7000 },
    { menuId: 5, name: "카라멜 마키아토", pay: 6200 },
    { menuId: 6, name: "에스프레소", pay: 4400 },
    { menuId: 7, name: "에스프레소 마키아토", pay: 4400 },
    { menuId: 8, name: "콜드브루", pay: 4900 },
    { menuId: 9, name: "콜드브루 라떼", pay: 5700 },
  ];

  const tea = [
    { menuId: 10, name: "생토마토 주스", pay: 6000 },
    { menuId: 11, name: "제주 레몬 에이드", pay: 6600 },
    { menuId: 12, name: "아이스 밀크", pay: 4700 },
    { menuId: 13, name: "라떼 프라페", pay: 7000 },
    { menuId: 14, name: "스토로베리 요거트", pay: 5500 },
    { menuId: 15, name: "아이스 다크 초콜릿", pay: 6000 },
    { menuId: 16, name: "아이스 밀크 초콜릿", pay: 6000 },
  ];

  const etc = [
    { menuId: 17, name: "공주알밤 양금빵", pay: 3300 },
    { menuId: 18, name: "샌드위치", pay: 7700 },
    { menuId: 19, name: "나타 오리지널", pay: 2800 },
    { menuId: 20, name: "팥빙수", pay: 8900 },
    { menuId: 21, name: "초콜릿 아이스크림", pay: 4500 },
    { menuId: 22, name: "밀크 소프트 아포가토", pay: 5000 },
  ];

  const menus = useMemo(() => [...coffee, ...tea, ...etc], [coffee, tea, etc]);

  const { menuId } = useParams();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [inCart, setInCart] = useState(false);
  const [totalPay, setTotalPay] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("coffee");
  const [money, setMoney] = useState(1500); // 추가: 카드의 충전된 금액 상태

  useEffect(() => {
    setTotalPay(
      cart.reduce((total, itemId) => {
        const item = menus.find((item) => item.menuId === itemId);
        if (item) {
          return total + item.pay;
        }
        return total;
      }, 0)
    );

    setInCart(cart.includes(parseInt(menuId)));
  }, [cart, menuId, menus]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  function addToCart(itemId) {
    if (!cart.includes(parseInt(itemId)) && !inCart) {
      const updatedCart = [...cart, parseInt(itemId)];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setInCart(true);
      setCart(updatedCart);
      alert("장바구니에 추가되었습니다.");
    } else {
      alert("이미 장바구니에 추가되었습니다.");
    }
  }

  function buys() {
    alert("서비스 준비중 입니다");
  }

  useEffect(() => {
    setTotalPay(
      cart.reduce((total, itemId) => {
        const item = menus.find((item) => item.menuId === itemId);
        if (item) {
          return total + item.pay;
        }
        return total;
      }, 0)
    );

    setInCart(cart.includes(parseInt(menuId)));
  }, [cart, menuId, menus]);

  const handleResetCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setInCart(false);
  };

  return (
    <main>
      <div>
        <h3>주문하기</h3>
        {/* 카테고리 선택 버튼 */}
        <div style={{ display: "flex" }}>
          <button
            className="btn-menu"
            //   style={{ marginRight: "1em", color: "red", fontSize: "1.3rem" }}
            onClick={() => handleCategoryChange("coffee")}
          >
            커피메뉴보기
          </button>
          <button
            className="btn-menu"
            onClick={() => handleCategoryChange("tea")}
          >
            주스메뉴보기
          </button>
          <button
            className="btn-menu"
            onClick={() => handleCategoryChange("etc")}
          >
            디저트메뉴보기
          </button>
        </div>
      </div>
      <h4>{selectedCategory === "coffee" ? "커피" : null}</h4>
      {/* 커피 메뉴 표시 */}
      {selectedCategory === "coffee" &&
        coffee.map((item) => (
          <div key={item.menuId}>
            <ul>
              <li>
                {item.name}, {item.pay.toLocaleString()} 원
                <button
                  className="btn-menu-item"
                  onClick={() => addToCart(item.menuId)}
                >
                  장바구니 담기
                </button>
              </li>
            </ul>
          </div>
        ))}
      <h4>{selectedCategory === "tea" ? "주스" : null}</h4>
      {/* 주스 메뉴 표시 */}
      {selectedCategory === "tea" &&
        tea.map((item, index) => (
          <div key={index}>
            <ul>
              <li>
                {item.name}, {item.pay.toLocaleString()} 원
                <button
                  className="btn-menu-item"
                  onClick={() => addToCart(item.menuId)}
                >
                  장바구니 담기
                </button>
              </li>
            </ul>
          </div>
        ))}
      <h4>{selectedCategory === "etc" ? "디저트" : null}</h4>
      {/* 디저트 메뉴 표시 */}
      {selectedCategory === "etc" &&
        etc.map((item, index) => (
          <div key={index}>
            <ul>
              <li>
                {item.name}, {item.pay.toLocaleString()} 원
                <button
                  className="btn-menu-item"
                  onClick={() => addToCart(item.menuId)}
                >
                  장바구니 담기
                </button>
              </li>
            </ul>
          </div>
        ))}
      <p> 담겨있는 메뉴</p>
      <ul>
        {/* 장바구니에 담긴 메뉴 표시 */}
        {cart.map((itemId) => {
          const item = menus.find((item) => item.menuId === itemId);
          if (item) {
            return (
              <div>
                <li key={itemId}>
                  {item.name} {item.pay.toLocaleString()} 원
                </li>
              </div>
            );
          }
          return null;
        })}
      </ul>
      <p>
        장바구니 합계: {totalPay.toLocaleString()} 원
        <button style={{ marginLeft: "4rem" }} onClick={handleResetCart}>
          초기화
        </button>
      </p>
      <button style={{ fontSize: "17px" }} onClick={buys}>
        결제하기
      </button>
    </main>
  );
}
