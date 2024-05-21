let workingDaysList = [0, 1, 2, 3, 4]; // from su to th

async function fetchData() {
  let token = localStorage.getItem("paynasToken");
  // console.log("token ", token);
  let res = await fetch(
    "https://app.paynas.com:8443/api/attendance/report?page=1&profile=&month=&year=&day=&search=&view_type=&ngsw-bypass=true",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: `Bearer ${token}`,
      },
      body: null,
      method: "GET",
    }
  );
  res = await res.json();
  return res;
}
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
}

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

async function login(body) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  let res = await fetch(
    "https://blue-green-crocodile-kilt.cyclic.app/paynas/login",
    requestOptions
  );
  let jsonRes = await res.json();
  // console.log(jsonRes);
  localStorage.setItem("paynasToken", jsonRes.token);

  return res.token;
}

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

  getAndBuild();
});

window.addEventListener("load", async function () {
  getAndBuild();
});
