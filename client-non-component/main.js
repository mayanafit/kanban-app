
function togglePassword(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token
  axios({
    method: `POST`,
    url: `http://localhost:3000/login/google`,
    data: {
        id_token
    }
  })
  .then(result => {
    localStorage.setItem(`access_token`, result.data.access_token)
    app.homeAfterLogin()
  })
  .catch(err => {
    console.log(err)
  })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

var app = new Vue({
  el: `#app`,
  methods: {
    addBacklog() {
      this.category = `Backlog`
      this.addFormBacklog = true
    },
    addOnprogress() {
      this.category = `On Progress`
      this.addFormOnprogress = true
    },
    cancelBacklog() {
      this.addFormBacklog = false
    },
    cancelOnprogress() {
      this.addFormOnprogress = false
    },
    loginForm() {
      this.registerPage = false
      this.loginPage = true
      this.homeBefore = false
    },
    registerForm() {
      this.registerPage = true
      this.loginPage = false
      this.homeBefore = false
    },
    homepage() {
      this.registerPage = false
      this.loginPage = false
      this.homeBefore = true
    },
    homeBeforeLogin() {
      this.homeBefore = true
      this.registerPage = false
      this.loginPage = false
      this.mainPage = false
      this.navBefore = true
      this.homeButton = true
    },
    homeAfterLogin() {
      this.homeBefore = false
      this.registerPage = false
      this.loginPage = false
      this.mainPage = true
      this.navBefore = false
      this.homeButton = false
      this.showTasks()
    },
    loginProcess() {
      axios({
        method: `POST`,
        url: `http://localhost:3000/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(response => {
        localStorage.setItem(`access_token`, response.data.access_token)
        this.homeAfterLogin()
        this.email = ""
        this.password = ""
      })
      .catch(err => {
        console.log(err)
      })
    },
    registerProcess() {
      axios({
        method: `POST`,
        url: `http://localhost:3000/register`,
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(response => {
        console.log(response)
        this.email = ""
        this.name = ""
        this.password = ""
      })
      .catch(err => {
        console.log(err)
      })
    },
    logoutProcess() {
      localStorage.clear()
      this.homeBeforeLogin()
      signOut()
    },
    showTasks() {
      axios({
        method: `GET`,
        url: `http://localhost:3000/tasks`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        // console.log(response)
        this.tasks = this.formattedTasks(response.data.data)
        this.userName = response.data.userName
      })
      .catch(err => {
        console.log(err)
      })
    },
    addTask() {
      axios({
        method: `POST`,
        url: `http://localhost:3000/tasks`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.title,
          description: this.description,
          category: this.category
        }
      })
      .then(response => {
        console.log(response)
        this.showTasks()
        this.addFormOnprogress = false
        this.addFormBacklog = false
        this.title = ``
        this.description = ``
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask(params) {
      axios({
        method: `DELETE`,
        url: `http://localhost:3000/tasks/${params}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        // console.log(response)
        this.showTasks()
      })
      .catch(err => {
        console.log(err)
      })
    },
    editTask(params) {
      axios({
        method: `GET`,
        url: `http://localhost:3000/tasks/${params}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        // console.log(response)
        this.title = response.data.title
        this.description = response.data.description
        // this.showTasks()
      })
      .catch(err => {
        console.log(err)
      })
    },
    formattedTasks(data) {
      data.forEach(task => {
        let date = new Date(task.updatedAt);
        let weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";
        let n = weekday[date.getDay()];
        task.updatedAt = `${n}, ${date.toLocaleTimeString()}`
      })
      return data
    }
  },
  computed: {
    firstName() {
      let words = this.userName.split(` `)
      return words[0]
    },
    doneTasks() {
      return this.tasks.filter(task => task.category === `Done`)
    },
    onProgressTasks() {
      return this.tasks.filter(task => task.category === `On Progress`)
    },
    todoTasks() {
      return this.tasks.filter(task => task.category === `To Do`)
    },
    backlogTasks() {
      return this.tasks.filter(task => task.category === `Backlog`)
    }
  },
  data: {
    homeBefore: true,
    loginPage: false,
    registerPage: false,
    mainPage: false,
    navBefore: true,
    homeButton: true,
    addFormBacklog: false,
    addFormOnprogress: false,
    name: ``,
    email: ``,
    password: ``,
    tasks: [],
    userName: ``,
    title: ``,
    description: ``,
    category: ``
  },
  created() {
    if (localStorage.access_token) {
      this.homeAfterLogin()
    } else {
      this.homeBeforeLogin()
    }
  },
  mounted() {

  }
})
