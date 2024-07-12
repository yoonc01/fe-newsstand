import {Deque} from "./Deque.js"
import {findParentWithClass} from "./utils.js";
import {setPressInfo, setNewsList, setSubscribedNewsList} from "./setData.js";

/*
*eventlistener 생성하는 함수들
*/

/*
*title 클릭 시 새로고침
*/
function refresh() {
	const	titleElement = document.querySelector(".Title");
	if (titleElement)
	{
		titleElement.addEventListener("click", function() {
			location.reload();
		});
	}
}

/*
*탭 항목 클릭 시 feild 변경 및 내용 변경
*탭 클래스에 .fieldChosen 추가하기 위해 utils.js에 있는 findParentWithClass 함수 사용
*/
function clickFieldTab(current_idx, typenames, typeDeques) {
	const	fieldTabElement = document.querySelector(".FieldTab");
	if (fieldTabElement)
	{
		fieldTabElement.addEventListener("click", function(event) {
			const	parentWithClassTab = findParentWithClass(event.target, "Tab");
			const	tabElements = fieldTabElement.querySelectorAll(".Tab");
			if (parentWithClassTab === null)
				;
			else
			{
				const	tabName = parentWithClassTab.getAttribute("data-tab");
				tabElements.forEach((content, idx) => {
					if (content.getAttribute("data-tab") === tabName)
					{
						content.classList.add("fieldChosen");
						current_idx(idx, 0);
						setNewsList(tabName, typeDeques[typenames[current_idx(-1, 0)]]);
					}
					else
						content.classList.remove("fieldChosen");
				});
			}
		});
	}
}

/*
*전체 언론사, 구독 언론사 클릭
*/
function clickTab(current_idx, typenames, typeDeques, subscribed_object) {
	const	fieldNames = ["all", "broad", "it", "english", "sports", "magazine", "region"];
	const	allPressElement = document.querySelector(".AllPress");
	const	subscribedPressElement = document.querySelector(".SubscribedPress");
	const	pressNewsElement = document.querySelector(".PressNews");
	const	SubscribedNewsElement = document.querySelector(".SubscribedNews");

	if (allPressElement && subscribedPressElement)
	{
		allPressElement.addEventListener("click", () => {
			pressNewsElement.style.display = "block";
			SubscribedNewsElement.style.display = "none";
			allPressElement.style.fontWeight = "bold";
			allPressElement.style.color = "#14212B";
			subscribedPressElement.style.fontWeight = "normal";
			subscribedPressElement.style.color = "#879298";
			setNewsList(fieldNames[current_idx(-1, 0)],typeDeques[typenames[current_idx(-1, 0)]]);
			const	tabElements = document.querySelectorAll(".Tab");
			const	subscribedTabElements = document.querySelectorAll(".SubscribedTab");
			tabElements.forEach((content) => {
				content.style.display = "flex";
			});
			subscribedTabElements.forEach((content) => {
				content.style.display = "none";
			});
		});
		subscribedPressElement.addEventListener("click", () => {
			const	subscribed_list = Object.keys(subscribed_object).filter(item => item !== "length");
			const	fieldTab = document.querySelector(".FieldTab");
			const	tabElements = document.querySelectorAll(".Tab");
			let		className;
			if (fieldTab)
			{
				pressNewsElement.style.display = "none";
				SubscribedNewsElement.style.display = "block";
				subscribedPressElement.style.fontWeight = "bold";
				subscribedPressElement.style.color = "#14212B";
				allPressElement.style.fontWeight = "normal";
				allPressElement.style.color = "#879298";
				if (subscribed_object.length === 0)
					;//TODO;
				else
				{
					tabElements.forEach((content) => {
						content.style.display = "none";
					});
					subscribed_list.forEach((content, idx) => {
						if (idx === 0)
							className = "SubscribedTab fieldChosen";
						else
							className = "SubscribedTab";
						fieldTab.innerHTML = fieldTab.innerHTML + `
						<div class="${className}" data-tab="${content}">
							<div class="text">${content}</div>
						</div>`;
					});
					setSubscribedNewsList(subscribed_list[0], subscribed_object[subscribed_list[0]]);
				}
				//add a function that view a subscribed news list;
			}
		});
	}
}

