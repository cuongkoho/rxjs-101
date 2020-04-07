import { fromEvent, interval } from "rxjs";
import { map, mergeAll, mergeMap, switchMap } from "rxjs/operators";

/* Basic approach */
/* Cons:
 * - Look likes callback hell
 * - need to handle the disposal of every subscription by ourselves
 */
const button = document.getElementById("merge-all-basic");

fromEvent(button, "click").subscribe(event => {
  interval(1000).subscribe(number => {
    console.log(number);
  });
});

/* Higer-order approach
 * - Work exactly the same way as the basic approach
 * - Looks a bit better
 */
const buttonHo = document.getElementById("merge-all-ho");

const click$ = fromEvent(buttonHo, "click");
const interval$ = interval(1000);
const clicksToInveral$ = click$.pipe(
  map(event => {
    return interval$;
  })
);

clicksToInveral$.subscribe(intervalObservable =>
  intervalObservable.subscribe(num => {
    console.log(num);
  })
);

/* MergeAll approach
 * - Work exactly the same way as the basic approach
 *
 * Does the subscribe of the inner stream, and push value to the outer stream
 *
 */
const buttonMA = document.getElementById("merge-all");
const clickMA$ = fromEvent(buttonMA, "click");
const intervalMA$ = interval(1000);
const clicksToInveralMA$ = clickMA$.pipe(
  map(event => {
    return intervalMA$;
  }),
  mergeAll()
);

clicksToInveralMA$.subscribe(num => console.log(num));

/* MergeAll approach
 * - Work exactly the same way as the basic approach
 *
 * - Shortcut for map + mergeAll
 */
const buttonMM = document.getElementById("merge-map");
const clickMM$ = fromEvent(buttonMM, "click");
const intervalMM$ = interval(1000);
const clicksToInveralMM$ = clickMM$.pipe(
  mergeMap(event => {
    return intervalMM$;
  })
);

clicksToInveralMM$.subscribe(num => console.log(num));

/* SwitchMap approach
 * - Cancel previous subscription and keep only one
 */
const buttonSM = document.getElementById("switch-map");
const clickSM$ = fromEvent(buttonSM, "click");
const intervalSM$ = interval(1000);
const clicksToInveralSM$ = clickSM$.pipe(switchMap(event => intervalSM$));

clicksToInveralSM$.subscribe(num => console.log(num));
