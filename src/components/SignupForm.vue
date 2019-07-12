<template>
    <b-modal id="modalSignUp" ref="modalSignUp" size="sm" hide-header hide-footer>
        <h3>Sign up and get started with N0deCalendar</h3>
        <br/>
        <b-alert v-if="error===true" show variant="danger">{{errorMessage}}</b-alert>
        <b-form-input type="text" id="signup-username" v-model="signupUsername" placeholder="What's your email address?"/>
        <br/>
        <b-form-input type="password" id="signup-password" v-model="signupPassword" placeholder="Choose a password"/>
        <br/>
        <b-form-input type="password" id="signup-confirmpassword" v-model="signupConfirmPassword" placeholder="Confirm your password"/>
        <br/>
        <b-button variant="outline-primary" block @click="signup">Create a new account</b-button>
        <b-button variant="outline-danger" block @click="hideModal">Cancel</b-button>
    </b-modal>
</template>

<script>
    export default {
        name: "SignupForm",
        data(){
            return{
                signupUsername: '',
                signupPassword: '',
                signupConfirmPassword: '',
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            hideModal() {
                this.signupUsername = '',
                this.signupPassword = '',
                this.signupConfirmPassword = '',
                this.error = false,
                this.errorMessage = ''
                this.$refs.modalSignUp.hide()
            },
            signup(){
                if(this.signupUsername.length < 1 || this.signupPassword < 1 || this.signupConfirmPassword < 1){
                    this.error = true
                    this.errorMessage = 'Mhhh... some fields are empty!'
                    return
                }else if(this.signupPassword !== this.signupConfirmPassword){
                    this.error = true
                    this.errorMessage = 'Password fields must match'
                    return
                }
                const p = new URLSearchParams()
                p.set('email', this.signupUsername)
                p.set('pwd', this.signupPassword)
                p.set('confirmpwd', this.signupConfirmPassword)
                this.$axios.post('/signup', p, {withCredentials: true})
                    .then(request => this.signupSuccessful(request))
                    .catch(() => this.signupFailed())
            },
            signupSuccessful (req) {
                if (!req.data.jwt) {
                    this.signupFailed()
                    return
                }
                localStorage.authToken = req.data.jwt
                this.$router.push('myevents')
            },
            signupFailed () {
                this.error = true
                this.errorMessage = 'Sign up failed'
            }
        }
    }



</script>

<style>
    input{
        width: 100%;
    }
</style>
