/**
 * Exposes General UI resources to other modules
 */

export default {
    playButton: document.getElementById("play_icon"),
    restartButton: document.getElementById("restart_icon"),
    settingsButton: document.getElementById("settings_icon"),
    infoButton: document.getElementById("info_icon"),
    liveValue: document.getElementById("live_value"), 
    levelValue: document.getElementById("level_value"),
    stageScore: document.getElementById("stage_score"),
    board: document.querySelector('.board'),
    instruct: document.getElementById('instruct'),
    instruct_btn: document.getElementById('noted_btn'),
    bubbles: document.getElementById('bubbles'),
    score: document.getElementById('score'),
    water:document.getElementById('water'),
    game_over_frame: document.getElementById('game_over_cover'),
    newGame_btn: document.getElementById('new_game'),
    selectBall: (ballNumber)=> document.querySelector(`.ball:nth-child(${ballNumber})`),
    selectSquare: (squareNumber)=> document.querySelector(`.cell-${squareNumber}`),
    stringResources: {
        humanSelect: 'human_select',
        computerSelect: 'computer_select',
        wrongSelect: 'wrong_select',
        attainedBall:'attained_ball',
        unattainedBall: 'unattained_ball',
        blinking: "temp_blinking"
    }
}