/*
*left, right button click
*/
function clickButton(current_idx, fieldNames, typenames, typeDeques) {
	const	tabElements = document.querySelectorAll(".Tab");
	const	leftButtonElement = document.querySelector(".LeftButton");
	const	rightButtonElement = document.querySelector(".RightButton");
	let		next_deque;
	
	function getCurrentDeque() {
		return typeDeques[typenames[current_idx(-1, 0)]];
	}

	leftButtonElement.addEventListener("click", () => {
		const	current_deque = getCurrentDeque();
		if (current_deque.getCurrent() === 1)
		{
			current_idx(-1, -1);
			next_deque = getCurrentDeque();
			next_deque.setCurrent(next_deque.size());
		}
		else
		{
			next_deque = current_deque;
			next_deque.rotate(1);
		}
		setNewsList(fieldNames[current_idx(-1, 0)], next_deque);
		tabElements.forEach((content, idx) => {
			content.classList.toggle("fieldChosen", idx === current_idx(-1, 0));
		});
	});

		rightButtonElement.addEventListener("click", () => {
		const	current_deque = getCurrentDeque();
		if (current_deque.getCurrent() === current_deque.size())
		{
			current_idx(-1, 1);
			next_deque = getCurrentDeque();
			next_deque.setCurrent(1);
		}
		else
		{
			next_deque = current_deque;
			next_deque.rotate(-1);
		}
		setNewsList(fieldNames[current_idx(-1, 0)], next_deque);
		tabElements.forEach((content, idx) => {
			content.classList.toggle("fieldChosen", idx === current_idx(-1, 0));
		});
	});
}

/*
*subscribe button click
*/
function clickSubscribeButton(current_idx, typenames, typeDeques, subscribed_object) {
	const	subscribeButtonElement = document.querySelectorAll(".SubscribeButton");

	function getCurrentDeque() {
		return typeDeques[typenames[current_idx(-1, 0)]];
	}

	function showSnackbar() {
		const	snackBar = document.querySelector(".snackBar");
		snackBar.classList.add("show");
		setTimeout(() => {
			snackBar.classList.remove("show");
		}, 3000);
	}

	if (subscribeButtonElement)
	{
		subscribeButtonElement.forEach(element => {
			element.addEventListener("click", () => {
				const	current_deque = getCurrentDeque();
				const	current_news = current_deque.peekFront();
				if (current_news.isSubscribe) //구독 상태일 때 클릭 시
				{
					const	snackBar = document.querySelector(".snackBar");
					if (snackBar)
						snackBar.classList.remove("show"); //구독 누르고 바로 취소버튼 누를 시 스낵바 안 보이게 하기
					const	alertElement = document.querySelector(".Alert");
					if (alertElement)
					{
						const	spanElement = alertElement.getElementsByTagName("span")[0];
						if (spanElement)
						{
							spanElement.textContent = current_news.companyName;
							alertElement.classList.add("show");
							const	positiveButtonElement = alertElement.querySelector(".PositiveButton");
							const	negativeButtonElement = alertElement.querySelector(".NegativeButton");
							if (positiveButtonElement && negativeButtonElement)
							{
								positiveButtonElement.addEventListener("click", () => {
									current_news.isSubscribe = false;
									delete subscribed_object[current_news.companyName];
									 subscribed_object.length--;
									alertElement.classList.remove("show");
									setPressInfo(current_deque, ".PressNews");
									setPressInfo(current_deque, ".SubscribedNews");
								})
								negativeButtonElement.addEventListener("click", () => {
									alertElement.classList.remove("show");
								})
							}
						}
					}
				}
				else //구독 상태가 아닐 때 클릭 시
				{
					showSnackbar();
					current_news.isSubscribe = true;
					subscribed_object[current_news.companyName] = new Deque();
					subscribed_object[current_news.companyName].addRear(current_news);
					subscribed_object.length++;
					setPressInfo(current_deque, ".PressNews");
					setPressInfo(current_deque, ".SubscribedNews");
				}
			});
		});
	}
}

/*
*외부에서 사용할 함수 다른 추가적인 함수 생성되면 추가할 예정
*/
export	function	addEvents(typenames, typeDeques, subscribed_object) {
	const	fieldNames = ["all", "broad", "it", "english", "sports", "magazine", "region"];
	// 클로저를 사용하여 static 변수 선언했지만 addEvents는 한 번 호출하므로 의미가 없는 거 같기두...
	const	current_idx = (() => {
		let	i = 0;
		return (idx, move) => {
			if (idx === -1)
			{
				i = i + move;
				if (i < 0)
					i = typenames.length - 1;
				else if (i >= typenames.length)
					i = 0;
			}
			else
				i = idx;
			return (i);
		}
	})();

	refresh();
	clickTab(current_idx, typenames, typeDeques, subscribed_object);
	clickFieldTab(current_idx, typenames, typeDeques);
	clickButton(current_idx, fieldNames, typenames, typeDeques);
	clickSubscribeButton(current_idx, typenames, typeDeques, subscribed_object);
}
