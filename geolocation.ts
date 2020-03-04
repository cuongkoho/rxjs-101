// create an Observable that will start listening to geolocation updates
// when a consumer subscribes
const locations = new Observable(observer => {
	let watchId: number;

	if ("geolocation" in navigator) {
		watchId = navigator.geolocation.watchPosition(
			(position: Position) => {
				observer.next(position);
			},
			(error: PositionError) => {
				observer.error("Gelocation not available");
			}
		);
	}

	// when the consumer unsubcribes, clean up data ready for next subscription.
	return {
		unsubscribe() {
			navigator.geolocation.clearWatch(watchId);
		}
	};
});
