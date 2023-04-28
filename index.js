// Your code here
// const array = ["Juan", "Castro", "SD", 21.40,]
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecords){
    return employeeRecords.map(function(element){
        return createEmployeeRecord(element);
    })
}

function createTimeInEvent(recordObj, dateStamp){
    const [date, hour] = dateStamp.split(" ");
    recordObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date,
    });
    return recordObj;
}

function createTimeOutEvent(recordObj, dateStamp){
    const [date, hour] = dateStamp.split(" ");
    recordObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date,
    })
    return recordObj
}

function hoursWorkedOnDate(recordObj, dateStamp){
    const timeInEvent = recordObj.timeInEvents.find(
        function(timeIn){
            return timeIn.date === dateStamp
        }
    );
    const timeOutEvent = recordObj.timeOutEvents.find(
        function(timeOut){
            return timeOut.date === dateStamp
        }
    );
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(recordObj, date){
    const hoursWorked = hoursWorkedOnDate(recordObj, date);
    return hoursWorked * recordObj.payPerHour;
}

function allWagesFor(recordObj) {
    let totalWages = 0;
    recordObj.timeInEvents.map((timeInEvent) => {
      const date = timeInEvent.date;
      totalWages += wagesEarnedOnDate(recordObj, date);
    });
    return totalWages;
  };

function calculatePayroll(arrayOfEmployee){
    const totalPayroll = arrayOfEmployee.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);
        return totalPayroll;
  }


// console.log(createEmployeeRecord(["Juan", "Castro", "SD", 21.40,]))