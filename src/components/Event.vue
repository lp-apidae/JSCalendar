<template>
   <tr>
       <td>{{title}}</td>
       <td>{{desc}}</td>
       <td>{{startDate}}</td>
       <td>{{endDate}}</td>
       <td><b-button variant="danger" @click="del()">Delete</b-button></td>
   </tr>
</template>

<script>
    export default {
        name: "Event",
        props: [
            'title',
            'desc',
            'startDate',
            'endDate',
            'id'
        ],
        methods: {
            del(){
                this.$axios({
                    method: 'get',
                    url: '/del/' + this.id
                })
                    .then(() => {
                        this.$emit('del')
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
