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

function calculateTotalTime(bookings) {
  let totalHours = 0;
  let totalMinutes = 0;
  let thisWeekSundayIs = getCurrentWeekSunday();
  if (bookings && bookings.length <= 0) {
    return;
  }
  bookings?.forEach((booking) => {
    // Check if checkout is null
    const dayDate = new Date(`${booking.date}T${booking.checkin}`);
    if (dayDate >= thisWeekSundayIs) {
      if (booking.checkout !== null && booking.checkin !== null) {
        if (workingDaysList.includes(dayDate.getDay())) {
          const checkinTime = new Date(`2000-01-01T${booking.checkin}`);
          const checkoutTime = new Date(`2000-01-01T${booking.checkout}`);

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

  return { hours: totalHours, minutes: totalMinutes };
}

fetchData().then((res) => {
  // console.log(res.data);
  let result = calculateTotalTime(res.data);
  document.getElementById("totalHours").innerHTML =
    result.hours + ":" + result.minutes;
});

function getCurrentWeekSunday() {
  // Get the current date
  const currentDate = new Date();
  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const currentDayOfWeek = currentDate.getDay();
  // Calculate the number of days to subtract to get to the previous Sunday
  const daysToSubtract = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
  // Calculate the date of the previous Sunday
  const currentSunday = new Date(currentDate);
  currentSunday.setDate(currentSunday.getDate() - daysToSubtract);
  return currentSunday;
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
