/*
 * Task: testflight
 * Description: Upload build to testflight
 * Dependencies: child_process
 */

module.exports = function(grunt) {
	var terminal = require("child_process").exec;

	grunt.registerMultiTask('testflight', 'Upload build to testflight', function() {
		var options = this.data || {},
			m = {
				api_token : options.api_token,
				team_token : options.team_token,
				notes : options.notes || ((new Date()).getTime()),
				distribution_lists : options.distribution_lists || false,
				notify : options.notify || false,
				replace : options.replace || false,
				file : options.file,
				dsym : options.dsym
			},
			done = this.async();

		var instructions = ['curl --write-out "\nstatusCode: %{http_code}" -v http://testflightapp.com/api/builds.json','file=@'+m.file,'api_token='+m.api_token,'team_token='+m.team_token,'notes='+m.notes]
		if(m.distribution_lists) instructions.push('distribution_lists='+m.distribution_lists);
		if(m.notify) instructions.push('notify='+m.notify);
		if(m.replace) instructions.push('replace='+m.replace);
		if(m.dsym) instructions.push('dsym=@'+m.dsym);
		var command = instructions.join(" -F ");

		terminal(command, function(error, stdout, stderr) {
			var statusCode = stdout.substring(stdout.indexOf("statusCode")+12);
			if ((!error || error !== 'undefined') && statusCode==200) {
				grunt.log.writeln((m.file).cyan+" sent.");
				grunt.log.writeln((stdout).green);
			}else{
				grunt.fail.warn('failed to send '+(m.file).red+' with statusCode : '+(statusCode).red+'.');
				grunt.fail.warn((stdout).red);
			}
			done();
		});
	});
};
