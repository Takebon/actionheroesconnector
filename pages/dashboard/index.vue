<template>
    <div class="dashboard">
        <div class="container" >
            <b-row>
                <b-button class="mr-1"  variant="info" to="/create-profile" v-if="!userProfile">Create Profile</b-button>
                <b-col md="12" class="m-auto" v-if="userProfile">                    
                    <h1 class="display-4">Dashboard</h1>
                    <p class="lead">Welcome {{ userProfile.user.name }}</p>                    
                    <b-card>
                        <b-button-group size="sm" class="mb-3">
                            <b-button class="mr-1"  variant="info" to="/edit-profile">Edit Profile</b-button>
                            <b-button class="mr-1"  variant="info" to="/add-experience">Add Experience</b-button>
                            <b-button class="mr-1"  variant="info" to="add-education">Add Education</b-button>
                        </b-button-group>
                        <hr class="my-4">
                        <h4 class="mb-4">Experience Credentials</h4>                        
                        <b-table striped hover :items="userProfile.experience" :fields="fieldsOfExp">
                            
                            <template slot=" " slot-scope="row">
                                <b-button variant="danger" @click="deleteCred(row.item._id, 'experience')" >Delete</b-button>                                
                            </template>                      
                        </b-table>
                        
                        <h4 class="mb-4">Education Credentials</h4>
                        <b-table striped hover :items="userProfile.education" :fields="fieldOfEdu">
                            
                            <template slot=" " slot-scope="row">
                                <b-button variant="danger" @click="deleteCred(row.item._id, 'education')" >Delete</b-button>                                
                            </template>                      
                        </b-table>
                        <b-button @click="deleteUser()" variant="danger" >Delete User</b-button>

                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['check-auth', 'auth'],
    data() {
        return {
            fieldsOfExp: [ 'company', 'title', 'from', 'to', " "],
            fieldOfEdu: [ 'school', 'degree', 'from', 'to', " "]
        }
    },

   computed: {   
       userProfile() {
           return this.$store.getters.currentUserProfile          
       }
   },
   methods: {
       deleteCred(item, tipe) {
           this.$store.dispatch('deleteItem', {
               item,
               tipe
           })            
       },
       deleteUser() {
           this.$store.dispatch('deleteUser')
       }
       
   }
}
</script>

<style>

</style>
