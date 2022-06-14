google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  (async function(){
    //이벤트 카테고리에 자료구조 이름, 이벤트 라벨에 위치값이 들어가 있는 애널리틱스 정보 url
    let url='your analytics query url'
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
          tmp.push([arr[i][0],parseInt(arr[i][2]),'#EFBED9']);
      }
    }
    chartData=[["자료구조","방문자 수",{ role: 'style' }]].concat(tmp);
    var data = google.visualization.arrayToDataTable(chartData);
    var options = {
      chartArea: {
        width: '90%',
        height:'80%'
      },
      backgroundColor: 'none',
      legend: 'none',
      vAxis: {
        baselineColor: 'white',
        gridlineColor: 'white',
        textStyle:{color: 'white'}
      },
      hAxis: {
        baselineColor: 'white',
        gridlineColor: 'white',
        textStyle:{color: 'white'}
      },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_material'));

    chart.draw(data, options);
  })();


}
