const max=prompt("Enter thw maxmimum number");
console.log(max);

const random=Math.floor(Math.random()*max)+1;
console.log(random);

let guess=prompt("Guess the number");
while(true){
    if(guess=="quit"){
        console.log("user quit");
        break;
    }

    else if(guess==random){
        console.log("you won");
        break;
    }

    else if(guess<random){
        guess=prompt("enter larger number");
    }

    else{
        guess=prompt("enter smaller number");
    }
}