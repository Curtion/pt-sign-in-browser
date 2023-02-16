const storage = chrome.storage.sync;
let defaultJobs = [
  {
    name: 'hdarea',
    enable: true,
    status: 0,
    msg: ''
  },
  {
    name: 'mteam',
    enable: true,
    status: 0,
    msg: ''
  }
]

chrome.alarms.create("jobs", { when: Date.now(), periodInMinutes: 30 });
chrome.alarms.onAlarm.addListener(async () => {
  await runJobs()
});

async function runJobs(debug) {
  let jobs = await getJobs()
  for (let item of jobs) {
    if ((item.enable && item.status === 0) || debug) {
      console.log('开始执行任务：' + item.name)
      try {
        await eval(item.name + '()')
        item.msg = '成功'
        item.status = 1
        storage.set({ jobs })
      } catch (error) {
        item.status = 0
        item.msg = error
        storage.set({ jobs })
      }
    }
  }
}

// 获取任务列表及其状态
function getJobs() {
  return new Promise((resolve) => {
    storage.get('jobs', (res) => {
      if (Object.keys(res).length === 0) {
        storage.set({ jobs: defaultJobs })
        resolve(defaultJobs)
        return
      }
      defaultJobs = defaultJobs.map(item => {
        let job = res.jobs.find(job => job.name === item.name)
        if (job) {
          return Object.assign(item, job)
        }
        return item
      })
      storage.set({ jobs: defaultJobs })
      resolve(defaultJobs)
    })
  })
}

async function hdarea() {
  const url = 'https://www.hdarea.co/sign_in.php'
  const data = new FormData()
  data.append('action', 'sign_in')
  const options = {
    method: 'POST',
    credentials: 'include',
    body: data
  }
  try {
    let res = await fetch(url, options)
    if (res.status !== 200) {
      return Promise.reject("登录状态过期")
    }
    const text = await res.text()
    if (text.includes('重复')) {
      return Promise.resolve()
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

async function mteam() {
  const url = 'https://kp.m-team.cc'
  const options = {
    method: 'GET',
    credentials: 'include',
  }
  try {
    let res = await fetch(url, options)
    if (res.status !== 200) {
      return Promise.reject("登录状态过期")
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}