document.getElementById("list").innerText = localStorage.getItem('Log');
document.getElementById("math-result-in-memory").innerText = localStorage.getItem('Memory');

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

function printWriteToLog(mathExpr){
	//Обратная замена root на num1**(1/num2) для  ... корней из ...
	mathExpr = mathExpr.replace(/(\d*)\*\*\(1\/(\d+)\)/g, "$1root$2");
	//Обратная замена ^ на ** для степени
	mathExpr = mathExpr.replace(/\*\*/g ,"^");
	
    document.getElementById("list").innerText += mathExpr + "\n";
}

function getLog(){
    return document.getElementById("list").innerText;
}

function factorial(num){
    return (num != 0) ? num * factorial(num - 1) : 1;
}

//Число в строке Memory
var numInMemory = 0;

//0 - не нажата кнопка равно
//1 - нажата кнопка равно
var stage = 0;

var operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function(){
        var outputMathExpression = getMathExpression();
		
		//смена стостояния = на: не нажата
		if (stage == 1) {
			stage = 0;
		}
		
		//Вычисление результата выражения
        var result;
        if (this.innerText == "=") {
			//Замена ^ на ** для степени
			outputMathExpression = outputMathExpression.replace(/\^/g ,"**");
			//Замена root на num1**(1/num2) для  ... корней из ...
			outputMathExpression = outputMathExpression.replace(/(\d*)root(\d+)/g, "$1**(1/$2)");
			
            result = eval(outputMathExpression);
            printMathExpression(result);
			//Запись в лог
			if (result != outputMathExpression) {
				printWriteToLog(result + "=" + outputMathExpression);
			}
			//запись в локальное хранилище
			localStorage.setItem('Log', getLog());
            outputMathExpression = result;
				
			stage = 1;
        }
		
		//проверка на добавление второй точки для числа
		if (this.innerText == ".") {
			if (/(\d*\.\d+)$/.test(outputMathExpression)) {
				return;
			}
		}
			
		if(outputMathExpression != "NaN"){
            if (this.id != "+-" && this.id != "MC" && this.id != "MS"  && this.id != "MR" 
            && this.id != "sin" && this.id != "cos" && this.id != "tan"
            && this.id != "n" && this.id != "equally"&& this.id != "ysqrtx"){
				//Замена одного оператора на другой, если они вводятся подряд
				if (isNaN(outputMathExpression.slice(-1))) {
					//Если Infinity, тогда ничего не делаем
					if (outputMathExpression == "Infinity") {
						outputMathExpression = "0 ";
						printMathExpression(0);
					}
					result = 
					outputMathExpression.substring(0, outputMathExpression.length - 1) + 
					this.id; 
					printMathExpression(result);
					outputMathExpression = result;
					return;
				}	
                outputMathExpression += this.id;
                printMathExpression(outputMathExpression);
            }  
        }
		
		//проход по всем математичекским функциям
        switch (this.id) {
            case "+-":
				if (/\-(\d*\.?\d+)$/.test(outputMathExpression)) {
					outputMathExpression = outputMathExpression.replace(/(^|\-)(\d*\.?\d+)$/, "+$2");
				} else if (/(^|\+)(\d*\.?\d+)$/.test(outputMathExpression)){
					outputMathExpression = outputMathExpression.replace(/(^|\+)(\d*\.?\d+)$/, "-$2");
				}
				outputMathExpression = outputMathExpression.replace(/^\+(\d*\.?\d+)$/, "$1");
				printMathExpression(outputMathExpression);
                break;
            case "sin":
                result = Math.sin(Math.PI / 180 * eval(outputMathExpression));
                printMathExpression(result);
				//Запись в лог
				printWriteToLog(result + "=sin(" + eval(outputMathExpression) + ")");		
				//запись в локальное хранилище
				localStorage.setItem('Log', getLog());
                outputMathExpression = result;
				stage = 1;
                break;
            case "cos":
                result = Math.cos(Math.PI / 180 * eval(outputMathExpression));
                printMathExpression(result);
				//Запись в лог
				printWriteToLog(result + "=cos(" + eval(outputMathExpression) + ")");		
				//запись в локальное хранилище
				localStorage.setItem('Log', getLog());
                outputMathExpression = result;
				stage = 1;
                break;
            case "tan":
                result = Math.tan(Math.PI / 180 * eval(outputMathExpression));
                printMathExpression(result);
				//Запись в лог
				printWriteToLog(result + "=tan(" + eval(outputMathExpression) + ")");		
				//запись в локальное хранилище
				localStorage.setItem('Log', getLog());
                outputMathExpression = result; 
				stage = 1;				
                break;
            case "xy":
                result = eval(outputMathExpression);
                outputMathExpression += "^";
                printMathExpression(result + "^");
                break;
            case "ysqrtx": 
                result = eval(outputMathExpression);
                outputMathExpression += "root";
                printMathExpression(outputMathExpression);
                break;
            case "n":
                result = factorial(eval(outputMathExpression));
                printMathExpression(result);
				//Запись в лог
				printWriteToLog(result + "=n(" + eval(outputMathExpression) + ")!");		
				//запись в локальное хранилище
				localStorage.setItem('Log', getLog());
                outputMathExpression = result;  
				stage = 1;
                break;
			case "MS":	
				if (/\-?(\d*\.?\d+)$/.test(outputMathExpression)) {
					numInMemory = outputMathExpression.match(/\-?(\d*\.?\d+)$/);
					printMathResultInMemory(numInMemory[0]);
					//сохранение в локальное хранилище
					localStorage.setItem('Memory', numInMemory[0]);
				}
                break;
			case "MR":
				if (/(\d*\.?\d+)/.test(outputMathExpression) && getMathResultInMemory() != 0) {
					outputMathExpression = 
					outputMathExpression.replace(/\-?(\d*\.?\d+)$/, getMathResultInMemory());
					printMathExpression(outputMathExpression);
				}
                break;
			case "MC":
				numInMemory = 0;
				printMathResultInMemory(numInMemory);
				localStorage.setItem('Memory', 0);
                break;
        
            default:
                break;
        }   
    })  
}

var operatorNotUse = document.getElementsByClassName("operator-not-use");
for (let i = 0; i < operatorNotUse.length; i++) {
    operatorNotUse[i].addEventListener('click', function(){
        if(this.id == "clear"){
			outputMathExpression = 0;
            printMathExpression(outputMathExpression);
        }
    })  
}

var number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function(){
        var outputMathExpression = getMathExpression();
        if(outputMathExpression != NaN){
			if (stage == 1) {
				outputMathExpression = "";
				stage = 0;
			}
            if (outputMathExpression == "0") {
                outputMathExpression = "";
            }
            outputMathExpression += this.innerText;
            printMathExpression(outputMathExpression);
        }
    })  
}

var clear = document.getElementById("clear-log");
clear.addEventListener('click', function(){
	document.getElementById("list").innerText = "";
	localStorage.removeItem('Log');
})

var save = document.getElementById("save");
save.addEventListener('click', function(){
	var pom = document.createElement('a');
	var log = getLog();
	log = log.replace(/(.*)\=(.*)/g, "{$1} = {$2} /n");
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +
	encodeURIComponent(log));
	pom.setAttribute('download', "Log.txt");
	if(document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
})
