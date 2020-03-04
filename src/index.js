import { fromEvent } from "rxjs";
import { of } from "rxjs";
import { map, filter } from "rxjs/operators";

const button = document.getElementById("myButton");

// OBSERVABLES
const myObservable = fromEvent(button, "click");

// OBSERVEES/SUBSCRIBER, etc
// unicasting
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

// OPERATORS
// `of` allows you to deliver values sequentially
const dataSource = of(1, 2, 3, 4, 5);
const mappedSubscription = dataSource
  .pipe(map(value => value * 2))
  .subscribe(value => console.log(value));

const filteredSubscription = dataSource
  .pipe(filter(value => value >= 2))
  .subscribe(value => console.log(value));

// Types of operators
// * Creation: of, from, fromEvent
// * Combination: combineLatest, concat, merge, etc.
// * Transformation: map, concatMap, mergeMap, scan, etc.
// * Filtering: filter, take, etc.
// * Error Handling: catchError
// * Multicasting: shareReplay
