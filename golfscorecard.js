let elem = [];

for(let x = 1; x<=18; x++) {
  let str = x.toString();
  elem[x] = document.getElementById(str);
  elem[x].children[4].children[0].onclick = function(){add1(elem[x]);};
  elem[x].children[4].children[1].onclick = function(){sub1(elem[x]);};
  elem[x].children[4].children[2].onclick = function(){c1(elem[x]);};
}

let initialTotal = 0
for(var i=1;i<elem.length;i++){
        if(Number.parseInt(elem[i].children[1].innerHTML)){
          initialTotal += Number.parseInt(elem[i].children[1].innerHTML);
        }
}
document.getElementById("totals").children[1].innerHTML = initialTotal.toString();
document.getElementById("totals").children[2].innerHTML = 0;
document.getElementById("totals").children[3].innerHTML = 0;

function findTotal(){
    let total = 0;
    for(var i=1;i<elem.length;i++){
        if(Number.parseInt(elem[i].children[2].innerHTML)){
          total += Number.parseInt(elem[i].children[2].innerHTML);
        }
    }
    document.getElementById("totals").children[2].innerHTML = total.toString();
}

function findOver(){
    let total = 0;
    for(var i=1;i<elem.length;i++){
        if(Number.parseInt(elem[i].children[3].innerHTML)){
          total += Number.parseInt(elem[i].children[3].innerHTML);
        }
    }
    document.getElementById("totals").children[3].innerHTML = total.toString();
}

// create an "add1" function
function add1 (elem) {
  
  if(elem.children[2].innerHTML == "-") 
    elem.children[2].innerHTML = "1";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore + 1;
  }
  if(elem.children[2].innerHTML == "-")
    elem.children[3].innerHTML = "-";
  else {
    let currentScore = elem.children[2].innerHTML;
    let par = elem.children[1].innerHTML;
    currentScore = Number.parseInt(currentScore);
    par = Number.parseInt(par);
    elem.children[3].innerHTML = currentScore - par;
  }
  
  findTotal();
  findOver();
}
// create a "sub1" function
function sub1 (elem) {
  if(elem.children[2].innerHTML == "1"||elem.children[2].innerHTML == "-") 
    elem.children[2].innerHTML = "-";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore - 1;
  }
  if(elem.children[2].innerHTML == "-")
    elem.children[3].innerHTML = "-";
  else {
    let currentScore = elem.children[2].innerHTML;
    let par = elem.children[1].innerHTML;
    currentScore = Number.parseInt(currentScore);
    par = Number.parseInt(par);
    elem.children[3].innerHTML = currentScore - par;
  }
  
  findTotal();
  findOver();
}
//clear function
function c1 (elem) {
  elem.children[2].innerHTML = "-";
  elem.children[3].innerHTML = "-";
  findTotal();
  findOver();
}
