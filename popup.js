function restoreOptions() {
  chrome.storage.sync.get("jobs", res => {
    const jobs = res.jobs
    jobs.forEach(({ name, status, msg }) => {
      setStatus(name, status, msg)
    })
  })
}

function setStatus(name, status, msg) {
  const currDate = new Date().getUTCDate()
  let statusEl = document.getElementById(name)
  if (statusEl) {
    if (msg !== '') {
      statusEl.innerText = msg
      statusEl.style.color = 'red'
      return
    }
    if (status < currDate) {
      statusEl.innerText = status + '日'
      statusEl.style.color = 'yellow'
      return
    }
    if (status === currDate) {
      statusEl.innerText = status + '日'
      statusEl.style.color = 'green'
      return
    }
  }
}


document.addEventListener("DOMContentLoaded", restoreOptions);