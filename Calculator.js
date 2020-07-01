let runningCount =0;
let buffer="0";
let previousOperator = null;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener('click', function(event) {


buttonClick(event.target.innerText);
});

function buttonClick(value)
{
    if(isNaN(parseInt(value)))
    {
            handleSymbol(value);
    }
    else{
            handleNumber(value);
    }
    rerender();
}

function handleNumber(value)
{
    if(buffer ==="0")
    {
        buffer = value;
    }
    else
    {
        buffer += value;
    }
}

function handleSymbol(value)
{
    switch(value)
    {
        case "CLR":
            buffer =0;
            runningCount = 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null)
            {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = ""+runningCount;
            runningCount = 0;
            break;
        case "<-":
            if(buffer.length ===1)
            {
                buffer ="0";
            }
            else{
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value)
{
    const intBuffer =  parseInt(buffer);
    if(runningCount ===0)
    {
        runningCount = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer)
{
    if(previousOperator === "+")
    {
        runningCount += intBuffer;
    }
    else if(previousOperator === "-")
    {
        runningCount -= intBuffer;
    }
    else if(previousOperator === "*")
    {
        runningCount *= intBuffer;
    }
    else
    {
        runningCount /= intBuffer;
    }
}

function rerender()
{
    screen.innerText = buffer;
}