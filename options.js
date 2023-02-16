function restoreOptions() {
  chrome.storage.sync.get("jobs", res => {
    const jobs = res.jobs
    let hdarea = document.getElementById("hdarea")
    let mteam = document.getElementById("mteam")
    jobs.forEach(({ name, enable }) => {
      if (name == "hdarea") {
        hdarea.checked = enable
      } else if (name == "mteam") {
        mteam.checked = enable
      }
    })
    hdarea.onchange = function (e) {
      saveCheckbox(e, "hdarea", jobs)
    }
    mteam.onchange = function (e) {
      saveCheckbox(e, "mteam", jobs)
    }
  })
}

function saveCheckbox(e, name, jobs) {
  jobs.some(item => {
    if (item.name == name) {
      item.enable = e.target.checked
      return true
    }
  })
  chrome.storage.sync.set({ jobs })
}

document.addEventListener("DOMContentLoaded", restoreOptions);