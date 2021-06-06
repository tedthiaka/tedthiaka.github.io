let answer,
calculation, 
number1, 
number2,
equal, 
operationList,
decimal = false,
firstDecimal,
square = document.querySelector(".square"), 
clear = document.querySelector(".clear"),
emptyError = "Please enter a value", 
squareError = "Other operations not accepted",
decimalError = "You cannot place a second decimal",
operations = ["add", "subtract", "multiply", "divide"];

// Operations
const add = function(x,y) {
	return x + y;
};

const subtract = function(x,y) {
	return x-y;
};

const sum = function(numbers) {
    var result = 0
	for(i = 0; i < numbers.length; i++){
        result += numbers[i];  
    };
    return result;
};

const multiply = function(numbers) {
    var result = 1;
	for(i = 0; i < numbers.length; i++){
        result *= numbers[i];  
    };
    return result;
};

const divide = function(x,y){
    return x/y;
}

const power = function(x,y) {
	return x**y
};

const factorial = function(x) {
	var i = x-1;
    if (x === 1 || x === 0){
        x = 1;
    } else {
        for(i; i > 0; i--){
            x *= i;
        };
    }
    return x;
};

const operate = function(x,y) {
    operationObject = {"add":add, "subtract":subtract, "multiply":(x,y) => x*y, "divide":divide};
    for(operation in operationObject){
        if(operation === calculation){
            answer = parseFloat(operationObject[operation](x,y).toFixed(2));
            number1 = "";
            number2 = "";
            calculation = "";
            return answer;
        }
    }  
};




// Adding event listeners to each number
let numbersList = document.querySelectorAll(".number");
let display = document.querySelector(".display");

numbersList.forEach(element => {
    element.addEventListener("click", () => {
        if(answer && !calculation){
            display.style.textAlign = "right";
            display.value = '';
            answer = '';
        } else if(answer && calculation){
                // number2 = display.value
                display.value = "";
        } else if(display.value === emptyError || display.value === squareError || !display.value){
            display.value = '';
            display.style.textAlign = "right";
            display.style.fontSize = "250%";
        };
        if ((!firstDecimal || !calculation) && (!firstDecimal || number1)){
            for(i = 0; i < 10; i++){
                if (parseFloat(element.textContent) === i){
                    display.value += element.textContent;
                    if(decimal){
                        firstDecimal = true;
                    } else{
                        firstDecimal = false;
                    }
                };
            }
        };
        
        if(element.textContent === "."){
            if(decimal && number1){
                display.value = decimalError;
                display.style.fontSize = "180%";
            } else {
                display.value += ".";
                decimal = true;
            }
        }
    });
});

// Adding an event Listener to the clear button to clear the display
// when clicked
clear.addEventListener("click", () => {
    display.value = "";
    number1 = "";
    number2 = "";
    answer = "";
});

// Adding an event Listener to the square button that claculates and 
// outputs the square of the number entered when the button is clicked
square.addEventListener("click", () => {
    if(!display.value){
        display.style.textAlign = "center";
        display.value = emptyError;
    }else if(display.value === emptyError){
        display.value = emptyError;
    };
    if(number1){
        display.style.textAlign = "center";
        display.value = squareError;
        display.style.fontSize = "180%";
    } else{
        answer = power(parseFloat(display.value), 2);
        display.value = answer;
        firstDecimal = false;
    }
});

// Adding event listeners to the operations
operationList = document.querySelectorAll(".operation");
operationList.forEach(element => {
    element.addEventListener("click", () => {
        if (!display.value){
            // The display value is empty
            display.style.textAlign = "center";
            display.value = emptyError;
        // When the display value is not a falsey, but is an error message instead
        } else if(display.value === emptyError){
            display.value = emptyError;
        } else {
            // Output given if an empty string is squared - error handling
            if(NaN){
                display.value = "";
            }            
        }
        if (number1){
            number2 = parseFloat(display.value);
            display.value = "";
        } else{
            // Assigning number1 to the value entered by the user
            number1 = parseFloat(display.value);
            display.value = "";
        }
        if (number2){
            display.value = operate(number1,number2);
        }
        // Checking to see if the user has entered values into the display
        
        // Checking the type of operation chosen by the user
        operations.every(operation => {
            if (element.classList[1] === operation){
                calculation = operation;
                return false
            }
            return true
        });

        // Assigning new values to the variables for the operations to allow multiple operations
        if(answer && calculation){
            number1 = answer;
        };
        
        // Resetting the variables back to their intial values
        firstDecimal = false;
        decimal = false;
    });
});

// Adding an event listener to the equals button to evaluate the number
// and output the result
equal = document.querySelector(".equals");

equal.addEventListener("click", () => {
    if(!display.value){
        display.style.textAlign = "center";
        display.value = emptyError;
    } else{
        number2 = parseFloat(display.value);
    }
    display.value = operate(number1,number2);
    firstDecimal = false;
    decimal = false;
    calculation = "";
    // answer = "";
});