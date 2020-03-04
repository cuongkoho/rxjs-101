const greetingPoster = new Promise((resolve, reject) => {
	console.log("inside promise (proof of being eager");
	resolve("welcome, nice to meet you");
});

console.log("Before calling then on Promise");

greetingPoster.then(res => console.log(`Greeting from promise: ${res}`));
