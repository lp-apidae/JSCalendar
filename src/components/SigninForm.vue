<template>
    <b-modal id="modalSignIn" ref="modalSignIn" size="sm" hide-header hide-footer>
        <h3>Sign in and get started with N0deCalendar</h3>
        <br/>
        <b-alert v-if="error===true" show variant="danger">{{errorMessage}}</b-alert>
        <b-form-input type="email" id="signin-username" v-model="signinUsername" placeholder="What's your email address?"/>
        <br/>
        <b-form-input type="password" id="signin-password" v-model="signinPassword" placeholder="What's your password"/>
        <br/>
        <b-button variant="outline-primary" block @click="signin">Sign in!</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Cancel</b-button>
    </b-modal>
</template>

<script>
    export default {
        name: "SigninForm",
        data(){
            return{
                signinUsername: '',
                signinPassword: '',
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            hideModal() {
                this.signinUsername = '',
                this.signinPassword = '',
                this.error = false,
                this.errorMessage = ''
                this.$refs.modalSignIn.hide()
            },
            signin(){
                if(this.signinUsername.length < 1 || this.signinPassword < 1){
                    this.error = true
                    this.errorMessage = 'Mhhh... some fields are empty!'
                    return
                }
                const p = new URLSearchParams()
                p.set('email', this.signinUsername)
                p.set('pwd', this.signinPassword)
                this.$axios.post('/login', p, {withCredentials: true})
                    .then(request => this.signinSuccessful(request))
                    .catch(() => this.signinFailed())
            },
            signinSuccessful (req) {
                if (!req.data.jwt) {
                    this.signupFailed()
                    return
                }
                localStorage.authToken = req.data.jwt
                this.$router.push('/myevents')
            },
            signinFailed () {
                this.error = true
                this.errorMessage = 'Invalid login'
            }
        }
    }



</script>

<style>
    input{
        width: 100%;
    }
</style>
