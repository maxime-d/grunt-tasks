# Grunt-tasks

3 tasks executable with grunt (https://github.com/gruntjs/grunt)

* handlebars : Compile handlebars templates
* phonegap : PhoneGap CLI bridge
* testflight : Upload build to TestFlightApp


```
# Load grunt tasks
grunt.loadTasks('tasks');
```

## handlebars

```
TODO
```

## phonegap

```
TODO
```

## testflight

Check testflight API : https://testflightapp.com/api/doc/

### Installation
```
# In your Gruntfile.js
grunt.initConfig({
	testflight: {
    upload: {
      api_token: "api_token_keys",
      team_token: "api_team_token_keys",
    	file: 'android/build/apk/debug-unaligned.apk' //path where is file for upload build
    }
  }
}
```