function my_max(arr) {
	return arr.sort(function(a, b) {
		return a - b;
	}).pop();
};


var words = "hey how are you?";

function vowel_count(str) {
	var counter = 0;
	for (var i = 0; i < str.length; i++) {
		if(str.charAt(i) == 'a') {
			++counter;
		}
	}
	return counter;
};

console.log(vowel_count(words));