let cube;
let child=[];

function setup(){
  createCanvas(600,600,WEBGL);
  cube=new sponge(0,0,0,300);
}


function draw(){
  background(0);
  rotateX(PI/3)
  // cube.show();
  child=cube.generate();
  for(let i =0;i<child.length;i++){
    child[i].show();
  }
}

class sponge{
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
  }

  show(){
    push();
    stroke(255)
    fill(80)
    translate(this.x,this.y,this.z);
    box(this.size);
    pop();
  }

  generate(){
    let children=[];
    let child_size=this.size/3;
    let x=[1,0,-1];
    let y=[1,0,-1];
    let z=[1,0,-1];
    for(let i of x){
      for(let j of y){
        for(let k of z){
          children.push(new sponge(child_size*i,child_size*j,child_size*k,child_size-5));
        }
      }
    }
    return(children);
    }
}
