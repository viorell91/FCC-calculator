//------------------
//PARAMETERS
//------------------
result=0;
digit=0;
pressedBtns = [];
execFlag = false;

//------------------
//FUNCTIONALITY
//------------------
function pressDigit(btnValue){
	//list of operations for illustation purposes
	var operations = ["+","-","÷","×"];
	//list of operations for arithmetic purposes
	var actualOperations = ["+","-","/","*"];
	//if a number/dot has been pressed
	if (isNumeric(btnValue) || btnValue=="."){
		if (!execFlag){
			document.getElementById("display").innerHTML = btnValue;
			execFlag=true;
		}
		else{
			document.getElementById("display").innerHTML += btnValue;
		}
	}
	//if an arithmetic sign has been pressed
	else if(operations.indexOf(btnValue) > -1){
		//trea multiply and division signs separately
		//because they are visually diferent from arithmetically
		if(btnValue=="×"){
			btnValue = "*";
		}
		else if(btnValue=="÷"){
			btnValue = "/";
		}
		var number = document.getElementById("display").innerHTML;
		pressedBtns.push(number);
		pressedBtns.push(btnValue);
		execFlag=false;
	}
	//get rest operation
	else if (btnValue=="%" && findIntersection(pressedBtns, actualOperations)){
		pressedBtns.push(btnValue);
	}
	//set sign operation
		else if (btnValue=="+/-"){
			var currNumber = document.getElementById("display").innerHTML;
			document.getElementById("display").innerHTML = -currNumber;
	}
	//equal operation
	else if (btnValue=="="){
		number = document.getElementById("display").innerHTML;
		//rest sign is in the list of pressed buttons
		if (pressedBtns.includes("%")){
			var indexPerc = pressedBtns.indexOf("%");
			pressedBtns.splice(indexPerc, 1);
			number = pressedBtns[0] * number / 100;
		}
		pressedBtns.push(number);
		//join pressed digits and artihmetic marks
		var expr = pressedBtns.join(" ");
		//evalutate the joined string - eval(expr)
		document.getElementById("display").innerHTML = eval(expr);
		//reset the list of pressed buttons
		pressedBtns = [];
	}
	//reset button
	else if(btnValue=="AC"){
		document.getElementById("display").innerHTML = "0.";
		pressedBtns = [];
		execFlag = false;
	}
	else{
		document.getElementById("display").innerHTML = btnValue;
	}
}
//-----------------
//HELPER
//-----------------

//establish whether the pressed button is a digit
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
//get the intersection between the list of all 
//arithmetic operations and the one pressed
function findIntersection (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};