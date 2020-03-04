import { fromEvent } from "rxjs";

const button = document.getElementById("myButton");

const myObservable = fromEvent(button, "click");

const subscription = myObservable.subscribe(event => {
  console.log("I was clicked");
  console.log(event);
});

// calling subscribe would:
// 1. setup event listener on button for click event
// 2. pass a callback for them clicking event
// 3. return a subscription object with an `unsubscribe` which contains clean up logic
//
//
// alternatively, subscriber could be initialized with an object
const secondSubscription = myObservable.subscribe({
  next: event => console.log(event),
  error: error => console.log(error),
  complete: () => console.log("complete!")
});

import { of } from "rxjs";
//import { map } from "rxjs/operators";
//
//// `of` allows you to deliver values sequentially
//const dataSource = of(1, 2, 3, 4, 5);
//
//const subscription = dataSource
//	.pip(map(value => value + 1))
//	.subscribe(value => console.log(value));
