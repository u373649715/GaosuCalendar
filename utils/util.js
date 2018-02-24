const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  mGetDate: mGetDate,
  initData: initData,
}

//这个月有多少天
function mGetDate(monthNum) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1 + monthNum;
  var d = new Date(year, month, 0);
  return d.getDate();
}

//这个月第一天是星期几
function mGetWeek(monthNum) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1 + monthNum;
  //console.log('yue:' + month);
  var d = new Date(year, month, 0);
  d.setDate(1);
  return d.getDay();
}

//这个月第一天是总第几天
function mGetTotalDays(monthNum) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1 + monthNum;
  //console.log('yue:' + month);
  var d = new Date(year, month, 0);
  d.setDate(1);
  return parseInt(d.getTime() / (1000 * 60 * 60 * 24));
}

function initData(shiftArray, busArray,laneArray,month){
  var monthDays = mGetDate(month);//当月有几天
  //当前月第一天星期几:
  var weekday =mGetWeek(month);//当月第一星期几
  var totalDays = mGetTotalDays(month);
  //console.log(totalDays);
  var nullday = weekday == 0 ? 6 : weekday - 1;
  var dayArray = [];
  if (nullday > 0) {
    for (var i = 0; i < nullday; i++) {
      dayArray[dayArray.length] = { message: 0, totalDays:0 }
    }
  }
  for (var i = 0; i < monthDays; i++) {
    dayArray[dayArray.length] = { message: i + 1, totalDays: totalDays++ }
  }
  var index = 0;
  var weekIndex = 0;
  var weekArray = [];
  var finalArray = [];
  for (var i = 0; i < dayArray.length; i++) {
    var shift = shiftArray[dayArray[i].totalDays % 5];
    var lane = laneArray[dayArray[i].totalDays % laneArray.length];
    weekArray[weekArray.length] = { day: dayArray[i].message, shift: shift, bus: busArray[dayArray[i].totalDays % 2], lane: lane };
    index++;
    if (index == 7) {
      index = 0;
      finalArray[finalArray.length] = { weekIndex: weekIndex, weekArray: weekArray };
      weekArray = [];
      weekIndex++;
    } else if (i == dayArray.length - 1) {
      var lastday = 7 - index;
      for (var n = 0; n < lastday; n++) {
        weekArray[weekArray.length] = { day: 0, shift: 0, bus: 0, lane:0 }
      }
      finalArray[finalArray.length] = { weekIndex: weekIndex, weekArray: weekArray };
    }
  }
  return finalArray;
}
