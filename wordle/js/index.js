const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:45vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1; //한줄 더하기 (다음줄 넘어가기)
    index = 0; // 인덱스 초기화
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6aaa64";
        // 애니메이션 클래스 추가
        block.classList.add("correct-animation");
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#d1b036";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  // 키보드 클릭 이벤트

  const footerKeys = document.querySelectorAll(".board-key");

  footerKeys.forEach((key) => {
    key.addEventListener("click", () => {
      const 입력한_글자 = key.innerText;
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      block.innerText = 입력한_글자;
      index++;

      if (index === 5) {
        handleEnterKey();
      }
    });
  });

  const enterKey = document.querySelector(".board-key__enter");
  enterKey.addEventListener("click", handleEnterKey);

  const backspaceKey = document.querySelector(".board-key__back-space");
  backspaceKey.addEventListener("click", handleBackspace);

  startTimer();
  window.addEventListener("keydown", handlekeydown);
}
appStart();
