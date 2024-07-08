import { getTodaysDate } from "./getDate.js";
import {initEvent} from "./Init_event.js";

document.addEventListener("DOMContentLoaded", () => {
	initEvent();
	getTodaysDate();
});
