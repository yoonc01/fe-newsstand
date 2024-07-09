import {Deque} from "./Deque.js"

/*
* 외부에서 data를 받아와 typeDeques에 뉴스 타입별로 deque 생성 및 저장
*/
export	function	initData(data, typeDeques) {
	data.forEach(item => {
		const	type = item.type;

		if (!typeDeques[type]) {
			typeDeques[type] = new Deque();
		}

		item.company.forEach(company => {
			typeDeques[type].addRear(company);
		});
	});
}

/*
*	필드 탭 선택 시 보이는 오른쪽 숫자(현재 칸/ 총 보유 칸) setting
*/
function	setFieldTab(fieldName, Deque) {
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
* 생성된 deque으로 미리 뉴스 세팅
*/
export	function	setNewsList(typeDeques) {
	setFieldTab("all", typeDeques["종합/경제"]);
	setFieldTab("broad", typeDeques["방송/통신"]);
	setFieldTab("it", typeDeques["IT"]);
	setFieldTab("english", typeDeques["영자지"]);
	setFieldTab("sports", typeDeques["스포츠/연예"]);
	setFieldTab("magazine", typeDeques["매거진/전문지"]);
	setFieldTab("region", typeDeques["지역"]);
}
