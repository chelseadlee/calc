var model = {
	// operator, number, output
	num1: "",
	num2: "",
	operators: {
		'/': '/',
		'x': 'x',
		'-': '-',
		'+': '+'
	},
	equals: "=",
	chosenOperator: "",
	outputValue: null,
	result: 0
}


var octopus = {
	editingNumber1: true,
	editingNumber2: false,

	init: function(){
		view.init();
	},

	add: function(x, y) {
		return x + y;
	},
	multiply: function(x, y) {
		return x * y;
	},
	divide: function(x, y) {
		return x / y;
	},
	subtract: function(x,y) {
		return x - y;
	},

	getNum1: function(){
		return model.num1;
	},
	getNum2: function(){
		return model.num2;
	},
	setNum1: function(n){
		model.num1 = n;
	},
	setNum2: function(n){
		model.num2 = n;
	},
	appendNumber: function(digit){
		if (octopus.editingNumber1) {
			model.num1 += digit;
		} else if (octopus.editingNumber2) {
			model.num2 += digit;
		} else {
			return;
		}
	},
	isOperator: function(symbol) {
		return model.operators[symbol];
	},
	getOperator: function(){
		return model.chosenOperator;
	},
	setOperator: function(operator){
		model.chosenOperator = operator;
		octopus.editingNumber1 = false;
		octopus.editingNumber2 = true;
	},
	calculate: function() {
		octopus.editingNumber2 = false;
		var x = parseFloat(this.getNum1());
		var y = parseFloat(this.getNum2());
		var operator = this.getOperator();
		var result = null;
		switch (operator) {
			case "+":
				result = octopus.add(x,y);
				break;
			case "-":
				result = octopus.subtract(x,y);
				break;
			case "x":
				result = octopus.multiply(x,y);
				break;
			case "/":
				result = octopus.divide(x,y);
				break;
		}
		model.result = parseFloat(result);
	},
	getResult: function(){
		return model.result;
		octopus.editingNumber2 = false;
	},
	reset: function() {
		this.setNum1("");
		this.setOperator("");
		this.setNum2("");
		model.result = 0;
		this.editingNumber2 = false;
		this.editingNumber1 = true;
	}
}

var view = {

	init: function(){

		// var $number = $('.number-btn');

		$('.container').on('click', '.label', function() {
			var btnValue = ($(this).text());
			if ($.isNumeric(btnValue)) {
				octopus.appendNumber(btnValue);
				// $(this).toggleClass('unselected selectedbutton');
				view.renderInput(this, btnValue);
				console.log("num1= " + model.num1);
			} else if (octopus.isOperator(btnValue)) {
				console.log("I am an operator");
				octopus.setOperator(btnValue);
				view.renderInput(this, btnValue);
			} else if (btnValue === "="){
				octopus.calculate();
				view.renderInput(this, btnValue);
				view.renderOutput();
			} else if (btnValue === "C") {
				view.clearAll();
			}


		});

	},

	renderInput: function(button, number) {
		var $outputArea = $('#output');
		var $button = $(button);

		$button.addClass('selectedbutton');
		$outputArea.append(number);
	},
	renderOutput: function() {
		var $outputArea = $('#output');
		$outputArea.empty();
		var result = octopus.getResult();
		$outputArea.append(result);
		console.log("rendered output! " + model.result);
	},
	clearOutputArea: function() {
		var $outputArea = $('#output');
		$outputArea.empty();
	},
	clearAll: function() {
		octopus.reset();
		this.clearOutputArea();
	}
}

octopus.init();