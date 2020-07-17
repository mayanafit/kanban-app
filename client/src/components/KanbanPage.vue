<template>
  <div class="container my-3">
    <div class="row" id="main-page">
        <kanbanCard @dataMove="dataMove" @editSuccess="successEdit" @successDelete="deleteSuccess" @successAdd="addSuccess" v-for="(category, index) in dataFiltered" :key="index" :categoryData="category"></kanbanCard>
        <modalMove @moveSuccess="moveSuccess" v-if="showModal" :valueCategory="this.currentCategory" :valueId="this.currentId"></modalMove>
    </div>    
</template>

<script>
import kanbanCard from "./KanbanCard"
import modalMove from "./ModalMove"
export default {
    name: `kanbanPage`,
    data() {
        return {
            currentCategory: ``,
            currentId: ``,
            showModal: true
        }
    },
    props: [`dataFiltered`, `welcomeName`],
    computed: {
    },
    methods: {
        moveSuccess(value) {
            swal("Successfully move Task!", "", "success");
            this.$emit(`moveSuccess`)
        },
        dataMove(value1, value2, value3) {
            if (this.welcomeName == value3) {
                this.currentCategory = value1
                this.currentId = value2
            } else {
                this.showModal = false
                swal("You don't have access!", "", "error");
            }
        },
        successEdit() {
            this.$emit(`editSuccess`)
        },
        deleteSuccess() {
            this.$emit(`successDelete`)
        },
        addSuccess() {
            this.$emit(`successAdd`)
        }
    },
    components: {
        kanbanCard, modalMove
    }
}
</script>

<style>

</style>