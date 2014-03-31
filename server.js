var cluster = require('cluster');

// start a cluster the size of available CPU cores
if (cluster.isMaster) {
	var numCPUs = require('os').cpus().length;
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});

	// load periodic server
	// only 1 needed per-cluster
	var cron = require('./server/cron');

	// Run cron initially & at 1-minute interval
	var interval = setInterval(cron, 60000);
	cron();

} else {
	var app = require('./server/worker.js');
}