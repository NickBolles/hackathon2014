var sms = require ("../app/smsManager");

var cron = require('cron');
var hr2 = "0 0 */2 * * *";
var mins10 = "0 */10 * * * *";
var secs5 = "*/5 * * * * *";
var checkedInVerify = "0 */1 * * * *";
//var cronJob = cron.job(hr2, function() {
//	sms.sendText((email,global.textMessage ,function(){}));
//
//	console.info('cron job completed');
//});
//cronJob.start();
