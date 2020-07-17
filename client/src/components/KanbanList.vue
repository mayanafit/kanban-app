<template>
    <div>
        <editForm @closeEdit="closeEditPage" @editChange="changeButton" :valueTask="filteredTask" v-if="edit"></editForm>
        <div v-else class="content" id="taskList">
            <h5><b>{{filteredTask.title}}</b></h5>
            <p>{{filteredTask.description}}</p>
            <small>By {{filteredTask.User.name}}</small>
            <small>Updated at {{filteredTask.updatedAt}}</small>
            <div class="logoContent">
                <a @click="editButton(filteredTask.User.id)" role="button"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                <a @click="deleteInput(filteredTask.id, filteredTask.title)" role="button"><i class="fa fa-trash" aria-hidden="true"></i></a>
                <a @click="dataMove(filteredTask.category, filteredTask.id, filteredTask.User.name)" data-toggle="modal" data-target="#exampleModal" role="button"><i class="fa fa-align-justify" aria-hidden="true"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
import editForm from "./EditForm"
import axios from "axios"
export default {
    name: `kanbanList`,
    props: [`filteredTask`, `categoryName`],
    components: {
        editForm
    },
    data() {
        return {
            edit: false,
            testValue: ``
        }
    },
    computed: {
    },
    methods: {
        dataMove(value1, value2, value3) {
            this.$emit(`dataMove`, value1, value2, value3)
        },
        closeEditPage(value) {
            this.edit = value
            this.$emit(`editSuccess`)
        },
        changeButton(value) {
            this.edit = value
        },
        editButton() {
            this.edit = true
        },
        deleteInput(value1, value2) {
            this.$emit(`inputDelete`, value1, value2)
        }
    }
}
</script>

<style scoped>

</style>