async function checkOut(raw) {
  let token = fetchToken();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
  };

  let res = await fetch(
    "https://app.paynas.com:8443/api/attendance/checkout?ngsw-bypass=true",
    requestOptions
  );
  res = await res.json();
  // console.log(res);
  return res;
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
    "http://150.230.244.88:8000/paynas/login",
    requestOptions
  );
  let jsonRes = await res.json();
  // console.log(jsonRes);
  localStorage.setItem("paynasToken", jsonRes.token);

  return res.token;
}

async function checkIn(raw) {
  let token = fetchToken();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  let res = await fetch(
    "https://app.paynas.com:8443/api/attendance/checkin?ngsw-bypass=true",
    requestOptions
  );
  res = await res.json();
  // console.log(res);
  return res;
}

async function getTodayWorkingHours() {
  let token = fetchToken();
  // console.log("token ", token);
  let res = await fetch(
    "https://app.paynas.com:8443/api/attendance/checkin-checkout?ngsw-bypass=true",
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

async function fetchData() {
  let token = fetchToken();
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
// fetch it from local storage
function fetchToken() {
  let token = localStorage.getItem("paynasToken");
  return token;
}
