module.exports = function mean(arr){
	var mean = 0;

	for(var i = 0; i < arr.length; i++){
		mean += arr[i];
	}
	mean /= arr.length;

	return mean;
}