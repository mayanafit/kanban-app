<template>
    <div id="navbar">
        <nav id="nav">
            <div class="logoText" id="logo">
                <a role="button"><h2>KANBAN</h2></a>
            </div>
            <div id="homeButton">
                <a @click="toHomePage" v-if="statusHome" role="button"><i class="fa fa-home"></i></a>
            </div>  
            <div id="welcomeUser">
                <div v-if="statusHome">
                    <span class="font-weight-bold">Already a user? Go</span>
                    <button @click="toLoginPage" class="btn btn-light btn-sm font-weight-bold">Sign in</button>
                </div>
                <div v-else>
                    <span class="font-weight-bold">Welcome, {{firstName}}</span>
                    <button @click="logoutProcess" class="btn btn-light btn-sm font-weight-bold">Sign out</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: `navbar`,
    data() {
        return {
        };
    },
    methods: {
        toLoginPage() {
            this.$emit(`buttonLogin`, `login`)
        },
        toHomePage() {
            this.$emit(`buttonHome`, `homepage`)
        },
        logoutProcess() {
            localStorage.clear()
            this.$emit(`buttonLogout`, `homepage`)
        }
    },
    props: [`statusHome`, `welcomeName`],
    computed: {
        firstName() {
            let name = this.welcomeName.split(` `)
            return name[0]
        }
    }
};
</script>

<style scoped>
</style>
