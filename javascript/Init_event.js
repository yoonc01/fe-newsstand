function refresh() {
	const titleElements = document.getElementsByClassName("Title");
	titleElements[0].addEventListener("click", function() {
		location.reload();
	});
}

export	function	initEvent() {
	refresh();
}
