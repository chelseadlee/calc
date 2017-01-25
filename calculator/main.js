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
			view.appendToScreen(digit);
		} else if (octopus.editingNumber2) {
			model.num2 += digit;
			view.appendToScreen(digit);
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
			// assign clicked button text value to variable
			var btnValue = ($(this).text());

			// if selected button is a number or decimal point
			if ($.isNumeric(btnValue) || btnValue === ".") {
				// append button value to model (and to view)
				octopus.appendNumber(btnValue);
				view.renderInput(this);
				console.log("num1= " + model.num1);
			// if selected button is an operator
			} else if (octopus.isOperator(btnValue)) {
				view.deselect();
				octopus.setOperator(btnValue);
				// append operator to output area and remove formatting from num1
				view.renderInput(this);
				view.clearOutputArea();

			// if selected button is "=""
			} else if (btnValue === "="){
				octopus.calculate();
				view.renderInput(this);
				view.renderOutput();
				console.log(model.num1 + " " + model.chosenOperator + " " + model.num2 + " = " + model.result);
				octopus.reset();
			// if selected button is "C"
			} else if (btnValue === "C") {
				view.deselect();
				view.clearAll();
			}
		});
	},

	deselect: function() {
		$('.label').removeClass('selectedbutton');
	},

	appendToScreen : function(value) {
		var $outputArea = $('#output');
		$outputArea.append(value);
		console.log("appended to screen");
	},

	renderInput: function(selectedButton) {
		var $button = $(selectedButton);
		$button.addClass('selectedbutton');
	},

	renderOutput: function() {
		var $outputArea = $('#output');
		this.clearOutputArea()
		var result = octopus.getResult();
		$outputArea.append(result);
		this.deselect();
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

	// render: function(selectedButton, value) {
	// 	var $outputArea = $('#output');
	// 	var $button = $(selectedButton);

	// }
};

octopus.init();