<template>
    <div class="add-education">
        <div class="container">
            <b-row>
                <b-col md="8" class="m-auto">
                    <b-button variant="info" to="/dashboard"> Go Back</b-button>
                    <h1 class="display-4 text-center">Add Your Education</h1>
                    <p class="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                    <small class="d-block pb-3">* = required field</small>
                    <b-card>
                        <b-form @submit.prevent="onSubmit">
                            
                            
                            <b-form-input v-model="education.school" type="text" placeholder="* School Or Bootcamp" class="mb-3" required></b-form-input>
                            <b-form-input v-model="education.degree" type="text" placeholder="* Degree Or Certificate" class="mb-3" required></b-form-input>
                            <b-form-input v-model="education.fieldofstudy" type="text" placeholder="Field Of Study" class="mb-3"></b-form-input>
                                                        
                            <b-form-group label="From Date"  class="mb-3">
                            <b-form-input v-model="education.from" type="text" placeholder="éééé-hh-nn"></b-form-input>
                            </b-form-group>

                            <b-form-group label="To Date"  class="mb-3">
                            <b-form-input v-model="education.to" type="text" placeholder="éééé-hh-nn"></b-form-input>
                            </b-form-group>

                                <b-form-checkbox v-model="education.current"  class="mb-3">                                    
                                    Current
                                </b-form-checkbox>

                            <b-form-group                                
                                description="Tell us about your experience and what you learned"
                                label-for="bio"                                
                                >
                                <b-form-textarea id="bio"
                                    v-model="education.description"
                                    placeholder="Program Description"
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
            education: {
                school: '',
                degree: '',
                fieldofstudy: '',
                from: '',
                to: '',
                current: false,
                description: ''
            }
            
        }
    },
    methods: {
        onSubmit() {
           
            const newEducation = (education) => {
               Object.keys(education).forEach((key) => (education[key] == '') && delete education[key])
               return education
            }

            this.$store.dispatch('addEducation', newEducation(this.education))                
        }
    }

}
</script>

<style>

</style>
