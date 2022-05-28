var x;
var count = 0;
var ctx;
var valueArr = [];

function init() {
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.font = "14px arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

//애니메이션을 위한 동기 구현
function sleep500ms() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Searching..");
    }, 500);
  });
}

//애니메이션을 위한 동기 구현
function sleep20ms() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Searching..");
    }, 20);
  });
}

//현재 x값에 따라 Head 노드를 표시
function drawHead() {
  ctx.beginPath();
  ctx.moveTo(x, 180);
  ctx.lineTo(x, 145);
  ctx.moveTo(x - 10, 155);
  ctx.lineTo(x, 145);
  ctx.moveTo(x + 10, 155);
  ctx.lineTo(x, 145);
  ctx.stroke();
  ctx.fillText("머리", x, 200);
}

//현재 x값에 따라 Tail 노드를 표시
function drawTail() {
  ctx.beginPath();
  ctx.moveTo(x, 60);
  ctx.lineTo(x, 95);
  ctx.moveTo(x - 10, 85);
  ctx.lineTo(x, 95);
  ctx.moveTo(x + 10, 85);
  ctx.lineTo(x, 95);
  ctx.stroke();
  ctx.fillText("꼬리", x, 40);
}

//현재 x값에 따라 원을 그림
function drawCircle(value) {
  ctx.beginPath();
  ctx.arc(x, 120, 20, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.stroke();
  ctx.fillText(value, x, 120);
}

//현재 x값에 따라 화살표를 그림
function drawArrow() {
  ctx.beginPath();
  ctx.moveTo(x + 20, 120);
  ctx.lineTo(x + 70, 120);
  ctx.moveTo(x + 60, 110);
  ctx.lineTo(x + 70, 120);
  ctx.moveTo(x + 60, 130);
  ctx.lineTo(x + 70, 120);
  ctx.stroke();
}

//index값에 따른 위치에 특정 노드를 분홍색으로 표시
function fillCircle(index, target) {
  ctx.beginPath();
  ctx.arc(50 + index * 90, 120, 20, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,182,193, 0.3)";

  ctx.fill();
  ctx.fillStyle = "black";
  ctx.fillText(target, 50 + index * 90, 120);
}

//현재 valueArr에 대해 모든 원소를 연결 리스트로 표현. x값 50으로 초기화
function draw() {
  console.log(valueArr);
  ctx.clearRect(0, 0, 1000, 1000);
  x = 50;

  drawHead();
  valueArr.map((value, idx) => {
    if (idx !== 0) {
      drawArrow();
      x += 90;
    }
    drawCircle(value);
  });
  drawTail();
}

//head에 원소 추가 시 기존 valueArr를 오른쪽으로 민 상태
function drawOriginToRight() {
  ctx.clearRect(0, 0, 1000, 1000);
  x = 140;
  drawHead();
  valueArr.map((value, idx) => {
    if (idx !== 0) {
      drawArrow();
      x += 90;
    }
    drawCircle(value);
  });
  drawTail();
}

//head에 원소 추가
async function insertHead() {
  var value = document.getElementById("value").value;

  if (valueArr.length != 0) {
    for (i = 0; i < 95; i += 5) {
      await sleep20ms();
      ctx.clearRect(0, 0, 1000, 1000);
      x = 50;
      x += i;

      drawHead();
      valueArr.map((value, idx) => {
        if (idx !== 0) {
          drawArrow();
          x += 90;
        }
        drawCircle(value);
      });
      drawTail();
    }

    for (i = 0; i < 65; i += 5) {
      await sleep20ms();
      drawOriginToRight();
      ctx.beginPath();
      ctx.arc(50, 180 - i, 20, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,182,193, 0.3)";

      ctx.fill();
      ctx.fillStyle = "black";
      ctx.fillText(value, 50, 180 - i);

      ctx.beginPath();
      ctx.moveTo(70, 180 - i);
      ctx.lineTo(120, 180 - i);
      ctx.moveTo(110, 170 - i);
      ctx.lineTo(120, 180 - i);
      ctx.moveTo(110, 190 - i);
      ctx.lineTo(120, 180 - i);
      ctx.stroke();
    }
  }

  await sleep20ms();
  valueArr.splice(0, 0, value);
  draw();
  document.getElementById("value").value = "";
}

//tail에 원소 추가
async function insertTail() {
  var value = document.getElementById("value").value;
  var index = valueArr.length;

  if (valueArr.length != 0) {
    for (i = 0; i < 65; i += 5) {
      await sleep20ms();
      draw();
      ctx.beginPath();
      ctx.arc(50 + index * 90, 180 - i, 20, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,182,193, 0.3)";

      ctx.fill();
      ctx.fillStyle = "black";
      ctx.fillText(value, 50 + index * 90, 180 - i);

      ctx.beginPath();
      ctx.moveTo((index - 1) * 90 + 70, 180 - i);
      ctx.lineTo((index - 1) * 90 + 120, 180 - i);
      ctx.moveTo((index - 1) * 90 + 110, 170 - i);
      ctx.lineTo((index - 1) * 90 + 120, 180 - i);
      ctx.moveTo((index - 1) * 90 + 110, 190 - i);
      ctx.lineTo((index - 1) * 90 + 120, 180 - i);
      ctx.stroke();
    }
  }
  await sleep20ms();
  valueArr.push(value);
  draw();
  document.getElementById("value").value = "";
}

function drawInsertStep1(index) {
  const leftArr = valueArr.slice(0, index);
  const rightArr = valueArr.slice(Number(index));
  console.log(`leftArr: ${leftArr},rightArr:${rightArr}`);

  ctx.clearRect(0, 0, 1000, 1000);
  x = 50;
  drawHead();
  leftArr.map((value, idx) => {
    if (idx !== 0) {
      drawArrow();
      x += 90;
    }
    drawCircle(value);
  });

  drawArrow();
  x += 180;
  rightArr.map((value, idx) => {
    if (idx !== 0) {
      drawArrow();
      x += 90;
    }
    drawCircle(value);
  });

  drawTail();
}

async function insert() {
  var index = document.getElementById("index").value;
  var value = document.getElementById("value").value;

  if (valueArr.length === 0) {
    valueArr.splice(index, 0, value);
    draw();
  } else if (index == 0) {
    insertHead();
  } else if (index == valueArr.length) {
    insertTail();
  } else {
    const leftArr = valueArr.slice(0, index);
    const rightArr = valueArr.slice(Number(index));

    for (i = 0; i < 95; i += 5) {
      await sleep20ms();
      ctx.clearRect(0, 0, 1000, 1000);
      x = 50;

      drawHead();
      leftArr.map((value, idx) => {
        if (idx !== 0) {
          drawArrow();
          x += 90;
        }
        drawCircle(value);
      });

      drawArrow();
      x += 90;
      x += i;
      rightArr.map((value, idx) => {
        if (idx !== 0) {
          drawArrow();
          x += 90;
        }
        drawCircle(value);
      });
      drawTail();
    }

    for (i = 0; i < 65; i += 5) {
      await sleep20ms();
      drawInsertStep1(index);
      ctx.beginPath();
      ctx.arc(50 + index * 90, 180 - i, 20, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,182,193, 0.3)";

      ctx.fill();
      ctx.fillStyle = "black";
      ctx.fillText(value, 50 + index * 90, 180 - i);

      ctx.beginPath();
      ctx.moveTo(index * 90 + 70, 180 - i);
      ctx.lineTo(index * 90 + 120, 180 - i);
      ctx.moveTo(index * 90 + 110, 170 - i);
      ctx.lineTo(index * 90 + 120, 180 - i);
      ctx.moveTo(index * 90 + 110, 190 - i);
      ctx.lineTo(index * 90 + 120, 180 - i);
      ctx.stroke();
    }
    await sleep500ms();
    valueArr.splice(index, 0, value);
    draw();
  }

  document.getElementById("index").value = "";
  document.getElementById("value").value = "";
}

async function remove() {
  var value = document.getElementById("value").value;
  var index = valueArr.indexOf(value);

  if (index !== -1) {
    for (i = 0; i <= index; i++) {
      await sleep500ms();
      draw();
      if (i == index) {
        fillCircle(i, value);
      } else {
        fillCircle(i, "");
      }
    }

    await sleep500ms();
    valueArr.splice(index, 1);

    const leftArr = valueArr.slice(0, index);
    const rightArr = valueArr.slice(Number(index));

    if (valueArr.length === 0) {
      window.alert("리스트가 비어있습니다.");
    } else {
      if (index == 0) {
        for (i = 0; i < 65; i += 5) {
          await sleep20ms();
          drawOriginToRight();

          console.log(index * 90 + 50);
          ctx.beginPath();
          ctx.arc(50, 120 + i, 20, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = "rgba(255,182,193, 0.3)";
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.fillText(value, 50, 120 + i);

          ctx.moveTo(70, 120 + i);
          ctx.lineTo(120, 120 + i);
          ctx.moveTo(110, 110 + i);
          ctx.lineTo(120, 120 + i);
          ctx.moveTo(110, 130 + i);
          ctx.lineTo(120, 120 + i);
          ctx.stroke();
        }
        await sleep20ms();
        drawOriginToRight();

        for (i = 0; i < 95; i += 5) {
          await sleep20ms();
          ctx.clearRect(0, 0, 1000, 1000);
          x = 140;
          x -= i;
          drawHead();
          valueArr.map((value, idx) => {
            if (idx !== 0) {
              drawArrow();
              x += 90;
            }
            drawCircle(value);
          });
          drawTail();
        }
      } else if (index == valueArr.length) {
        for (i = 0; i < 65; i += 5) {
          await sleep20ms();
          draw();
          ctx.beginPath();
          ctx.arc(50 + index * 90, 120 + i, 20, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = "rgba(255,182,193, 0.3)";

          ctx.fill();
          ctx.fillStyle = "black";
          ctx.fillText(value, 50 + index * 90, 120 + i);

          ctx.beginPath();
          ctx.moveTo((index - 1) * 90 + 70, 120 + i);
          ctx.lineTo((index - 1) * 90 + 120, 120 + i);
          ctx.moveTo((index - 1) * 90 + 110, 110 + i);
          ctx.lineTo((index - 1) * 90 + 120, 120 + i);
          ctx.moveTo((index - 1) * 90 + 110, 130 + i);
          ctx.lineTo((index - 1) * 90 + 120, 120 + i);
          ctx.stroke();
        }
        await sleep20ms();
        draw();
      } else {
        for (i = 0; i < 65; i += 5) {
          await sleep20ms();
          drawInsertStep1(index);

          console.log(index * 90 + 50);
          ctx.beginPath();
          ctx.arc(50 + index * 90, 120 + i, 20, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.fillStyle = "rgba(255,182,193, 0.3)";
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.fillText(value, 50 + index * 90, 120 + i);

          ctx.moveTo(index * 90 + 70, 120 + i);
          ctx.lineTo(index * 90 + 120, 120 + i);
          ctx.moveTo(index * 90 + 110, 110 + i);
          ctx.lineTo(index * 90 + 120, 120 + i);
          ctx.moveTo(index * 90 + 110, 130 + i);
          ctx.lineTo(index * 90 + 120, 120 + i);
          ctx.stroke();
        }

        drawInsertStep1(index);

        for (i = 0; i < 95; i += 5) {
          await sleep20ms();
          ctx.clearRect(0, 0, 1000, 1000);
          x = 50;

          drawHead();
          leftArr.map((value, idx) => {
            if (idx !== 0) {
              drawArrow();
              x += 90;
            }
            drawCircle(value);
          });

          drawArrow();
          x += 180;
          x -= i;
          rightArr.map((value, idx) => {
            if (idx !== 0) {
              drawArrow();
              x += 90;
            }
            drawCircle(value);
          });
          drawTail();
        }
      }
    }
  } else {
    for (i = 0; i <= valueArr.length; i++) {
      await sleep500ms();
      draw();
      fillCircle(i, "");
    }
    draw();
    window.alert("노드를 찾지 못했습니다.");
  }

  document.getElementById("value").value = "";
}

async function search() {
  var value = document.getElementById("value").value;
  var index = valueArr.indexOf(value);

  console.log(`inSearch: ${index}`);

  if (index !== -1) {
    for (i = 0; i <= index; i++) {
      await sleep500ms();
      draw();
      if (i == index) {
        fillCircle(i, value);
      } else {
        fillCircle(i, "");
      }
    }
  } else {
    for (i = 0; i <= valueArr.length; i++) {
      await sleep500ms();
      draw();
      fillCircle(i, "");
    }
    draw();
  }

  document.getElementById("value").value = "";
}
