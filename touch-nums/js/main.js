'use strict'

var gBoard

var gNums

var gCount = 0

var gSize = 16

var gInterval

var gTime

var gIsGameStart = false

function onInit() {
    const elTBody = document.querySelector('tbody')
    elTBody.style.display = 'none'
    gNums = createBoard()
    renderBoard(gNums)

}

function createBoard() {

    const nums = []
    for (var i = 0; i < gSize; i++) {
        nums.push(i + 1)
    }
    const randNums = shuffle(nums)
    return randNums

}

function changeLevel(level) {
    if (level === 'easy') gSize = 16
    if (level === 'medium') gSize = 25
    if (level === 'hard') gSize = 36
    var elH2 = document.querySelector('.time')
    elH2.innerText = '00.00'
    clearInterval(gInterval)
    gNums = createBoard()
    renderBoard(gNums)
    gCount = 0


}


function startGame() {
    
    if (gIsGameStart) {
        const elTBody = document.querySelector('tbody')
        elTBody.style.display = 'none'
        clearInterval(gInterval)
        gIsGameStart = false
        gNums = createBoard()
        renderBoard(gNums)
        var elBtn = document.querySelector('.start-btn')
        elBtn.innerText = 'Start Game'
        elBtn.style.color = 'green'
        gCount = 0

    } else if (!gIsGameStart) {
        var elH2 = document.querySelector('.time')
    elH2.innerText = '00.00'
        const elTBody = document.querySelector('tbody')
        elTBody.style.display = 'block'
        getTime()
        gIsGameStart = true
        var elBtn = document.querySelector('.start-btn')
        elBtn.innerText = 'Stop'
        elBtn.style.color = 'red'
    }
}


function renderBoard(nums) {
    var strHtml = ''
    var boardRowLength = Math.sqrt(nums.length)
    for (var i = 0; i < boardRowLength; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < boardRowLength; j++) {
            const cellNum = nums.pop()
            strHtml += `<td data-id=${cellNum} onclick="cellClicked(this, ${cellNum})">${cellNum}</td>`

        }

        strHtml += '</tr>'
    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHtml

}

function getTime() {
    gTime = 0
    gInterval = setInterval(() => {
        gTime += 1
        var time = gTime / 100
        var elH2 = document.querySelector('.time')
        if (time > 10) elH2.innerText = time
        else elH2.innerText = '0' + time
        return time
    }, 10);
}


function cellClicked(btn, num) {
    if (num === gCount + 1) {
        btn.style.backgroundColor = "green"
        gCount++
        if (num === 16) {
            onInit()
            startGame()
            
        }
    }
    if (gCount === gSize) {
        clearInterval(gInterval)
    }

}

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


