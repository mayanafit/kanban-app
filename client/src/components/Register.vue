<template>
    <div id="registerPage">
        <form @submit.prevent="registerProcess" id="registerForm">
            <h3>Register Page</h3>
            <div class="form-group">
                <label for="nameRegister">Your Name</label>
                <input v-model="name" type="text" class="form-control" id="nameRegister" placeholder="Adhitia Sofyan">
            </div>
            <div class="form-group">
                <label for="emailRegister">Email Address</label>
                <input v-model="email" placeholder="yourname@example.com" type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="passwordRegister">Password</label>
                <input v-model="password" placeholder="********" type="password" class="form-control" id="passwordRegister">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" @click="togglePassword(`passwordRegister`)" id="togglePass">
                <label class="form-check-label" for="togglePass">Show Password</label>
            </div>
            <button type="submit" class="btn btn-outline-dark">Register</button>
            <br><br><p>Already a user? Go Sign in <a @click="toLoginPage" role="button">here.</a></p>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: `register`,
    data() {
        return{
            name: ``,
            email: ``,
            password: ``
        }
    },
    methods: {
        togglePassword(id) {
            let x = document.getElementById(id);
            if (x.type === "password") {
            x.type = "text";
            } else {
            x.type = "password";
            }
        },
        toLoginPage() {
            this.$emit(`loginButton`, `login`)
        },
        registerProcess() {
            axios({
            method: `POST`,
            url: `https://warm-falls-04827.herokuapp.com/register`,
            data: {
            name: this.name,
            email: this.email,
            password: this.password
            }
            })
            .then(response => {
                swal("Successfully Registered!", "We'll direct you to our login page.", "success");
                this.name = ``  
                this.email = ``
                this.password = ``
                this.$emit(`toLoginPage`, `login`)
            })
            .catch(err => {
                let errorData = err.response.data.message
                errorData.forEach(element => {
                    swal("Empty Field!", `${element}`, "error");
                });
            })
        }
    }
}
</script>

<style>

</style>