import {Deque} from "./Deque.js"

/*
*	필드 탭 선택 시 보이는 오른쪽 숫자(현재 칸/ 총 보유 칸) setting
*/
export function	setFieldTab(fieldName, Deque) {
	const	currentClass = ".current-" + fieldName;
	const	numClass = "." + fieldName + "-num";
	const	currentElement = document.querySelector(currentClass);
	const	numElement = document.querySelector(numClass);

	if (currentElement)
		currentElement.textContent = Deque.current;
	if (numElement)
		numElement.textContent = Deque.size();
}

/*
* field별 언론사 정보 및 구독 버튼
*/
function	setPressInfo(fieldName, Deque) {
	const	fieldElement = document.querySelector(`.${fieldName}`);
	if (fieldElement)
	{
		const	editDateElement = fieldElement.querySelector(".EditDate");
		const	brandMarkElement = fieldElement.querySelector(".Brandmark");
		const	subscribeButtonElement = fieldElement.querySelector(".SubscribeButton");
		const	src = Deque.items[0].companyLogo;
		const	is_subscribed = Deque.items[0].isSubscribe;

		if (brandMarkElement)
			brandMarkElement.innerHTML = `<img src=${src}>`;
		if (editDateElement)
			editDateElement.textContent = Deque.items[0].updatedDate;
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
function	setMain(fieldName, Deque) {
	const	fieldElement = document.querySelector(`.${fieldName}`);
	if (fieldElement)
	{
		const	ThumbnailElement = fieldElement.querySelector(".Thumbnail");
		const	mainTitleElement = fieldElement.querySelector(".MainTitle");
		const	src = Deque.items[0].mainNews.src;

		if (ThumbnailElement)
			ThumbnailElement.innerHTML = `<img src=${src}>`;
		if (mainTitleElement)
			mainTitleElement.textContent = Deque.items[0].mainNews.title;
	}
}

/*
* field별 sub 뉴스 데이터 입력
*/
function	setSub(fieldName, Deque) {
	const	fieldElement = document.querySelector(`.${fieldName}`);
	if (fieldElement)
	{
		const	subElement = fieldElement.querySelector(".Sub");
		const	captionElement = fieldElement.querySelector(".Caption");
		const	subNewsArray = Deque.items[0].news;
		const	newsName = Deque.items[0].companyName;
		let		subNews = "<ul>";

		for (let news of subNewsArray)
			subNews = subNews + `<li>${news.title}</li>`
		subNews = subNews + "</ul>";
		subNews = subNews + `<div class="Caption">${newsName} 언론사에서 직접 편집한 뉴스입니다.</div>`;
		if (subElement)
			subElement.innerHTML = subNews;
	}
}

export function	setNewsList(fieldName, Deque) {
	setFieldTab(fieldName, Deque);
	setPressInfo(fieldName, Deque);
	setMain(fieldName, Deque);
	setSub(fieldName, Deque);
}
