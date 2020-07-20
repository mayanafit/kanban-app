<template>
  <div id="loginPage">
    <form @submit.prevent="loginProcess" id="loginForm">
        <h3>Login Page</h3>
        <div class="form-group">
            <label for="emailLogin">Email Address</label>
            <input v-model="email" type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="yourname@example.com">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="passwordLogin">Password</label>
            <input v-model="password" placeholder="********" type="password" class="form-control" id="passwordLogin">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" @click="togglePassword(`passwordLogin`)" id="togglePass">
            <label class="form-check-label" for="togglePass">Show Password</label>
        </div>
            <button type="submit" class="btn btn-outline-dark">Sign in</button><br><br>
            <!-- diluar form untuk google -->
            <p>or login through:</p>
            <GoogleLogin id="googleButton" :params="params" :onSuccess="onSuccess"><img src="google_logo.png" width="30px" alt=""></GoogleLogin>
            <br>
            <p>Don't have account? register <a @click="toRegisterPage" role="button">here.</a></p>
        </form>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import axios from "axios"
export default {
    name: `login`,
    data() {
        return {
            email: ``,
            password: ``,
            params: {
                    client_id: process.env.CLIENT_ID
                },
            renderParams: {
                width: 160,
                height: 30,
                longtitle: false
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        onSuccess(googleUser) {
            // console.log(googleUser);
            let id_token = googleUser.getAuthResponse().id_token
                axios({
                    method: `POST`,
                    url: `https://warm-falls-04827.herokuapp.com/login/google`,
                    data: {
                        id_token
                    }
                })
                .then(result => {
                    localStorage.setItem(`access_token`, result.data.access_token)
                    swal("Successfully Login", "We'll direct you to our page.", "success");
                    this.$emit(`inputLogin`, false, ``)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        togglePassword(id) {
            let x = document.getElementById(id);
            if (x.type === "password") {
            x.type = "text";
            } else {
            x.type = "password";
            }
        },
        toRegisterPage() {
            this.$emit(`buttonRegister`, `register`)
        },
        loginProcess() {
            axios({
            method: `POST`,
            url: `https://warm-falls-04827.herokuapp.com/login`,
            data: {
            email: this.email,
            password: this.password
            }
            })
            .then(response => {
                localStorage.setItem(`access_token`, response.data.access_token)
                console.log(localStorage.access_token)
                swal("Successfully Login", "We'll direct you to our page.", "success");
                this.$emit(`inputLogin`, false, ``)
            })
            .catch(err => {
                swal("Invalid Email or Password!", "Please check again.", "warning");
                // console.log(err)
            })
        }
    }
}
</script>

<style scope>
    #googleButton {
        width: 100px;
        height: 40px;
        margin-bottom: 10px;
    }
</style>