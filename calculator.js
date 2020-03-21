let total = 0
let buffer = "0"
let lastOperator = null;
const screen = document.querySelector(".screen");

document.querySelector('.calci-buttons').addEventListener('click', function(event){
    buttonClick(event.target.innerText);
})

function buttonClick(value){
    if(isNaN(parseInt(value))){
        handleSymbol(value)
    } else{
        handleNumber(value) 
    }
    rerender();
}

function handleNumber(value){
    if(buffer == 0){
        buffer = value;
    } else{
        buffer += value;
    }
}

function handleMath(value){
    const intBuffer = parseInt(buffer);
    if (total === 0){
        total = intBuffer;
    } else {
        flushOperation(intBuffer)
    }
    lastOperator = value;
    buffer = "0"
}

function flushOperation(intBuffer){
    if(lastOperator === "+"){
        total += intBuffer;
    } else if (lastOperator === "-"){
        total -= intBuffer;
    } else if (lastOperator === "☓"){
        //console.log('here')
        total *= intBuffer;
    } else{
        console.log('here')
        total /= intBuffer;
    }
}

function handleSymbol(value){
    switch(value){
        case "C":
            buffer = '0';
            total = 0;
            break;
        case "←":
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case "=":
            if(lastOperator === null){
                return;
            }
            //console.log(buffer)
            flushOperation(parseInt(buffer));
            lastOperator = null;
            buffer = "" + total;
            total = 0;
            break;
        default:
            handleMath(value);
            break;

    }
    
}

function rerender(){
    screen.innerText = buffer;
}