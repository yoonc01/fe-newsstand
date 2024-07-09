import {Deque} from "./Deque.js";
import {setFieldTab, setPressInfo, setMain, setSub} from "./setData.js";

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
* 생성된 deque으로 미리 뉴스 세팅
*/
export	function	initNewsList(typeDeques) {
	setFieldTab("all", typeDeques["종합/경제"]);
	setFieldTab("broad", typeDeques["방송/통신"]);
	setFieldTab("it", typeDeques["IT"]);
	setFieldTab("english", typeDeques["영자지"]);
	setFieldTab("sports", typeDeques["스포츠/연예"]);
	setFieldTab("magazine", typeDeques["매거진/전문지"]);
	setFieldTab("region", typeDeques["지역"]);
	setPressInfo(typeDeques["종합/경제"]);
	setMain(typeDeques["종합/경제"]);
	setSub(typeDeques["종합/경제"]);
}
