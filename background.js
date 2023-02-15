chrome.alarms.create("jobs", { when: Date.now(), periodInMinutes: 100 });
chrome.alarms.onAlarm.addListener(() => {
  console.log('ok')
  sign()
});

function sign() {
  const url = 'https://www.hdarea.co/sign_in.php'
  const data = new FormData()
  data.append('action', 'sign_in')
  const options = {
    method: 'POST',
    credentials: 'include',
    body: data
  }
  fetch(url, options).then(res => {
    console.log(res)
  })
}
// https://www.hdarea.co/takelogin.php POST
// FormData  username password
