
const DEFAULT_COLOR="red";
const DEFAULT_FONTSIZE=20;
const Y_OFFSET=10;

function sleep(ms){
  let start=Date.now(), now=start;
  while(now-start<ms){
    now=Date.now();
  }
}

class bar {
  /*
  @param ctx canvas에서 get content로 얻어낸 값
  @param{number} posx 막대 바가 위치할 x좌표
  @param{number} posy 막대 바가 위치항 y좌표
  @param{number} size 막대 바가 위치항 y좌표
  @param{number} width 막대 바의 가로 크기
  @param{number} value 막대 바의 값
  @param{number} size  막대 바의 사이즈
  */
  constructor(ctx,posx,posy,size,width,value,maxv) {

    this.ctx=ctx;

    this.color=DEFAULT_COLOR;

    this.posx=posx;

    this.posy=posy;

    this.size=size;

    this.width=width;

    this.value=value;

    this.rate=value/maxv;

    this.fontSize=DEFAULT_FONTSIZE;
  }

  /*
   현재 위치를 기준으로 바를 그림
  */
  draw(){
    //TODO: 비율에 따라 색 진한정도 달라지게
    this.ctx.fillStyle=this.color;
    //현재 위치에서 위쪽으로 그려짐
    this.ctx.fillRect(this.posx,this.posy+Y_OFFSET,this.width,-this.size*this.rate);
    this.ctx.font=this.fontSize+"px Georgia";
    this.ctx.fillText(this.value,this.posx,this.posy+this.fontSize+Y_OFFSET);
  }

  setColor(color){
    if(color=='default'){
      this.color=DEFAULT_COLOR;
    }
    else {
      this.color=color;
    }
  }

  setPos(posx,posy){
    this.posx=posx;
    this.posy=posy;
  }

  getPos(){
    return [this.posx,this.posy];
  }

  getValue(){
    return this.value;
  }
}

//===========================
const BAR_WIDTH=30;
const OFFSET=5;
const BAR_MAX_SIZE=200;
const BAR_Y=200;
const COLOR={'select':'lightblue', 'fixed':'orange','none':'default'};

class array {
  constructor(arr) {
    let maxv=Math.max(...arr)

    let canvas=document.getElementById("canvas");
    this.ctx=canvas.getContext("2d");
    this.width=canvas.width;
    this.height=canvas.height;

    this.numArr=arr;
    this.arr=[];
    for(let i=0;i<arr.length;i++){
      this.arr[i]=new bar(this.ctx,OFFSET+i*(BAR_WIDTH+OFFSET),BAR_Y,BAR_MAX_SIZE,BAR_WIDTH,
                          arr[i],maxv);
    }

    this.animation = new animationHelper(this);
  }

  length(){
    return this.arr.length;
  }

  /*bar들을을 전부 캔버스에 그림*/
  draw(){
    console.log(1);
    //캔버스 비우기
    this.ctx.clearRect(0,0,this.width,this.height);

    //TODO:배열 간단하게 추가 회의 후 수정
    let x=5
    this.ctx.fillStyle="gray";
    this.ctx.font=20+"px Georgia";
    this.ctx.fillText("[",x,300);
    for(let i=0;i<this.arr.length;i++){
      this.arr[i].draw();

      this.ctx.fillText(this.arr[i].getValue(),x+20*(i+1),300);
    }
    this.ctx.fillStyle="gray";
    this.ctx.fillText(']',x+20*(this.arr.length+1),300);

    //TODO: 아래 배열 그리기 수정
  }

  /*
  i번째 칸의 값 반환
  @param{number} i
  */
  at(i){
    return this.numArr[i];
  }

  /*
  i번째 칸과 j번째칸 값만 스왑
  @param{number} i
  @param{number} j
  */
  swapNum(i,j){
    [this.numArr[i],this.numArr[j]]=[this.numArr[j],this.numArr[i]];
  }


