import {Deque} from "./Deque.js";
import {setNewsList} from "./setData.js";

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
export	function	initNewsList(typenames, typeDeques) {
	const	dq = typeDeques[typenames[0]];
	setNewsList("all", dq.getCurrent(), dq.size(), dq.peekFront());
}
