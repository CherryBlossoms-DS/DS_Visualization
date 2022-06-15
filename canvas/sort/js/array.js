const BAR_WIDTH=30;
const OFFSET=5;
const BAR_MAX_SIZE=200;
const BAR_Y=200;
const COLOR={'select':'#B69DFF', 'fixed':'#F5B26C','none':'default'};

class array {
  constructor(canvas,arr) {
    let maxv=Math.max(...arr)

    this.ctx=canvas.getContext("2d");
    this.canvas=canvas;
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

  //캔버스 비우기
  clear(){
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.restore();
  }

  length(){
    return this.arr.length;
  }

  /*bar들을을 전부 캔버스에 그림*/
  draw(){
    this.clear();
    for(let i=0;i<this.arr.length;i++){
      this.arr[i].draw();
    }
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

  zoom(rate){
    for(let i=0;i<this.arr.length;i++){
      this.arr[i].zoom(rate);
    }
  }

}
