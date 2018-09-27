<template>
    <div class="add-experience">
        <div class="container">
            <b-row>
                <b-col md="8" class="m-auto">
                    <b-button variant="info" to="/dashboard"> Go Back</b-button>
                    <h1 class="display-4 text-center">Add Your Experience</h1>
                    <p class="lead text-center">Add any developer/programming positions that you have had in the past</p>
                    <small class="d-block pb-3">* = required field</small>
                    <b-card>
                        <b-form @submit.prevent="onSubmit">
                            
                            
                            <b-form-input v-model="experience.title" type="text" placeholder="* Job Title" class="mb-3" required></b-form-input>
                            <b-form-input v-model="experience.company" type="text" placeholder="* Company" class="mb-3" required></b-form-input>
                            <b-form-input v-model="experience.location" type="text" placeholder="Location" class="mb-3"></b-form-input>
                                                        
                            <b-form-group label="From Date"  class="mb-3">
                            <b-form-input v-model="experience.from" type="text" placeholder="éééé-hh-nn"></b-form-input>
                            </b-form-group>

                            <b-form-group label="To Date"  class="mb-3">
                            <b-form-input v-model="experience.to" type="text" placeholder="éééé-hh-nn"></b-form-input>
                            </b-form-group>

                                <b-form-checkbox v-model="experience.current"  class="mb-3">                                    
                                    Current
                                </b-form-checkbox>

                            <b-form-group                                
                                description="Tell us about your experience and what you learned"
                                label-for="bio"                                
                                >
                                <b-form-textarea id="bio"
                                    v-model="experience.description"
                                    placeholder="Job Description"
                                    :rows="3"
                                    :max-rows="6">
                                </b-form-textarea>   
                            </b-form-group>
                            
                            
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
    middleware: ['check-auth', 'auth'],
    data() {
        return {
            experience: {
                title: '',
                company: '',
                location: '',
                from: '',
                to: '',
                current: false,
                description: ''
            }
            
        }
    },
    methods: {
        onSubmit() {
           
            const newEducation = (experience) => {
               Object.keys(experience).forEach((key) => (experience[key] == '') && delete experience[key])
               return experience
            }

            this.$store.dispatch('addExperience', newEducation(this.experience))                
        }
    }

}
</script>

<style>

</style>
