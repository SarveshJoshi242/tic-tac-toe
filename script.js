let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//playerX,playerO
let turnO = true;
//For draw Condition
let count = 0;

//Win Pattern Analysed
let winpatterns=[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8], [2,4,6]
];  

//For Reseting Game In Between
const resetgame=()=>{
    turnO = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
};

//Event Handling For Boxes
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){                  //player O
            box.innerText = "O";
            //for Different Colors of X and O
            box.style.color="#4ECDC4";
            turnO = false;
        }
        else{                       //player X
            box.innerText = "X";
            box.style.color="#1E3D59";
            turnO = true;
        }
        //To stop the changing of value everytime we click
        box.disabled = true; 
        count++;
        
        //Calling Winner
        let iswinner = seewinner();

        //game draw condition
        if(count == 9 && !iswinner){
            gamedraw();
        }
    });
});

//Game Draw Function
const gamedraw=()=>{
    msg.innerText = `Game was a Draw`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

//Button Disable Function
const disableboxes=()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

//Button Enable Function
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

//Displaying Winner
const showwinner=(winner)=>{
    msg.innerText = `Congratulations Winner is , ${winner}`;  
    msgcontainer.classList.remove("hide");
    disableboxes();
};

//Seeing Winner
const seewinner=()=>{
    //check all the patterns 
    for(let pattern of winpatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showwinner(pos1Val);
                return true  // for game draw condition  
            }
        }
    }
};
newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
