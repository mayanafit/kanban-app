function togglePassword(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }



var app = new Vue({
  el: `#app`,
  data: {
    homeBefore: true,
    loginPage: false,
    registerPage: false,
    mainPage: false,
    welcomeUser: false,
    alreadyUser: true,
    loginButton: true,
    logoutButton: false,
    backlog: `Backlog`,
    datas: [
      {
        id: 1,
        title: `Vue with mas Fiq`,
        description: `Belom paham tolong.`,
        category: `Backlog`
      },
      {
        id: 2,
        title: `Cyclelife with mas Dzakki`,
        description: `Belom paham tolong apalagi ini.`,
        category: `To Do`
      },
      {
        id: 3,
        title: `Socket with kak Nad`,
        description: `Belom paham tolong tolongin apalagi ini.`,
        category: `On Progress`
      },
      {
        id: 4,
        title: `Porto Kanban`,
        description: `Dah kelar wkwkwkwkwk`,
        category: `Done`
      }
    ]
  }
})
