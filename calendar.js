exports.getCurrentMonthCalendar = function() {

    const now = new Date();
    var year = now.getYear();
    if (year < 1000) {
      year += 1900
    }   
    const month = now.getMonth();
    const monthName = getMonthName(month);
  
    // get first day of the month
    const firstDayInstance = new Date(year, month, 1);
    const firstDay = firstDayInstance.getDay();
  
    // number of days in current month
    var days = getDays(month, year)
  
    return drawCal(firstDay + 1, days, monthName, year)
  }
  
  function drawCal(firstDay, lastDate, monthName, year) {
  
    var text = ""
  
    var weekDay = new Array(7)
    weekDay[0] = "S"
    weekDay[1] = "M"
    weekDay[2] = "T"
    weekDay[3] = "W"
    weekDay[4] = "T"
    weekDay[5] = "F"
    weekDay[6] = "S"
  
    var digit = 1
    var curCell = 1
  
    for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
      for (var col = 1; col <= 7; ++col) {
        if (digit > lastDate)
          break
        if (curCell < firstDay) {
          text += `&nbsp;&nbsp;&nbsp;&nbsp;`;
          curCell++
        } else {
          const digitLength = String(digit).length;
          if (digitLength < 2) {
            text += `&nbsp;`
          }
          text += `${digit}`;
          if(col!=7) {
            text += `&nbsp;&nbsp;`;
          }
          digit++
        }
      }
      text += '\n'
    }
  
    return {
      "month": monthName,
      "dates": text
    };
  }
  
  function leapYear(year) {
    return year % 4 == 0 ? true : false
  }
  
  function getDays(month, year) {
  
    var ar = new Array(12)
    ar[0] = 31 // January
    ar[1] = (leapYear(year)) ? 29 : 28 // February
    ar[2] = 31 // March
    ar[3] = 30 // April
    ar[4] = 31 // May
    ar[5] = 30 // June
    ar[6] = 31 // July
    ar[7] = 31 // August
    ar[8] = 30 // September
    ar[9] = 31 // October
    ar[10] = 30 // November
    ar[11] = 31 // December
  
    return ar[month]
  }
  
  function getMonthName(month) {
  
    var ar = new Array(12)
    ar[0] = "January"
    ar[1] = "February"
    ar[2] = "March"
    ar[3] = "April"
    ar[4] = "May"
    ar[5] = "June"
    ar[6] = "July"
    ar[7] = "August"
    ar[8] = "September"
    ar[9] = "October"
    ar[10] = "November"
    ar[11] = "December"
  
    return ar[month]
  }