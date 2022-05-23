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
