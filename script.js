let workingDaysList = [0, 1, 2, 3, 4]; // from su to th

async function fetchData() {
  let constToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViZDJmNjcyZmMyNjczZjZkM2Y2NDA5NmE0MGM1Yzg4ZDM5Y2M5YzdkYzU3OTRkMjBhOWM2YzA0ZmVmMTRlNGYyZDM0M2RiNTgzNGNhNmRhIn0.eyJhdWQiOiI3IiwianRpIjoiNWJkMmY2NzJmYzI2NzNmNmQzZjY0MDk2YTQwYzVjODhkMzljYzljN2RjNTc5NGQyMGE5YzZjMDRmZWYxNGU0ZjJkMzQzZGI1ODM0Y2E2ZGEiLCJpYXQiOjE3MTUxNzA4MTksIm5iZiI6MTcxNTE3MDgxOSwiZXhwIjoxNzQ2NzA2ODE5LCJzdWIiOiI1NTMxOCIsInNjb3BlcyI6W119.KzH0ymUz4lEIGSdCkjCtwzrDp8X1bl4dNqItsJEzD2JklRmVFVBnphULG_jd86XmQLc8Sk1RT3bP1sKcZ0smhpRPlaHHHjogXseymiUBUSCBp2LmAYv7iUzvqluvkGyrfOx2pEfCqxvkJR291hx1isLv22b0V2ZuKYpE1CLKJ4xzHVdR85k8CeOgZHeRvGWpXtax4Czqq15nXAY_rAYRZF0bicn4NWKzlcqd98PXOp2QBWuXMdONf-zOqwCSlqGKNC97-ZP4pD8jORBc0KLz-Y59ZTwyZHFa0-fa_0FiWnBZvWtmzhjImtrFWZKi9eeM2s2K3gEXomPItVQQtANc_rCNzBx13gLUGK67B2hEVBFCRmYj2_KPNzsx_UBqbSuqRYDEmrfcGKhPQpdt1QmAL600floWfBVfojs0xBcw0VO1ItOebWRmgfOtTg0Ese7gFVNDFKJ8rjvm9YP3tMz0fCkSNLtPS_s5JUKT4c-ynVL4sFiGdcWGeD49OQUmXF2dvAKRAiKsdpyo4qGBL6G-osY8VD_eFvzpVRkyKH8ESityOO3ge8RTOVlN-AzQSGhotZwpEnnW_7L0P2Myba7dWD7K3QTqXythIJ2qXxScpqXnOwIAqXlxePqhb3gd9YhuIHXwVuOTbxGSuWGsDJMuVGY_Cxik4NjsNfUNoz5-yU8";
  let token = localStorage.getItem("paynasToken");
  // console.log("token ", token);
  let res = await fetch(
    "https://app.paynas.com:8443/api/attendance/report?page=1&profile=&month=&year=&day=&search=&view_type=&ngsw-bypass=true",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9,ar-EG;q=0.8,ar;q=0.7,en-US;q=0.6",
        authorization: `Bearer ${token}`,
        "cache-control": "no-cache",
        locale: "en",
        platform: "browser",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-type": "2",
        cookie:
          '_hjSessionUser_2229173=eyJpZCI6ImFiNDRjZTU1LTU3ZDgtNWNlMS1hY2NmLTU3Yzg1Yjk5ODU3OCIsImNyZWF0ZWQiOjE3MDMxNTcxNTQzNzIsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.2.1310683589.1703157151; _ga_8TY6QZRME9=GS1.1.1704972789.2.1.1704974214.0.0.0; TS01d23f8d=018e98c8d0d6d337c835b22263eab0fb2bf59f7595709de70778edd89b7084aead42267687ba99f5253cc751f6195c5c0f6be09542; SL_G_WPT_TO=en; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; _hjSession_2229173=eyJpZCI6ImVkN2JmYjNlLTY4ZjMtNGMzOC05ZjM2LTc0NGJhNDAzYjk2MSIsImMiOjE3MTQ2NDk0NDYyOTcsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; _hjShownFeedbackMessage=true; SL_C_23361dd035530_SID={"a8bf2552c7e6c43a604c3a247f83132a3ccf6f30":{"sessionId":"N1F0l2dzsm7REyU2GuggI","visitorId":"iPDBpbWZQr8AIiWXUvslq"}}; TS12f34d56027=081e167aaaab20001179d3f76866cfab13ab37c99ec5c656ef3c527054d96070602b2edfe26e686e089d1907d911300093aa478a053547aef684f4c89aa05b7d959f8a418b0cc73ada2c9e1f60d91204a2e7e9f29e30b65b463ef6eb656ba6f9',
        Referer: "https://app.paynas.com:8443/overview",
        "Referrer-Policy": "strict-origin-when-cross-origin",
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
