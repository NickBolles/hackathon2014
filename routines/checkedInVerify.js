var SMS = require ("../app/smsManager");

/*  // will fire every 15 minutes
  var textSched = later.parse.text('every 15 min');

  // execute logTime one time on the next occurrence of the text schedule
  var timer = later.setTimeout(logTime, textSched);

  // execute logTime for each successive occurrence of the text schedule
  var timer2 = later.setInterval(logTime, textSched);

  // function to execute
  function logTime() {
    console.log(new Date());
  }

  // clear the interval timer when you are done
  timer2.clear();

*/
var cron = require('cron');
var mins1 = "0 */2 * * * *";
var secs5 = "*/5 * * * * *";
var cronJob = cron.job(mins1, function() {
	for (var i = 0; i< global.notCheckedIn.length;i++){
      var user = global.notCheckedIn[i];
      var email = user.get('phone')+'@';
      var carrier = user.get('carrier');
      if (carrier !== ""){
        var carrierAddress = global.c[carrier]['address'];
        email += carrierAddress;
        SMS.sendText(email,global.textMessage ,function(){});
      }
    };



	console.info('cron job completed');
});
cronJob.start();
console.info('cron job started');