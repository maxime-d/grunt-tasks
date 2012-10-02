/*
 * Task: phonegap
 * Description: PhoneGap CLI bridge
 * Dependencies: child_process
 */

module.exports = function(grunt) {
	var terminal = require("child_process").exec;

	grunt.registerMultiTask('phonegap', 'PhoneGap CLI bridge', function() {
		var options = this.data||{},
			path = options.path||'project/',
			binfolder = options.folder||'cordova/',
			bin = options.bin||'debug',
			command = path+binfolder+bin,
			done = this.async();

		terminal(command, function(error, stdout, stderr) {
			if (!error || error !== 'undefined') {
				grunt.log.writeln((bin).cyan+" executed.");
			}else{
				grunt.fail.warn('failed to execute '+(bin).red+'.')
				grunt.fail.warn((stderr).red);
			}
			done();
		});
	});
};
