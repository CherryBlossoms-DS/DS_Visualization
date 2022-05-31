google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  (async function(){
    let url='your analytics query url'
    //세션 수로 탐색, 로드 한번당 세션 +1?
    const res=await fetch(url);
    const arr=(await res.json())['rows'];
    let tmp=[];
    let prev;
    for(let i=0;i<arr.length;i++){
      if(prev==arr[i][0]){
        tmp[tmp.length-1][1]+=parseInt(arr[i][2]);
      }
      else {
          prev=arr[i][0];
          tmp.push([arr[i][0],parseInt(arr[i][2])]);
      }
    }
    console.log(tmp);
    chartData=[["자료구조","방문자 수"]].concat(tmp);

    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
      chart: {
        title: '',
        subtitle: '',
      }
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  })();


}
