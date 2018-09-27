<template>
    <div class="login">
        <div class="container">            
            <b-alert :show="!!message" dismissible variant="warning">
                {{ message }}
            </b-alert>        
        <b-row>
            <b-col md="8" class="m-auto">
                <h1 class="display-4 text-center">Sign Up</h1>
                <p class="lead text-center">Create your DevConnector account</p>
                <b-card>
                    <b-form @submit.prevent="onSubmit">
                        <b-form-input
                            class="mb-4"
                            type="text"
                            v-model="name"
                            required
                            placeholder="Name">
                        </b-form-input>
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
                        <b-form-input
                            class="mb-4"
                            type="password"
                            v-model="password2"
                            required
                            placeholder="Confirm password">
                        </b-form-input>
                        <b-form-input
                            class="mb-4"
                            type="text"
                            v-model="avatarURL"
                            
                            placeholder="avatarURL">
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
            name: '',
            email: '',
            password: '',
            password2: '',
            avatarURL: ''
        }
    },
    methods: {
        onSubmit() {
            const user = {
                name: this.name,
                email: this.email,
                password: this.password,
                password2: this.password2,
                avatarURL: this.avatarURL
            }

            const fixUserData = (user) => {
                Object.keys(user).forEach((key) => (user[key] == '') && delete user[key])
                return user
            }
            this.$store.dispatch('register', fixUserData(user))        
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
