const offset=2000;
let cidRandomInt = parseInt(Math.random() * 1000 + offset);
const CID=cidRandomInt;
const NAME="삽입정렬"

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
