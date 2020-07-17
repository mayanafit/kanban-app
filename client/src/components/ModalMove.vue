<template>
    <div class="modal" id="exampleModal" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Move task to:</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="buttonSet">
                <button @click="editTask(category)" class="btn btn-dark btn-sm btn-block" v-for="(category, index) in this.filterCategories" :key="index">{{category}}</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: `modalMove`,
    data() {
        return{
            categories: [`Backlog`, `To Do`, `On Progress`, `Done`],
            title: ``,
            description: ``
        }
    },
    props: [`valueCategory`, `valueId`],
    computed: {
        filterCategories() {
            return this.categories.filter(category => category != this.valueCategory)
        }
    },
    methods: {
        editTask(params) {
            
            axios({
                method: `GET`,
                url: `https://warm-falls-04827.herokuapp.com/tasks/${this.valueId}`,
                headers: {
                access_token: localStorage.access_token
                }
            })
            .then(response => {
                this.title = response.data.title
                this.description = response.data.description
                return axios({
                    method: `PUT`,
                    url: `https://warm-falls-04827.herokuapp.com/tasks/${this.valueId}`,
                    headers: {
                    access_token: localStorage.access_token
                    },
                    data: {
                        title: this.title,
                        description: this.description,
                        category: params,
                    }
                })
            })
            .then(response => {
                this.$emit(`moveSuccess`)
            })
            .catch(err => {
                let errorData = err.response.data.message
                console.log(errorData)
            })
        }
    }
}
</script>

<style>

</style>