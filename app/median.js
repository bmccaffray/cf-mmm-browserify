module.exports = function median(arr){
	if((arr.length % 2) == 0){
		var median = 0, medianMin = 0, medianMax = 0;
	    medianMin = arr.length/2;
	    medianMax = arr.length/2 + 1;
	    median = (arr[medianMin] + arr[medianMax])/2;
	} else {
	    median = arr[Math.floor(arr.length/2)];
	}
	//console.log("Median: " + median);
	return median;
}