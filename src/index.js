import { fromEvent } from "rxjs";
import { of } from "rxjs";
import { map, filter } from "rxjs/operators";
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject } from "rxjs";

const button = document.getElementById("myButton");

// =====================================
// OBSERVABLES
// =====================================
const myObservable = fromEvent(button, "click");

// =====================================
// OBSERVEES/SUBSCRIBER, etc
// =====================================
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

// =====================================
// OPERATORS
// =====================================
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

// =====================================
// SUBJECTS
// =====================================
//
//
///*
//                  s1    n(r)   n(x)    s2     n(j)   c    n(s)
//Subject
//       s1         ^-----r------x--------------j------|----------
//       s2         ---------------------^------j------|----------
//AsyncSubject
//       s1         ^----------------------------------j|---------
//       s2         ---------------------^-------------j|---------
//BehaviorSubject
//       s1         ^a----r------x--------------j------|----------
//       s2         ---------------------^x-----j------|----------
//ReplaySubject
//       s1         ^-----r------x--------------j------|----------
//       s2         ---------------------^r-x---j------|----------
//
const subject = new Subject();
const asyncSubject = new AsyncSubject();
const behaviorSubject = new BehaviorSubject("a");
const replaySubject = new ReplaySubject(2);

const subjects = [subject, asyncSubject, behaviorSubject, replaySubject];
const log = subjectType => e => console.log(`${subjectType}: ${e}`);

console.log("SUBSCRIBE 1");
subject.subscribe(log("s1 subject"));
asyncSubject.subscribe(log("s1 asyncSubject"));
behaviorSubject.subscribe(log("s1 behaviorSubject"));
replaySubject.subscribe(log("s1 replaySubject"));

console.log("NEXT(r)");
subjects.forEach(o => o.next("r"));

console.log("NEXT(x)");
subjects.forEach(o => o.next("x"));

console.log("SUBSCRIBE 2");
subject.subscribe(log("s2 subject"));
asyncSubject.subscribe(log("s2 asyncSubject"));
behaviorSubject.subscribe(log("s2 behaviorSubject"));
replaySubject.subscribe(log("s2 replaySubject"));

console.log("NEXT(j)");
subjects.forEach(o => o.next("j"));

console.log("COMPLETE");
subjects.forEach(o => o.complete());

console.log("NEXT(s)");
subjects.forEach(o => o.next("s"));
