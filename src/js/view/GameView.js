//constains utilities that interact directly with the UI
import UIResources from './GeneralResource';

const stringResources=UIResources.stringResources;

export const clearBoard= ()=>{
    const dummyArray = new Array(36).fill(0) ;
    dummyArray.forEach((elem, index)=>{
        const cellStyles=[stringResources.humanSelect,
            stringResources.computerSelect, stringResources.wrongSelect];
        cellStyles.forEach((cellStyle)=>{
            UIResources.selectSquare(index+1).classList.remove(cellStyle);
        });
    });
}

//updates the stage score section
export const updateStageScore= (state)=>{
    let score = state.currentStageScore;
    if(score==0){
        [1,2,3,4,5].forEach((num)=>{
            UIResources.selectBall(num).classList.remove(stringResources.attainedBall);
            UIResources.selectBall(num).classList.remove(stringResources.blinking);
            UIResources.selectBall(num).classList.add(stringResources.unattainedBall);
        });
        UIResources.stageScore.innerText =`0/5`;
        UIResources.water.style.height='0%';
        return;
    }

    const dummyArray = new Array(score).fill(0);
    dummyArray.forEach((value, index)=>{
        UIResources.selectBall(index+1).classList.remove(stringResources.unattainedBall);
        UIResources.selectBall(index+1).classList.add(stringResources.attainedBall);
    });
    
    //increment score 
    UIResources.stageScore.innerText = `${score++}/5`;
}


export const selectBox= (allBoxes, boxIndex, selectionType)=>{
    const boxNumber = allBoxes[boxIndex]; 
    UIResources.selectSquare(boxNumber).classList.add(selectionType);
    if(selectionType == stringResources.humanSelect) return;
    setTimeout(()=>{
        UIResources.selectSquare(boxNumber).classList.remove(selectionType);
    },600);
}

export const updateSubstage= (state)=>{
    //update the based on currentStageScore attribute

    //get the value in percentage how much the substage score is
    let stagePercent = state.currentStageScore * 100/5 ;

    //set the percentage of water
    UIResources.water.style.height= `${stagePercent}%`;

    UIResources.stageScore.innerText = `${state.currentStageScore}/5`;
    if(state.currentStageScore == 0){
        UIResources.selectBall(state.currentStageScore +1).classList.remove(stringResources.unattainedBall);
        UIResources.selectBall(state.currentStageScore +1).classList.add(stringResources.blinking);
        return;
    }
    UIResources.selectBall(state.currentStageScore ).classList.remove(stringResources.unattainedBall);
    UIResources.selectBall(state.currentStageScore).classList.remove(stringResources.blinking);
    UIResources.selectBall(state.currentStageScore ).classList.add(stringResources.attainedBall);
    UIResources.selectBall(state.currentStageScore+1).classList.add(stringResources.blinking);
}

//update level
export const updateLevel= (state)=>{
    UIResources.bubbles.style.display = "none";
    UIResources.score.innerText= state.level;
    UIResources.score.style.display = "inline";
}

//update live 
export const updateLive= (state)=>{
    UIResources.liveValue.innerText = state.live;
}

//animates the refresh button 6
export const animateRefresh= ()=>{
    //some code here
    UIResources.restartButton.classList.add("refreshAnim");
    setTimeout(()=>{
        UIResources.restartButton.classList.remove("refreshAnim");
    },1200);
}

export const animateStart= ()=>{
    //some code here
    console.log("called to animate start");
    document.querySelector("body").insertAdjacentHTML("beforeend" , `
    <div class="anim__shade" id="shade">
        <div class="left__shade"></div>
        <div class="right__shade"></div>
    </div>
    `);

    //remove animation frame from dom
    setTimeout(()=>{
        const shade = document.getElementById("shade") ; 
        shade.parentElement.removeChild(shade);
    }, 1900);

   
}

export const animateWrong= ()=>{
    //shake the game board and show red for the selection
    UIResources.board.classList.add('missed_chance') ;
    setTimeout(()=> {
        UIResources.board.classList.remove('missed_chance');
    },2500)
}

export const showInfo= ()=>{
    //some code here
   UIResources.instruct.classList.remove('kill__instruct') ; 
   UIResources.instruct.classList.add('live__instruct') ;
}

export const closeInfo = () => {
    UIResources.instruct.classList.remove('live__instruct');
    UIResources.instruct.classList.add('kill__instruct');
}

export const animateNewLevel = () => {
    UIResources.water.style.height='100%';
    UIResources.score.style.display= "none";
    UIResources.bubbles.style.display= "inline";
    setTimeout(() => {
        UIResources.bubbles.style.display ="none";
    },1400);
   
}

export const showSettings= ()=>{
    //some code here
}

export const showGameOver= ()=>{
    UIResources.game_over_frame.classList.remove('kill__instruct');
    UIResources.game_over_frame.classList.add('live__instruct');
}

export const removeGameOver =() => {
    UIResources.game_over_frame.classList.remove('live__instruct') ;
    UIResources.game_over_frame.classList.add('kill__instruct')
}

