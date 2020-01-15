

export function getDateNow() {
var today = new Date();
var date =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;
return Number(new Date(dateTime)) / 1000;
}

export function daysToSeconds(days: number){
// number of seconds in a day:
// 24 hours a day
// 60 minutes in 1 hour
// 60 seconds in 1 minute
return days * 24 * 60 * 60;
}