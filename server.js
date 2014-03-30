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

	// Run cron initially & at interval
	var time = process.env.CRON_INTERVAL || 120; // minutes
	var interval = setInterval(cron, time * 60000);
	cron();

} else {
	var app = require('./server/worker');
}