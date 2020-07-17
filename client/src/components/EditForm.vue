<template>
    <div class="formEdit">
            <a @click="changeEdit" role="button"><i class="fa fa-times" aria-hidden="true"></i></a>
        <form @submit.prevent="editTask">
            <label for="titleEdit">Title</label><br>
            <input v-model="title" type="text" class="form-control" name="titleEdit" id="titleEdit">
            <label for="descriptionEdit">Description</label><br>
            <textarea v-model="description" name="descriptionEdit" class="form-control" id="descriptionEdit" cols="20" rows="2"></textarea>
            <button type="submit" class="btn btn-secondary btn-sm my-2">Edit</button>
        </form>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: `editForm`,
    data() {
        return {
            title: this.valueTask.title,
            description: this.valueTask.description
        }
    },
    props: [`valueTask`],
    methods: {
        changeEdit() {
            this.$emit(`editChange`, false)
        },
        editTask() {
            axios({
                method: `PUT`,
                url: `https://warm-falls-04827.herokuapp.com/${this.valueTask.id}`,
                headers: {
                access_token: localStorage.access_token
                },
                data: {
                    title: this.title,
                    description: this.description
                }
            })
            .then(response => {
                // console.log(response)
                swal("Success!", `Updated task with title ${response.data.title}`, "success");
                this.$emit(`closeEdit`, false)
            })
            .catch(err => {
                // console.log(err.response.data)
                let errorData = err.response.data.message
                if (Array.isArray(errorData)) {
                    errorData.forEach(element => {
                        swal("Empty Field!", `${element}`, "error");
                    });
                } else {
                    swal("You don't have access!", "", "error");
                }
                this.$emit(`closeEdit`, false)
            })
        }
    }
}
</script>

<style scope>
    .formEdit > a > i {
        display: flex;
        justify-content: flex-end;
        font-size: 20px;
    }

    .formEdit > a > i:hover {
        display: flex;
        justify-content: flex-end;
        font-size: 22px;
    }
</style>