// load UPPERCASE.JS.
require('./UPPERCASE.JS-COMMON.js');
require('./UPPERCASE.JS-NODE.js');

RUN(function() {
	'use strict';

	var
	// port
	port = 8813;

	INIT_OBJECTS();

	// don't resource caching.
	CONFIG.isDevMode = true;

	RESOURCE_SERVER({
		port : port,
		rootPath : __dirname
	}, function(requestInfo) {
		if (requestInfo.uri === '') {
			requestInfo.uri = 'index.html';
		}
	});

	console.log('Fit server running. - http://localhost:' + port);
});
