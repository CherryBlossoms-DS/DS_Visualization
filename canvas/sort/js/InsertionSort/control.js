const TERM=800;
class controler{
  /*
  @param{HtmlElement} arrText 배열을 입력받을 text feild
  @param{HtmlElement} makeBtn 배열을 제작 버튼
  @param{HtmlElement} sortBtn 정렬 버튼
  */
  constructor(canvas,arrText,makeBtn,sortBtn){

    this.arrText=arrText;

    this.makeBtn=makeBtn;

    this.sortBtn=sortBtn;

    this.zoomRate=1;

    this.arr=[];

    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    this.ctx.translate(100,50);
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
    this.canvas.addEventListener('mousemove',(e)=>{this.mouseMove(e)});
    this.canvas.addEventListener('mouseup',(e)=>{this.mouseUp(e)});
    this.canvas.addEventListener('mousedown',(e)=>{this.mouseDown(e)});
    this.canvas.addEventListener('wheel',(e)=>{this.wheel(e)});
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
    if(this.isrunning) return;
    let text=this.arrText.value;
    let tmpArr=this.sToArr(text);
    this.arr=new array(this.canvas,tmpArr);
    this.arr.zoom(this.zoomRate);
    this.arr.draw();
  }

  /*
  배열을 정렬함
  */
  sort(){
    if(this.isrunning) return;
    this.isrunning=true;
    let cnt=0;
    let arr=this.arr;


    let n=arr.length();
    for(let i=1;i<n;i++){
      for(let j=i;j>0;j--){
        setTimeout(()=>{arr.select(j)},TERM*cnt);
        setTimeout(()=>{arr.select(j-1);},TERM*cnt);
        cnt++;
        if(arr.at(j-1)>arr.at(j)){
          arr.swapNum(j-1,j);
          setTimeout(()=>{arr.swap(j-1,j,TERM/2);},TERM*cnt);
          cnt++;
          setTimeout(()=>{arr.select(j,'none')},TERM*cnt);
          setTimeout(()=>{arr.select(j-1,'none')},TERM*cnt);
        }
        else{
          cnt++;
          setTimeout(()=>{arr.select(j,'none')},TERM*cnt);
          setTimeout(()=>{arr.select(j-1,'none')},TERM*cnt);
          break;
        }
      }
    }
    cnt++;
    for(let i=0;i<n;i++){
      setTimeout(()=>{arr.select(i,'none')},TERM*cnt);
    }

    setTimeout(()=>{this.isrunning=false;},TERM*cnt);
  }

  mouseDown(e){
    this.clicking=true;
    this.mouseX=e.clientX;
    this.mouseY=e.clientY;

  }

  mouseUp(e){
    this.clicking=false;
  }

  mouseMove(e){
    if(this.clicking){
      this.ctx.translate(e.clientX-this.mouseX,e.clientY-this.mouseY)
      this.mouseX=e.clientX;
      this.mouseY=e.clientY;
      this.arr.draw();
    }
  }

  wheel(e){
    if(this.isrunning) return;
    if(e.wheelDelta<0){
      this.arr.zoom(0.9);
      this.zoomRate*=0.9;
    }
    else{
      this.arr.zoom(1.1);
      this.zoomRate*=1.1;
    }
    this.arr.draw();
  }


}



function init(){
  let arrText=document.getElementById("arrText");
  let makeBtn=document.getElementById("makeBtn");
  let sortBtn=document.getElementById("sortBtn");
  let canvas=document.getElementById("canvas");

  let tmp = new controler(canvas,arrText,makeBtn,sortBtn);

  tmp.init();

}

init();
