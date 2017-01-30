var model = {
	// operator, number, output
	nums: [],
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
			view.clearOutputArea();
			this.editingNumber2 = true;
			model.num2 = digit;
		}
		view.appendToScreen(digit);
	},
	isOperator: function(symbol) {
		return model.operators[symbol];
	},
	getOperator: function(){
		return model.chosenOperator;
	},
	setOperator: function(operator){
		if (model.num1 !== '') {
			model.chosenOperator = operator;
			octopus.editingNumber1 = false;
		};
	},
	calculate: function() {
		octopus.editingNumber2 = false;
		var x = parseFloat(this.getNum1());
		var y = parseFloat(this.getNum2());
		var operator = this.getOperator();
		var result = 0;
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
		model.chosenOperator = "";
		this.setNum2("");
		model.result = 0;
		this.editingNumber2 = false;
		this.editingNumber1 = true;
	}
}

var view = {
	outputArea: $('#output'),
	outputCharCounter: 0,
	init: function(){

		$('.container').on('click', '.label', function() {
			// assign clicked button text value to variable
			var $btnValue = $(this).text();
			view.handleInput($btnValue, this);
		});
	},

	handleInput: function(input, selectedButton) {
		// switch(true) {
		// 	case ($.isNumeric(input) || input === "."):
		// 		octopus.appendNumber(input);
		// 		view.renderInput(selectedButton);
		// 		break;
		// 	case (octopus.isOperator(input)):
		// 		view.deselect();
		// 		octopus.setOperator(input);
		// 		view.renderInput(selectedButton);
		// 		break;
		// 	case (input === "="):
		// 		octopus.calculate();
		// 		view.renderInput(selectedButton);
		// 		view.renderOutput();
		// 		octopus.appendNumber(input);
		// 		octopus.reset();
		// 		break;
		// 	case (input === "C"):
		// 		view.deselect();
		// 		view.clearAll();
		// 		break;
		// 	default:
		// 		console.log("I DON'T KNOW WHAT TO DO");
		// }

			if ($.isNumeric(input) || input === ".") {
				// append button value to model (and to view)
					octopus.appendNumber(input);
					view.addSelectedClass(selectedButton);
					// view.renderInput(selectedButton);
					console.log("num1= " + model.num1);
			// if selected button is an operator
			} else if (octopus.isOperator(input)) {
				// view.deselect();
				octopus.setOperator(input);
				// $(this).addClass('selectedbutton');
				view.addSelectedClass(selectedButton);
				// append operator to output area and remove formatting from num1
				view.addSelectedClass(selectedButton);
				// view.clearOutputArea();

			// if selected button is "=""
			} else if (input === "="){
				octopus.calculate();
				// view.renderInput(selectedButton);
				view.renderOutput();
				console.log(model.num1 + " " + model.chosenOperator + " " + model.num2 + " = " + model.result);
				octopus.reset();
			// if selected button is "C"
			} else if (input === "C") {
				view.deselect();
				view.clearAll();
			}
	},

	deselect: function() {
		$('.label').removeClass('selectedbutton');
	},

	appendToScreen : function(value) {
		this.outputArea.append(value);
		console.log(this.outputCharCounter);
		console.log("appended to screen");
	},

	addSelectedClass: function(selectedButton) {
		var $button = $(selectedButton);
		this.deselect();
		$button.addClass('selectedbutton');
	},

	renderOutput: function() {
		this.clearOutputArea()
		var result = octopus.getResult();
		this.outputArea.append(result);
		this.deselect();
		console.log("rendered output! " + model.result);
	},
	clearOutputArea: function() {
		this.outputArea.empty();
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