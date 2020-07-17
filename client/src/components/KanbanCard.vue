<template>
    <div class="column">
        <div class="header">
            <span>{{categoryData.name}}</span>
            <div class="buttonHeader">
                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                <a @click="showAdd" role="button" v-if="buttonAdd"><i class="fa fa-plus" aria-hidden="true"></i></a>
                <a @click="closeAdd" role="button" v-else><i class="fa fa-minus" aria-hidden="true"></i></a>
            </div>
        </div>
        <div class="body">
            <addForm @addInput="addTask" v-if="add"></addForm>
            <kanbanList @dataMove="dataMove" @editSuccess="successEdit" @inputDelete="deleteTask" v-for="(task, index) in categoryData.data" :key="index" :filteredTask="task" :categoryName="categoryData.name"></kanbanList>
        </div>
        <div class="addSection">
            <h6>End of List</h6>
        </div>
    </div>
</template>

<script>
import kanbanList from "./KanbanList"
import addForm from "./AddForm"
import editForm from "./EditForm"
import axios from "axios"
export default {
    data() {
        return{
            tasks: [],
            add: false,
            buttonAdd: true,
            edit: false,
            valueMove: ``
        }
    },
    components: {
        kanbanList, addForm, editForm
    },
    props: [`categoryData`],
    computed: {
    },
    methods: {
        dataMove(value1, value2, value3) {
            // console.log(this.valueMove, `ini value move`)
            this.$emit(`dataMove`, value1, value2, value3)
        },
        successEdit() {
          this.$emit(`editSuccess`)  
        },
        closeAdd() {
            this.add = false,
            this.buttonAdd = true
        },
        showAdd() {
            this.add = true
            this.buttonAdd = false
        },
        addTask(params1, params2) {
            axios({
                method: `POST`,
                url: `http://localhost:3000/tasks`,
                headers: {
                access_token: localStorage.access_token
                },
                data: {
                title: params1,
                description: params2,
                category: this.categoryData.name
                }
            })
            .then(response => {
                console.log(response)
                swal("Success!", `Added task with title '${response.data.title}'`, "success");
                this.closeAdd()
                this.$emit(`successAdd`)
            })
            .catch(err => {
                let errorData = err.response.data.message
                errorData.forEach(element => {
                    swal("Empty Field!", `${element}`, "error");
                });
            })
        },
        deleteTask(value1, value2) {
            swal({
                title: "Are you sure?",
                text: `task '${value2}' will be deleted.`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Successfully delete task!", {
                        icon: "success",
                        });
                        return axios({
                            method: `DELETE`,
                            url: `http://localhost:3000/tasks/${value1}`,
                            headers: {
                            access_token: localStorage.access_token
                            }
                        })
                    }
                })
                .then(response => {
                    console.log(response)
                    this.$emit(`successDelete`)
                })
                .catch(err => {
                    console.log(err)
                    swal("You don't have access!", "", "error");
                })
        }
        
    }
}
</script>

<style>

</style>