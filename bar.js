const DEFAULT_COLOR="red";

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

    this.fontSize=width-10;
  }

  /*
   현재 위치를 기준으로 바를 그림
  */
  draw(){
    //TODO: 비율에 따라 색 진한정도 달라지게
    this.ctx.fillStyle=this.color;
    //현재 위치에서 위쪽으로 그려짐
    this.ctx.fillRect(this.posx,this.posy,this.width,-this.size*this.rate);
    this.ctx.font=this.fontSize+"px Georgia";
    this.ctx.fillText(this.value,this.posx,this.posy+this.fontSize);
    //this.ctx.fillText(this.value,this.posx,this.posy+this.fontSize*2+30);
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

  zoom(rate){
    this.width*=rate;
    this.size*=rate;
    this.posx*=rate;
    this.fontSize*=rate;
  }

}
