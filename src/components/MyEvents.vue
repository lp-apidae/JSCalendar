<template>
    <div class="my-events">
        <h1>My events</h1>
        <br/>
        <b-button variant="outline-primary" v-b-modal.modalEvent>Add an event</b-button>
        <b-button variant="outline-primary" @click="logout">Log out</b-button>
        <EventForm @add="refresh"></EventForm>
        <br/>
        <br/>
        <div class="text-center" v-if="loading === true">
            <b-spinner variant="primary" type="grow" label="Spinning" />
        </div>
        <div v-else>
            <div v-if="events.length > 0" class="text-center">
                <table class="table b-table table-striped table-hover">
                    <thead>
                    <tr class>
                        <th>Event</th>
                        <th>Description</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <Event v-for="(event, key) in events" :id="event.eventId" :title="event.title" :desc="event.desc" :startDate="event.startDate" :endDate="event.endDate" :key="key" @del="refresh"></Event>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <br/><br/>
                <h3>No event registered</h3>
                <br/>
                <b-button variant="outline-primary" v-b-modal.modalEvent>Create a new event</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import EventForm from "@/components/EventForm"
    import Event from "@/components/Event"
    export default {
        name: "MyEvents",
        components: {
            EventForm,
            Event
        },
        data () {
            return {
                events: [],
                loading: false
            }
        },
        mounted () {
            this.refresh()
        },
        methods: {
            refresh(){
                this.loading = true
                setTimeout(this.getEvents, 300)
            },
            getEvents(){
                this.$axios({
                    method: 'get',
                    url: '/myevents'
                })
                    .then((response) => {
                        console.log(response.data)
                        this.events = response.data
                        this.loading = false
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loading = false
                    })

            },
            logout(){
                localStorage.clear()
                this.$router.push('/')
            }
        }
    }
</script>

<style>

</style>
