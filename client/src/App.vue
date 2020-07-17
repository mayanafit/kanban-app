<template>
  <div>
    <navbar :welcomeName="userName" @buttonLogout="logoutProcess" @buttonHome="changeToHome" @buttonLogin="changeToLogin" :statusHome="currentPage"></navbar>
    <div v-if="beforeLogin">
      <login @inputLogin="inputLogin" @buttonRegister="changeToRegister" v-if="currentPage === `login`"></login>
      <register @toLoginPage="changeToLogin" @loginButton="changeToLogin" v-else-if="currentPage === `register`"></register>
      <homepage @registerButton="changeToRegister" v-else-if="currentPage === `homepage`"></homepage>
    </div>
    <kanbanPage @moveSuccess="getTasks" :welcomeName="userName" @editSuccess="getTasks" @successDelete="getTasks" @successAdd="getTasks" :dataFiltered="categories" v-else-if="!beforeLogin"></kanbanPage>
  </div>
</template>

<script>
import navbar from "./components/Navbar"
import login from "./components/Login"
import register from "./components/Register"
import homepage from "./components/Homepage"
import kanbanPage from "./components/KanbanPage"
import axios from "axios"
export default {
  name: `App`,
  data() {
    return {
      beforeLogin: true,
      currentPage: `homepage`,
      email: ``,
      password: ``,
      tasks: [],
      categories: [
        {
          name: `Backlog`,
          data: []
        },
        {
          name: `To Do`,
          data: []
        },
        {
          name: `On Progress`,
          data: []
        },
        {
          name: `Done`,
          data: []
        }
      ],
      userName: ``
    };
  },
  created(){
    if(localStorage.access_token) {
      this.beforeLogin = false
      this.currentPage = ``
      this.showTasks()
    } else {
      this.beforeLogin = true
    }
  },
  components: {
    navbar, login, register, homepage, kanbanPage
  },
  methods: {
    formattedTasks(data) {
      data.forEach(task => {
        let date = new Date(task.updatedAt);  
        let n = date.toLocaleString()
        task.updatedAt = n
      })
      return data
    },
    getTasks() {
      this.showTasks()
    },
    inputLogin(statusBeforeLogin, statusCurrentPage) {
      this.beforeLogin = statusBeforeLogin
      this.currentPage = statusCurrentPage
      this.showTasks()
    },
    changeToLogin(value) {
      this.currentPage = value
    },
    changeToHome(value) {
      this.currentPage = value
    },
    changeToRegister(value) {
      this.currentPage = value
    },
    logoutProcess(value) {
      this.currentPage = value
      this.beforeLogin = true
    },
    showTasks() {
      this.tasks = []
      this.categories = [
        {
          name: `Backlog`,
          data: []
        },
        {
          name: `To Do`,
          data: []
        },
        {
          name: `On Progress`,
          data: []
        },
        {
          name: `Done`,
          data: []
        }
      ]
      axios({
        method: `GET`,
        url: `https://warm-falls-04827.herokuapp.com/tasks`,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        // console.log(response)
        this.tasks = this.formattedTasks(response.data.data)
        this.userName = response.data.UserId
        for(let i = 0; i < this.tasks.length; i++) {
          for (let j = 0; j < this.categories.length; j++) {
            if (this.tasks[i].category === this.categories[j].name) {
              this.categories[j].data.push(this.tasks[i])
            }
          }
        }
      })
      .catch(err => {
        console.log(err, `ini error`)
      })
    }
  }
};
</script>

<style scoped>
</style>

