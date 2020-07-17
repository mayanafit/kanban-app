<template>
    <div id="home-before-login">
        <div id="imageHome">
            <img src="https://images.unsplash.com/photo-1586892478025-2b5472316f22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" width="750px" height="550px" alt="ini image">
        </div>
        <div id="contentHome">
            <h1>Looking for a place to organize your work?</h1>
            <br>
            <h1><span class="logoText">KANBAN</span> is the <b>right place</b> for you!</h1>
            <br>
            <h3>Go <b>register</b> yourself here.</h3>
            <button @click="toRegisterPage" type="button" class="btn btn-outline-dark">Register</button>
        </div>
    </div>
</template>

<script>
export default {
    name: `homepage`,
    data() {
        return {};
    },
    methods: {
        toRegisterPage() {
            this.$emit(`registerButton`, `register`)
        }
    }
}
</script>

<style>

</style>