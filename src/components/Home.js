export default function Home() {
  return (
    <div>
      <p>PC에서 주문할 수 있도록 임시로 만들어진 커피 앱 입니다</p>
      <p>상단 위의 버튼을 클릭하시길 바랍니다</p>
      <form>
        <div style={{ width: "400px" }}>
          <p>오류가 있을 경우 아래 양식에 맞춰 제출 해주시길 바랍니다.</p>
          <label>
            <p>유저명</p>
            <input type="text" placeholder={"username"} />
          </label>
          <label>
            <p>이메일 주소</p>
            <input type={"email"} placeholder={"hoo@naver.com"} />
          </label>
          <label>
            <textarea
              style={{ width: "300px", height: "200px", marginTop: "2rem" }}
              placeholder={"페이지가 왜이리 허접해요"}
            ></textarea>
          </label>
          <button type="submit" style={{ display: "block" }}>
            전송하기
          </button>
        </div>
      </form>
    </div>
  );
}
