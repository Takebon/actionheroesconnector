<template>
    <div class="login">
        <div class="container">
            <b-alert :show="!!message" dismissible variant="warning">
                {{ message }}
            </b-alert>  
        <b-row>
            <b-col md="8" class="m-auto">
                <h1 class="display-4 text-center">Log In</h1>
                <p class="lead text-center">Sign in to your DevConnector account</p>
                <b-card>
                    <b-form @submit.prevent="onSubmit">
                        <b-form-input
                            class="mb-4"
                            type="email"
                            v-model="email"
                            required
                            placeholder="Enter email">
                        </b-form-input>
                        <b-form-input
                            class="mb-4"
                            type="password"
                            v-model="password"
                            required
                            placeholder="Enter password">
                        </b-form-input>
                        <b-button type="submit" variant="info" block>Submit</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row> 
        </div>        
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password
            })            
        }
    },
    computed: {
        message() {
            return this.$store.getters.getMessage
        }
    }  
}
</script>

<style>

</style>
