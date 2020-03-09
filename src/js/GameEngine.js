import UIResources from './view/GeneralResource';
import * as GameView from './view/GameView';

const state ={} ;


const stringResources = UIResources.stringResources


class Board {
    constructor(){
        this.currentSelections=[];
        this.nextIndex = 0;
    }

    generateNextTask(){
        //select the cells based on the entry 
        this.currentSelections = state.pattern;
        this.nextIndex = 0;
        const res = (boxIndex)=>{
            return function(resolve, reject){
               setTimeout(()=>resolve(boxIndex),800);
            }
        }
        
        // create an array of callbacks for each square selection
        const dummyArray = new Array(this.currentSelections.length).fill(0);
        const callbacks =[];
        dummyArray.forEach((_,index)=>{
            const self = this;
            callbacks.push(function(boxIndex){
                // highlight the given square 
                GameView.selectBox(self.currentSelections, boxIndex, stringResources.computerSelect);

                //return a promise for further processing
                return new Promise(res(boxIndex+1));
            });
        })

        callbacks.reduce((prom, callback)=> prom.then(callback), new Promise(res(0)));
        if(!this.clickListenerActive){
            this.listenForClicks();
        }  
    }

    listenForClicks(){
        const cells =document.querySelectorAll('div[class|="cell"]') ;
        cells.forEach((cell, index)=>{
            cell.addEventListener('click', ()=> {
                this.verifyCorrectness(Number(cell.className.split("-").pop()));
            });
        }) 
 
        this.clickListenerActive = true ;
    }

    removeEventListeners() {
        const cells = document.querySelectorAll('div[class|="cell"]') ; 
        cells.forEach(cells => {
            cell.removeEventListener('click')
        })
    }

    verifyCorrectness(selection){
        console.log("verify was called" )
        //if this is the last of the selections, make necessary updates
        const isCorrect =selection == this.currentSelections[this.nextIndex];
        console.log(`The current selections are ${this.currentSelections} and the index is ${this.nextIndex}`)
        console.log(`human selected: ${selection} and computer selected ${this.currentSelections[this.nextIndex]}`);
        if(isCorrect){
            console.log("Correct");
            console.log("\n\n");
            console.log(this.currentSelections[0] +"\n" + this.nextIndex);
            GameView.selectBox(this.currentSelections, this.nextIndex, stringResources.humanSelect);
            if(this.nextIndex <= this.currentSelections.length- 1){
                this.nextIndex++;
            }
            if(this.nextIndex > this.currentSelections.length-1){
                GameView.clearBoard();
                state.currentStageScore++;
                this.nextIndex= 0 ;
                //indicate that pattern is correct
                if(state.currentStageScore>=5){
                    //update the game for a new stage
                    GameView.animateNewLevel();
                    setTimeout(()=> {
                        state.currentStageScore = 0;
                        state.level++;
                        GameView.updateStageScore(state);
                        GameView.updateLevel(state);
                        attachEventToNextBall();
                    }, 1500);
                    
                    // GameView.animateStart();
                    
                    return;
                }
                
                GameView.updateSubstage(state);
                attachEventToNextBall();

                // //if the pattern is the last for current stage, update Game for next stage
                // if(state.currentStageScore >5){
                //     startNextLevel();
                // }
                console.log(this.nextIndex);
            }
        }
        else{
            //indicate error and reduce brain cells by 1

            console.log("Wrong choice");
            console.log("/n/n");
            GameView.animateWrong();
            state.live--;
            GameView.updateLive(state);

            //animate game over on live equal zero 
            if(state.live <= 0){
                GameView.showGameOver();
            } 

        }
        
    }
}

const initGame = ()=>{
    state.currentStageScore = 0;
    state.live =5;
    state.level=1;
    state.pattern = [];
    //clear board 
    GameView.clearBoard();

    //update the current stage score
    GameView.updateStageScore(state);
    
    //set level and brain cells to zero
    GameView.updateLevel(state);
    GameView.updateLive(state);
}

// const startNextLevel= ()=>{
//     // increment and update level
//     GameView.animateStart();
//     state.level++;
//     GameView.updateLevel(state);
//     board.generateNextTask([2,7,9]);
//     board.listenForClicks();
// }


const attachEventToNextBall = ()=>{
    GameView.updateSubstage(state);
    if(state.currentStageScore !== 0){
        UIResources.selectBall(state.currentStageScore).removeEventListener("click", nextTask);
    }
    UIResources.selectBall(state.currentStageScore + 1).addEventListener("click", nextTask);
}

//generate the next task 
const nextTask = ()=>{
    
    randomPatternGenerator();
    board.generateNextTask();
}

//generates random pattern base on the currrent level
const randomPatternGenerator= ()=>{
    let dummyPattern = new Array(36).fill(0) ; 
    dummyPattern = dummyPattern.map((_, index)=> index+1);
    //shuffles the serial 1-36 value
    const shuffleDummy = (pattern)=>{
        pattern.forEach((elem, index, array)=>{
            // randomly choose a number to replace with that in the current index
            const randChoice = Math.ceil(Math.random()*36);
            const randChoiceIndex = array.indexOf(randChoice);

            array[randChoiceIndex] =elem;
            array[index] = randChoice;
        });

        return pattern.slice(0,state.level + 1);
    }
    state.pattern = shuffleDummy(dummyPattern);
}

const refresh= ()=>{
    initGame();
    GameView.animateRefresh();
}


const board = new Board();
initGame();
UIResources.playButton.addEventListener("click", ()=>{
    GameView.animateStart();
    attachEventToNextBall();
    // UIResources.playButton.style.color= "black";
    // UIResources.playButton.removeEventListener("click", nextTask);
    // document.querySelector(".pseudo__detail i:nth-child(1):hover").style.color="black !important";
});
UIResources.restartButton.addEventListener("click",refresh);
UIResources.infoButton.addEventListener("click",GameView.showInfo);
UIResources.settingsButton.addEventListener("click",GameView.showSettings);
UIResources.instruct_btn.addEventListener('click', GameView.closeInfo);
UIResources.newGame_btn.addEventListener('click', ()=> {
    GameView.removeGameOver() ;
    initGame();
})