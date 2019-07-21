//!TODO: Сделать чтобы выражение оставалось в строке и не 
//переходило на другую строку
function getMathExpression(){
    return document.getElementById("math-expression-line").innerText;
}

function printMathExpression(num){
    document.getElementById("math-expression-line").innerText = num;
}

function getMathResultInMemory(){
    return document.getElementById("math-result-in-memory").innerText;
}

function printMathResultInMemory(num){
    document.getElementById("math-result-in-memory")
    .innerText = num;
}

function factorial(num){
    return (num != 0) ? num * factorial(num - 1) : 1;
}

var operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function(){
        var outputMathExpression = getMathExpression();
        var result;
        if (this.innerText == "=") {
            //Замена ^ на ** дял степени
            outputMathExpression = outputMathExpression.replace(/\^/ ,"**");
            outputMathExpression = outputMathExpression.replace(/root/ ,"**");

            result = eval(outputMathExpression);
            printMathExpression(result);
            outputMathExpression = result;
        }
        
        //alert(this.id + " " + this.innerText);

        switch (this.id) {
            case "+-": 
                // outputMathExpression.slice(-1);
                // outputMathExpression =
                // (outputMathExpression.substring(0, outputMathExpression.length - 1));    
                break;
            case "sin":
                result = Math.sin(Math.PI / 180 * outputMathExpression);
                printMathExpression(result);
                outputMathExpression = result;
                break;
            case "cos":
                result = Math.cos(Math.PI / 180 * outputMathExpression);
                printMathExpression(result);
                outputMathExpression = result;     
                break;
            case "tan":
                result = Math.tan(Math.PI / 180 * outputMathExpression);
                printMathExpression(result);
                outputMathExpression = result;     
                break;
            case "xy":
                result = eval(outputMathExpression);
                outputMathExpression += "^";
                printMathExpression(result + "^");
                break;
            case "ysqrtx": 
                result = eval(outputMathExpression);
                outputMathExpression += "root";
                printMathExpression(result + "root");
                break;
            case "n":
                result = factorial(eval(outputMathExpression));
                printMathExpression(result);
                outputMathExpression = result;  
                break;
            case "equally":     
                break;
        
            default:
                break;
        }

        if(outputMathExpression != NaN){
            if (this.id != "+-" && this.id != "MC" && this.id != "MC" 
            && this.id != "sin" && this.id != "cos" && this.id != "tan"
            && this.id != "n" && this.id != "equally"&& this.id != "ysqrtx"){
                outputMathExpression += this.id;
                printMathExpression(outputMathExpression);
            }
            
        }
           
    })  
}

var number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function(){
        var outputMathExpression = getMathExpression();
        if(outputMathExpression != NaN){
            if (outputMathExpression == "0") {
                outputMathExpression = "";
            }
            outputMathExpression += this.innerText;
            printMathExpression(outputMathExpression);
        }
    })  
}


//printMathExpression("123+4*8");
//getMathResultInMemory("155237643");