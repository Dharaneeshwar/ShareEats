export const timeTill = (end) => {
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;

  var now = new Date();
  var distance = end - now;

//   var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  if (hours > 0){
    return `${hours} hours and ${minutes} minutes`;  
  } else if (minutes > 0) {
      return `${minutes} minutes`;
  } else if (seconds > 0) {
      return `less than a minute`;
  }
};

export function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  //   var aDay = 24*60*60*1000;
  