  /*
  i번째 칸과 j번째칸 bar 스왑
  @param{number} i
  @param{number} j
  @param{number} time 스왑이 얼마내의 시간에 일어나야 되는
  */
  swap(i,j,time){
    let posi=this.arr[i].getPos();
    let posj=this.arr[j].getPos();
    //값만 바꿀 수도 있지만 이후 특정 bar에 효과를 적용시킬경우를 대비해 바를 통채로 바꿈
    this.animation.move(this.arr[i],posj[0],posj[1],time);
    this.animation.move(this.arr[j],posi[0],posi[1],time);

    setTimeout(()=>{[this.arr[i],this.arr[j]]=[this.arr[j],this.arr[i]]},time+5);

    this.draw();
  }

  /*
  i를 특정방식으로 선택했다고 표시
  @param{number} i
  */
  select(i,color='select'){
    this.arr[i].setColor(COLOR[color]);
    this.draw();
  }

}

//=================
const TERM=5;
class animationHelper {
  constructor(drawObj){
    this.drawObj=drawObj;
  }

  move(obj,toX,toY,time){
    let nowPos=obj.getPos();
    let step=parseInt(time/TERM);
    let speedX=(toX-nowPos[0])/step;
    let speedY=(toY-nowPos[1])/step;

    for(let i=1;i<step;i++){
      setTimeout(()=>{obj.setPos(nowPos[0]+speedX*i,nowPos[1]+speedY*i);this.drawObj.draw()},TERM*i);
    }
    setTimeout(()=>{obj.setPos(toX,toY);this.drawObj.draw()},time);

  }
}


//==============================

function init(){
  let arrText=document.getElementById("arrText");
  let makeBtn=document.getElementById("makeBtn");
  let sortBtn=document.getElementById("sortBtn");

  let tmp = new controler(arrText,makeBtn,sortBtn);

  tmp.init();

}

class controler{
  /*
  @param{HtmlElement} arrText 배열을 입력받을 text feild
  @param{HtmlElement} makeBtn 배열을 제작 버튼
  @param{HtmlElement} sortBtn 정렬 버튼
  */
  constructor(arrText,makeBtn,sortBtn){

    this.arrText=arrText;

    this.makeBtn=makeBtn;

    this.sortBtn=sortBtn;

    this.arr=[];

  }

  init(){

    this.setArray();

    this.arr.draw();
    this.registerEventListener();
  }


  /*
  이벤트 리스너 등록
  */
  registerEventListener(){
    this.makeBtn.addEventListener('click',()=>{this.setArray()});
    this.sortBtn.addEventListener('click',()=>{this.sort()});
  }

  /*
  str을 배열로 변환
  @param{string} str 변환할 문자열
  @return{Array}
  */
  sToArr(str){
    let tmp=str.split(',');
    return tmp.map(x=>parseInt(x));
  }

  /*
  arrText에 입력되어 있는 값으로 배열 세팅
  */
  setArray(){
    let text=this.arrText.value;
    let tmpArr=this.sToArr(text);
    this.arr=new array(tmpArr);
    this.arr.draw();
  }

  /*
  배열을 정렬함
  */
  sort(){
    //TODO:정렬시 버튼 disable
    const TERM=800;
    let cnt=0;
    let arr=this.arr;


    let n=arr.length();
    for(let i=0;i<n;i++){
      for(let j=n-1;j>i;j--){
        setTimeout(()=>{arr.select(j-1)},TERM*cnt);
        setTimeout(()=>{arr.select(j)},TERM*cnt);
        cnt++;
        if(arr.at(j-1)>arr.at(j)){
          arr.swapNum(j-1,j);
          setTimeout(()=>{arr.swap(j-1,j,TERM/2);},TERM*cnt);
          cnt++;
        }
        setTimeout(()=>{arr.select(j-1,'none')},TERM*cnt);
        setTimeout(()=>{arr.select(j,'none')},TERM*cnt);
      }
      setTimeout(()=>{arr.select(i,'fixed')},TERM*cnt);
    }
    cnt++;
    for(let i=0;i<n;i++){
      setTimeout(()=>{arr.select(i,'none')},TERM*cnt);
    }
  }
}

init();
