function myMap(heatMapData) {
  var mapCanvas = document.getElementById("map");
  var myCenter = new google.maps.LatLng	(	35.77249458	,	127.2831603	);
  var mapOptions = {
  	center: myCenter,
    zoom: 7
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);


var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData,
  radius: 25
});
heatmap.setMap(map);



}

(async function(){
  let url='your analytics query url'
  //세션 수로 탐색, 로드 한번당 세션 +1?
  const res=await fetch(url);
  const arr=(await res.json())['rows'];
  let heatMapData=[];
  for(let i=0;i<arr.length;i++){
    let data=arr[i][1].split(",");
    data[0]=Number(data[0]);
    data[1]=Number(data[1]);
    if(!data[0]||!data[1]) continue;
    heatMapData.push(new google.maps.LatLng(data[0],data[1]));
  }
  myMap(heatMapData);
})();
