import { getTodaysDate } from "./getDate.js";
import {initEvent} from "./Init_event.js";
import {initData} from "./initData.js";
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
			for (const [type, deque] of Object.entries(typeDeques)) {
                console.log(`Type: ${type}`);
                console.log(`Deque size: ${deque.size()}`);
                console.log('Companies in Deque:');
                for (let i = deque.front; i < deque.rear; i++) {
                    const company = deque.items[i];
                    console.log(`  - ${company.companyName}`);
                }
                console.log('---');
            }
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
	initEvent();
	getTodaysDate();
});
