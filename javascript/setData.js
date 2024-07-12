import {Deque} from "./Deque.js"

/*
*	필드 탭 선택 시 보이는 오른쪽 숫자(현재 칸/ 총 보유 칸) setting
*/
export function	setFieldTab(fieldName, current, size) {
	const	currentClass = ".current-" + fieldName;
	const	numClass = "." + fieldName + "-num";
	const	currentElement = document.querySelector(currentClass);
	const	numElement = document.querySelector(numClass);

	if (currentElement)
		currentElement.textContent = current;
	if (numElement)
		numElement.textContent = size;
}

/*
* field별 언론사 정보 및 구독 버튼
*/
export function	setPressInfo(news) {
	const	pressNews = document.querySelector(".PressNews");
	if (pressNews)
	{
		const	editDateElement = pressNews.querySelector(".EditDate");
		const	brandMarkElement = pressNews.querySelector(".Brandmark");
		const	subscribeButtonElement = pressNews.querySelector(".SubscribeButton");
		const	src = news.companyLogo;
		const	is_subscribed = news.isSubscribe;

		if (brandMarkElement)
			brandMarkElement.innerHTML = `<img src=${src}>`;
		if (editDateElement)
			editDateElement.textContent = news.updatedDate;
		if (subscribeButtonElement)
		{
			if (is_subscribed)
				subscribeButtonElement.innerHTML = `<img src="./asset/button/subscribed.svg">`;
			else
				subscribeButtonElement.textContent = "+ 구독하기";
		}
	}
}

/*
* field별 main class 데이터 정리
*/
function	setMain(news) {
	const	pressNews = document.querySelector(".PressNews");
	if (pressNews)
	{
		const	ThumbnailElement = pressNews.querySelector(".Thumbnail");
		const	mainTitleElement = pressNews.querySelector(".MainTitle");
		const	src = news.mainNews.src;

		if (ThumbnailElement)
			ThumbnailElement.innerHTML = `<img src=${src}>`;
		if (mainTitleElement)
			mainTitleElement.textContent = news.mainNews.title;
	}
}

/*
* field별 sub 뉴스 데이터 입력
*/
function	setSub(news) {
	const	pressNews = document.querySelector(".PressNews");
	if (pressNews)
	{
		const	subElement = pressNews.querySelector(".Sub");
		const	subNewsArray = news.news;
		const	newsName = news.companyName;
		let		subNews = "<ul>";

		for (let news of subNewsArray)
			subNews = subNews + `<li>${news.title}</li>`
		subNews = subNews + "</ul>";
		subNews = subNews + `<div class="Caption">${newsName} 언론사에서 직접 편집한 뉴스입니다.</div>`;
		if (subElement)
			subElement.innerHTML = subNews;
	}
}

export function	setNewsList(fieldName, current, size, news) {
	setFieldTab(fieldName, current, size);
	setPressInfo(news);
	setMain(news);
	setSub(news);
}
