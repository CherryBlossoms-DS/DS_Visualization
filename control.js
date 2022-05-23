
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
