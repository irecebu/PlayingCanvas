function render(args) {
	var json = JSON.parse(args);
	console.log(typeof json);
	console.log(json);
};

exports.render = render;