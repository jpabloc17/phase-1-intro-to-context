const array = ["Juan", "Castro", "SD", 21.4];
const timeInArray = "2018-01-01 2000";
const timeOutArray = "2018-01-01 2300";

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRecords) {
  return employeeRecords.map(function (element) {
    return createEmployeeRecord(element);
  });
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  const timeInEvent = employeeRecord.timeInEvents.find((element) => {
    return element.date === dateStamp;
  });

  const timeOutEvent = employeeRecord.timeOutEvents.find((element) => {
    return element.date === dateStamp;
  });

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let totalWages = 0;
  employeeRecord.timeInEvents.map((timeInEvent) => {
    const date = timeInEvent.date;
    totalWages += wagesEarnedOnDate(employeeRecord, date);
  });
  return totalWages;
}

function calculatePayroll(arrayOfEmployeeRecords) {
  const totalPayroll = arrayOfEmployeeRecords.reduce(
    (total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    },
    0
  );
  return totalPayroll;
}
