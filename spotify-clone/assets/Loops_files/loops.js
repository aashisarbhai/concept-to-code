for(let i=1;i<=5;i++){
    console.log(i);
}

for(let i=10;i>=1;i=i-3){
    console.log(i);
}

for(let i=1;i<=15;i=i+2){
    console.log(i);
}

for(let i=1;i<=10;i++){
    if(i%2==0){
        console.log(i);
    }
}

for(let i=1;i<=10;i++){
    console.log(`5 * ${i} = ${i*5}`);
}

for(let i=1;i<=10;i++){
    console.log(`3 x ${i} = ${i*3}`)
}

let n=prompt("write your number");
for(let i=1;i<=10;i++){
    console.log(`${n} x ${i} = ${n*i}`);
}

for(let i=1;i<=3;i++){
    console.log(`outer loop ${i}`)
    for(let j=1;j<=3;j++){
        console.log(j);
    }
}

let i=1;
while(i<=5){
    console.log(i);
    i++;
}

let j=0;
while(j<=20){
    console.log(j);
    j=j+2;
}

let favMovie="avatar";
let guess=prompt("Guess my favourite movie");
while(guess!=favMovie){
    if(guess=="quit"){
        console.log("quit")
        break;
    }
    guess=prompt("Wrong guess.Please try again");
}
if(guess==favMovie){
    console.log("You guessed it");
}

let k=1;
while(k<=5){
    if(k==3){
        break;
    }
    console.log(k);
    k++;
}

let fruits=["apple","banana","mango"];
fruits.push("pineapple")
for(let i=fruits.length-1;i>=0;i--){
    console.log(i, fruits[i]);
}

let heroes= [["ironman","spiderman","thor"],["superman","wonder woman","flash"]];
for(let i=0;i<heroes.length;i++){
    console.log("List #",i);
    for(let j=0;j<heroes[i].length;j++){
        console.log(j,heroes[i][j]);
    }
}

