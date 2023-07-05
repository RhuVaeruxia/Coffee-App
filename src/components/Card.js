import { useState } from "react";

export default function Card() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // 변경: 추가

  const [money, newMoney] = useState(1500);
  const [chargeAmount, setChargeAmount] = useState(0); // 추가: 충전할 금액 변수
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleConfirmationClose();
  };

  const coinplus = (up) => {
    setChargeAmount(up);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  const handleCharge = () => {
    newMoney(money + chargeAmount);
    alert(`${chargeAmount.toLocaleString()}원 충전되었습니다`);
    setIsConfirmationOpen(false);
    setIsModalOpen(false);
  };

  const Modal = ({ onClose, children }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          {children}
          <button
            style={{ display: "block", marginTop: "30px" }}
            onClick={closeModal}
          >
            충전하지않기
          </button>
        </div>
      </div>
    );
  };

  return (
    <main>
      <div>
        <p>보유카드(1/1)</p>
        <span>카드 우측상단의 이미지를 선택하여 대표카드를 설정하세요</span>
      </div>
      <div>
        <image>
          <span>이미지</span>
        </image>
      </div>
      <header>
        <p>바코드</p>
        <div style={{}}>
          <h3>카드 잔액</h3>
          <h3>{money.toLocaleString()} 원</h3>
        </div>
      </header>
      <nav>
        <div>
          <button onClick={openModal}>충전하기</button>
        </div>
        {/* 모달 컴포넌트 */}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            {/* 모달 내용 */}
            <h2>충전하기</h2>
            <p>충전할 금액을 선택해주세요</p>
            <button className="btn-coin" onClick={() => coinplus(10000)}>
              1만원
            </button>
            <button className="btn-coin" onClick={() => coinplus(30000)}>
              3만원
            </button>
            <button className="btn-coin" onClick={() => coinplus(50000)}>
              5만원
            </button>
          </Modal>
        )}

        {/* 충전 확인 모달 */}
        {isConfirmationOpen && (
          <div className="confirmation-popup">
            <h3>충전 금액 확인</h3>
            <p>{chargeAmount.toLocaleString()}원을 충전하시겠습니까?</p>
            <button
              style={{ width: "50px", padding: "15px" }}
              onClick={handleCharge}
            >
              예
            </button>
            <button
              style={{ width: "70px", padding: "15px", marginLeft: "6em" }}
              onClick={handleConfirmationClose}
            >
              아니요
            </button>
          </div>
        )}
      </nav>
    </main>
  );
}
