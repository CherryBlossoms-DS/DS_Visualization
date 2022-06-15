
let cidRandomInt = parseInt(Math.random() * 1000 + 1000);
console.log(cidRandomInt);

const CID=cidRandomInt;
const NAME="이진 탐색 트리"

function onGeoOk(position){
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  makePixel(lat,lng);
}
function onGeoError(){
  makePixel();
}

function makePixel(lat=null,lng=null){
  let img='http://www.google-analytics.com/collect?v=1&tid=UA-186810924-1&t=event&cid='+CID+'&&cs=page&ec='+NAME+'&el='+lat+","+lng;
  console.log(img);
  document.getElementById("tracking").src=img;

}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError );