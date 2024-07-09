import { getTodaysDate } from "./getDate.js";
import {addEvents} from "./events.js";
import {initData, initNewsList} from "./initData.js";
import {Deque} from "./Deque.js";

document.addEventListener("DOMContentLoaded", () => {
	const	typeDeques = {};
	fetch("../data.json")
		.then(response => {
			if (!response.ok) {
				throw new Error("not ok " + response.statusText);
			}
			return response.json();
		})
		.then(data => {
			initData(data, typeDeques);
			initNewsList(typeDeques);
			console.log(typeDeques["IT"].peekFront());
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
	addEvents();
	getTodaysDate();
});
