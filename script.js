let workingDaysList = [0, 1, 2, 3, 4]; // from su to th

function compareDates(todaysDate) {
  function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  let datesResults = getCurrentWeekSunday();
  let thisWeekSundayIs = datesResults.firstday;
  let thisWeekThursdayIs = datesResults.lastday;
  const sunday = stripTime(thisWeekSundayIs);
  const thursday = stripTime(thisWeekThursdayIs);
  const thisDayDate = stripTime(todaysDate);

  // Compare the dates
  return thisDayDate <= thursday && thisDayDate >= sunday;
}
function calculateTotalTime(checkinDataList) {
  let totalHours = 0;
  let totalMinutes = 0;

  let workingDaysCount = 0;
  if (checkinDataList && checkinDataList.length <= 0) {
    return;
  }
  checkinDataList?.forEach((checkinEntry) => {
    // Check if checkout is null
    const dayDate = new Date(`${checkinEntry.date}T${checkinEntry.checkin}`);

    if (compareDates(dayDate)) {
      if (checkinEntry.checkout !== null && checkinEntry.checkin !== null) {
        if (workingDaysList.includes(dayDate.getDay())) {
          const checkinTime = new Date(`2000-01-01T${checkinEntry.checkin}`);
          const checkoutTime = new Date(`2000-01-01T${checkinEntry.checkout}`);
          workingDaysCount += 1;
          const diffMilliseconds = checkoutTime - checkinTime;
          const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

          const hours = Math.floor(diffMinutes / 60);
          const minutes = diffMinutes % 60;

          totalHours += hours;
          totalMinutes += minutes;
        }
      }
    }
  });

  // Convert excess minutes to hours
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return {
    hours: totalHours,
    minutes: totalMinutes,
    workingDaysCount: workingDaysCount,
  };
}

function getAndBuild() {
  fetchData().then((res) => {
    // console.log(res.data);
    let result = calculateTotalTime(res.data);
    document.getElementById("totalHours").innerHTML =
      "Total Working Hours: " + result.hours + ":" + result.minutes;
    document.getElementById("workingDaysCount").innerHTML =
      "Working Days Count: " + result.workingDaysCount;
  });
  getTodayWorkingHours().then((res) => {
    // console.log(res);
    let result = convertToMinuts(res.data.working_hours);
    document.getElementById("todaysWorkingHours").innerHTML =
      "Today's Working Hours: " + result.hours + ":" + result.minutes;
    // if(res.data.checkin && )
  });
}
// function hideCheckInOrOutBTN(id) {
//   document.getElementById(id).hidden = true;
// }

function getCurrentWeekSunday() {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));

  return { firstday: firstday, lastday: lastday };
}

function onLoginFunction() {
  let form = document.getElementById("loginForm");
  let username = form["email"].value;
  let password = form["password"].value;
  login({ email: username, password: password }).then((token) => {
    window.location.href = `./index.html`;
    fetchData();
  });
  // console.log(username, password);
}

const closeBTN = document.getElementById("close-btn");

// Add a click event listener
closeBTN.addEventListener("click", () => {
  window.close();
});
// Get the button by its ID
const myButton = document.getElementById("Submit");

// Add a click event listener
myButton.addEventListener("click", () => {
  onLoginFunction();
});
// Get the button by its ID
const refresh = document.getElementById("Refresh");

// Add a click event listener
refresh.addEventListener("click", () => {
  document.getElementById("totalHours").innerHTML = "";
  document.getElementById("workingDaysCount").innerHTML = "";
  document.getElementById("todaysWorkingHours").innerHTML = "";

  getAndBuild();
});
const checkInn = document.getElementById("check-in");

// Add a click event listener
checkInn.addEventListener("click", () => {
  let token = localStorage.getItem("paynasToken");
  const raw = JSON.stringify({
    latitude: 29.9829891,
    longitude: 31.3248932,
    status: 2,
  });
  checkIn(raw, token).then((res) => {
    console.log("res: ", res);
  });
});
const checkOutt = document.getElementById("check-out");

// Add a click event listener
checkOutt.addEventListener("click", () => {
  let token = localStorage.getItem("paynasToken");

  const raw = JSON.stringify({
    latitude: 29.9829891,
    longitude: 31.3248932,
    status: 2,
  });

  checkOut(raw, token).then((res) => {
    console.log("res: ", res);
  });
});

window.addEventListener("load", async function () {
  getAndBuild();

  // console.log(result);
});

function convertToMinuts(working_hours) {
  const integerPart = Math.floor(working_hours);

  const fractionalPart = working_hours - integerPart;
  const minutes = (fractionalPart * 60) / 100;

  return {
    hours: integerPart.toString(),
    minutes: getFirstTwoDecimalDigits(minutes),
  };
}

function getFirstTwoDecimalDigits(number) {
  const numberString = number.toString();

  const decimalIndex = numberString.indexOf(".");

  if (decimalIndex === -1) {
    return "00";
  }

  const decimals = numberString.substring(decimalIndex + 1, decimalIndex + 3);

  return decimals.padEnd(2, "0");
}

// TEST
// const toastTrigger = document.getElementById("liveToastBtn");
// const toastLiveExample = document.getElementById("liveToast");
// if (toastTrigger) {
//   toastTrigger.addEventListener("click", () => {
//     const toast = new bootstrap.Toast(toastLiveExample);

//     toast.show();
//   });
// }
