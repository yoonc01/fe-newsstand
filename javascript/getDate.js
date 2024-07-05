function	timeToSleep()
{
	const	now = new Date();
	const	passed = now.getSeconds() * 1000 + now.getMilliseconds();
	return (3600000 - passed);
}

export function	getTodaysDate() {
	const	daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
	const	today = new Date();
	const	year = today.getFullYear();
	const	month = (today.getMonth() + 1).toString().padStart(2, '0');
	const	date = today.getDate().toString().padStart(2, '0');
	const	day = daysOfWeek[today.getDay()] + "요일";

	const	todaysDate = `${year}.${month}.${date}.${day}`;
	const	element = document.querySelector(".TodaysDate");
	if (element)
		element.textContent = todaysDate;
	const	sleepTime = timeToSleep();
	if (sleepTime < 2200000)
		setTimeout(getTodaysDate, Math.round(sleepTime / 2));
	else
		setTimeout(getTodaysDate, sleepTime);
}
