<template>
    <div class="formAdd">
        <form @submit.prevent="addTask">
            <label for="title">Title</label><br>
            <input v-model="title" type="text" class="form-control" name="title" id="title" placeholder="Bugs in Product A">
            <label for="description">Description</label><br>
            <textarea v-model="description" name="description" class="form-control" id="description" cols="20" rows="2" placeholder="When clicked, ads show up, user doesnt like it."></textarea>
            <button type="submit" class="btn btn-secondary btn-sm my-2">Add</button>
        </form>
    </div>
</template>

<script>
export default {
    name: `addForm`,
    data() {
        return {
            title: ``,
            description: ``
        }
    },
    methods: {
        statusAdd() {
            this.$emit(`changeAdd`, `false`)
        },
        addTask() {
            this.$emit(`addInput`, this.title, this.description)
        }
    }
}
</script>

<style>

</style>