let runningTotal = 0; 
let buffer = "0";
let previousOperator; 
const screen = document.querySelector(".сalculation-text"); 
const screenSmall = document.querySelector(".сalculation-text2"); 

document.addEventListener('keydown', function(event){
    const element = document.getElementById(event.key)
    element.classList.add('hover');
    void element.offsetWidth;
    element.classList.remove('hover');   
    buttonClick (event.key);
    document.activeElement.blur();
});


function buttonClick(value) { 
    if (isNaN (value)) {
        if (value === '+/-') { 
            minusNumber(value);
        }else if (value === '.') { 
            point(value);
        }else {
            handleSymbol(value);
        }
    }else{ 
        handleNumber(value);
    }
    if (`${buffer}`.length > 13) { 
        buffer = buffer.toExponential(2); 
        screen.innerText = buffer
        screenSmall.innerText = runningTotal
    }else {
        screen.innerText = buffer;
        screenSmall.innerText = runningTotal
    }
} 


function minusNumber(value) { 
    buffer = JSON.stringify(-buffer);
    runningTotal = 0;
}

function point(value) { 
    buffer = buffer + '.'
}


function handleSymbol(symbol) {
    switch(symbol) {
        case 'AC':
        case 'Backspace':
            buffer = '0'; 
            runningTotal = 0; 
            break; 
        case '=':
        case 'Enter': 
        
            if(previousOperator === null || runningTotal === 0) { 
                return
            }
            flusOperator(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal; 
            // runningTotal = 0;
            break; 
        case '+':
        case '-':
        case '×':
        case '*':
        case '÷':
        case '/':
        case '%':
        case '+/-':
            handleMath(symbol);
            break;
    }
}


function handleMath(symbol){
    if (buffer === '0') { 
        return;
    }
    const intBuffer = parseFloat(buffer);
    if (runningTotal === 0){ 
        runningTotal = intBuffer;
    }else {
        flusOperator(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}


function handleNumber(nubmerString) { 
    if (buffer === "0"){ 
        buffer = nubmerString;
    }else{
        buffer += nubmerString;
    }
}


function flusOperator(intBuffer){
    if(previousOperator === "+"){ 
        runningTotal += intBuffer;
    }else if (previousOperator === '-'){ 
        runningTotal -= intBuffer;
    }else if (previousOperator === '×' || previousOperator === '*'){
        runningTotal = runningTotal * intBuffer;
    }else if (previousOperator === '÷' || previousOperator === '/'){
        runningTotal /= intBuffer;
    }else if (previousOperator === '%'){
        runningTotal /= intBuffer*(100/runningTotal);
    }else if (previousOperator === '+/-'){
        runningTotal = -intBuffer
    }
}


function init() {
    document.querySelector('.rectangle-inside').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

init();
