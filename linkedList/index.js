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

function drawCircle(value) {
  ctx.beginPath();
  ctx.arc(x, 120, 20, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.stroke();
  ctx.fillText(value, x, 120);
}

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

function fillCircle(index, target) {
  ctx.beginPath();
  ctx.arc(50 + index * 90, 120, 20, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,182,193, 0.3)";

  ctx.fill();
  ctx.fillText(target, 50 + index * 90, 120);
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

function draw() {
  x = 50;

  valueArr.map((value) => {
    if (valueArr.indexOf(value) !== 0) {
      drawArrow();
      x += 90;
    }
    drawCircle(value);
  });
}

function insert() {
  var value = document.getElementById("insert").value;
  valueArr.push(value);
  ctx.clearRect(0, 0, 1000, 1000);
  draw();
  document.getElementById("insert").value = "";
}

function remove() {
  var index = document.getElementById("delete").value;
  valueArr.splice(index, 1);
  ctx.clearRect(0, 0, 1000, 1000);
  draw();
  document.getElementById("delete").value = "";
}

function search() {
  var target = document.getElementById("search").value;
  var index = valueArr.indexOf(target);
  if (index !== -1) {
    fillCircle(index, target);
  }

  document.getElementById("search").value = "";
}
