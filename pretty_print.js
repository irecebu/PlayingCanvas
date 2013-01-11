var def_config = {
	colon 	 : ':',
	new_line : '\n',
	o_paren  : '{',
	c_paren  : '}',
	o_array  : '[',
	c_array  : ']',
	coma 	 : ',',
	space    : ' '
};


var get_space = function (count, config) {
	
	var space = config.space;
	count = count * 4;
	for (var i = 0; i < count; i++) {
		space += config.space;
	}
	return space;
	
}; 

var prettify = function (obj, config) {
	
	var dfs = function() {
	
		while (stack.length != 0) {
			
			var present = stack.pop();
			var present_node = present[0]; // the name of the present node
			var expanding = present[1];
			var s = present[2];	//string
			var l = present[3]; //level
			var space = get_space(l, config);
		
			//doing regex replace of multiple '\n' with single '\n'
			// s = s.replace(/\n+/g, '\n'); 
			// s = s.replace(/(\<br\>)+/g,'<br><br>');
			
			// checking if child nodes need to be appended	
			if (typeof expanding == 'object') {
				
				// get the required number of space needed to intend
				space = get_space(l, config);
				
				if (Array.isArray(expanding)) {
					
					// string += space + present_node + ' : [\n';
					string += space + present_node + config.colon + config.o_array + config.new_line;
				
				} else {
				
					// string += space + present_node + ' : {\n';
					string += space + present_node + config.colon + config.o_paren + config.new_line;
				
				}
				
				// Reverse the keys to get the properties in order.
				var keys = Object.keys(expanding);
				keys.reverse();
				
				for (var i in keys) {
					
					space = get_space(l+1, config);
					var intend = '';
					
					if (i == 0) {
						// if i is the last property(0), there is no need to put a coma at the end
						
						if (Array.isArray(expanding[keys[i]])) {
					    		
							// intend = space + ']\n' + s;
							intend = space + config.c_array + config.new_line + s;

						
						} else if (typeof expanding[keys[i]] == 'object') {
						
							// intend = '\n' + space + '}\n' + s;
							intend = config.new_line + space + config.c_paren + config.new_line + s;
					
						} else {
							
							// intend =  '\n' +  s;
							intend = config.new_line + s;
							
						}
						
					} else { 
						
						if (Array.isArray(expanding[keys[i]])) {
							
							// intend = space + '],\n';
							intend = space + config.c_array + config.coma + config.new_line;
					
						} else if (typeof expanding[keys[i]] == 'object') {
					
							// intend =  space + '},\n';
							intend = space + config.c_paren + config.coma + config.new_line;
					
						} else { 
					
							// intend = ',\n';
							intend = config.coma + config.new_line;
					
						}
						
					}
					stack.push([ keys[i], expanding[keys[i]], intend, (l + 1) ]);
					
				}
			
			} else {
				
				// string += space + present_node + ' : ' + expanding + s ;
				string += space + present_node + config.colon + expanding + s;
				
			}
			
		}		
	
	};
	if (typeof config === 'undefined') {
		config = def_config;
	} 
	var object = obj[1];
	var object_name = obj[0];
	var stack = [];
	var string = '';
	stack.push([object_name, object, '', 1]);
	dfs();
	r = new RegExp((config.new_line+config.space+config.new_line)+);
	// string = string.replace(/((\<br\>)+(\&nbsp)+(\<br\>)+)+/g,'<br>');
	return string + get_space(1, config) + config.c_paren;
}

exports.pretty_print = prettify;


// var level = 1;
// // var result = prettify(['o1', o1, '', level]);
// var result = prettify(['o2', o2, '', level]);
// // var result = prettify( [ 'o3', o3 , '', level] );
// // var result = prettify( [ 'o4', o4 , '', level] );
// // var result = prettify(['o_online', o_online, '', level]);
// console.log('result::');
// result += get_space(level) + '}';
// console.log(result);

// var valid = /^\n/.test("\nhttp:");
// console.log(valid);

