module.exports = function mode(arr){
	var mode = 0;
	var modeNum;
	var count = 0;
	var maxCount = 0;

	for(var i = 0; i < arr.length; i++){
		if(arr[i] == (arr[i+1])){
			count++;
			if(count > maxCount){
				modeNum = arr[i];
				maxCount = count;
			}
		} else {
			count = 0;
		}
	}

	if(modeNum){
		mode = modeNum;
	} else {
		mode = 'no mode';
	}

	return mode;
}