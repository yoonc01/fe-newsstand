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
export	function	initNewsList(typeDeques, typename) {
	setNewsList("all", typeDeques[typename[0]]);
	setNewsList("broad", typeDeques[typename[1]]);
	setNewsList("it", typeDeques[typename[2]]);
	setNewsList("english", typeDeques[typename[3]]);
	setNewsList("sports", typeDeques[typename[4]]);
	setNewsList("magazine", typeDeques[typename[5]]);
	setNewsList("region", typeDeques[typename[6]]);

}
