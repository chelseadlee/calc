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

	getOutputValue: function(){
		return $('#output').text();
	},
	setOutputValue: function(val){
		model.outputValue = val;
	},
	appendNumber: function(digit){
		if (octopus.editingNumber1) {
			model.num1 += digit;
		} else {
			model.num2 += digit;
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
		model.result = result;
	},
	getResult: function(){
		return model.result;
	}

}

var view = {
	
	init: function(){
		
		// var $number = $('.number-btn');

		$('.label').on('click', function() {
			var selectedBtn = ($(this).text()); 
			console.log(typeof selectedBtn);

			if ($.isNumeric(selectedBtn)) {
				octopus.appendNumber(selectedBtn);
				console.log(model.num1);
			} else if (octopus.isOperator(selectedBtn)) {
				octopus.setOperator(selectedBtn);
			} else if (selectedBtn === "="){
				octopus.calculate();

			}

			view.render(this, selectedBtn);

		});

	},

	render: function(button, number) {
		var $outputArea = $('#output');

		var num1 = octopus.getNum1(); 
		var num2 = octopus.getNum2();
		var operator = octopus.getOperator();
		var result = octopus.getResult()
		
		$(button).css('background-color', '#cccccc');
		$outputArea.append(number);
		console.log(num1 + " " + operator + " " + num2 + " = " + result);

	}
}

octopus.init();