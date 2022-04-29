export default function generateRandomInt(maxValue) {
	const min = 0;
	const max = maxValue;
	const randomInt = Math.floor(Math.random() * (max - min)) + min;
	//console.log("randomInt:", randomInt);
	return randomInt;
}
