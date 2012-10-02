/*
 * Task: Handlebars
 * Description: Compile handlebars templates
 * Dependencies: handlebars
 */

module.exports = function(grunt) {
	var handlebars = require('handlebars');

	function compile(name,template,options) {
		var output = [];
		output.push('(function() {\n');
		output.push('  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};\n');
		output.push('  templates[\'' + name + '\'] = template(' + handlebars.precompile(template, options) + ');\n');
		output.push('})();');
		return output.join("");
	};

	grunt.registerMultiTask('handlebars', 'Precompile Handlebars template', function() {
		var options = this.data.options||[];
		var dest = this.file.dest||"view";
		var src = this.file.src||"templates";
		var suffix = this.data.suffix||"handlebars";
		var runtime = this.data.runtimesuffix||"js";
		grunt.file.recurse(src, function(abspath, rootdir, subdir, filename){
			if(grunt.file.isMatch("*."+suffix, filename)){
				try{
					var folder= subdir != null? dest+"/"+subdir:dest+"/";
					var data = grunt.file.read(abspath);
					var regex = new RegExp(".("+suffix+")$","i");
					var compiled = compile(filename.replace(regex,""), data, options);
					grunt.file.write(folder+filename.replace(regex,"."+runtime), compiled);
					grunt.log.writeln("Template "+(filename).cyan+" compiled and drop in "+(folder).green+".");
				}catch(e){
					grunt.log.error(e);
					grunt.fail.warn('failed to compile '+(filename).red+'.');
				}
			}
		});
	});
};
