<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1>Welcome on N0de Calendar</h1>
    <br/>
    <p>What would you like to do?</p>
    <br/>
    <b-button variant="outline-primary" v-b-modal.modalSignIn>Sign in</b-button>
    <b-button variant="outline-primary"  v-b-modal.modalSignUp>Sign up</b-button>
    <SignupForm></SignupForm>
    <SigninForm></SigninForm>
  </div>
</template>

<script>
  import SignupForm from "@/components/SignupForm"
  import SigninForm from "@/components/SigninForm"

  export default {
    name: 'Home',
    components: {
        SigninForm,
        SignupForm
    }
  }
</script>

<style>

</style>
