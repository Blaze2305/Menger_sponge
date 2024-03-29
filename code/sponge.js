let cube;
let child=[];
let angle=0;
let button;

function setup(){
  createCanvas(1000,1000,WEBGL);
  cube=new sponge(0,0,0,500);
  child.push(cube);
  button=createButton("PRESS TO ITERATE")
  button.mousePressed(next);
}


function draw(){
  background(0);
  rotateX(PI/3)
  rotateZ(angle);

  for(let i=0;i<child.length;i++){
    child[i].show();
  }
  // cube.show()
  // child=cube.generate();
  // for(let i =0;i<child.length;i++){
  //   child[i].show();
  // }
  angle+=0.01;
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
    let unwanted=[[1,0,0],
                  [0,1,0],
                  [0,0,1],
                  [-1,0,0],
                  [0,-1,0],
                  [0,0,-1],
                  [0,0,0]]
    let a=[];
    let x=[1,0,-1];
    let y=[1,0,-1];
    let z=[1,0,-1];
    for(let i of x){
      for(let j of y){
        for(let k of z){
          a=[i,j,k];
          if(check(unwanted,a)){
            children.push(new sponge(this.x+child_size*i,this.y+child_size*j,this.z+child_size*k,child_size-1));
          }
        }
      }
    }
    return(children);
    }
}


function check(a,b){
  let i,j;
  let flag=0;
  let counter;
  for(i=0;i<a.length;i++){
    counter=0;
    for(j=0;j<a[i].length;j++){
      if(a[i][j]==b[j]){
        counter+=1;
      }
      if(counter==3){
        flag=1;
        break;
      }
    }
  }
  if(flag==0){
    return(true);
  }
  else{
    return(false);
  }
}

function next(){
  let n=[];
  for(let k=0;k<child.length;k++){
    let c=child[k];
    let new_children=c.generate();
    n=n.concat(new_children);
  }
  child=n;
}
