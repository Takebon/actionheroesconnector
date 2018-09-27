<template>
    <div class="create-profile">
        <div class="container">
            <b-row>
                <b-col md="8" class="m-auto">
                    <b-button variant="info" to="/dashboard"> Go Back</b-button>
                    <h1 class="display-4 text-center">Edit Your Profile</h1>
                    <p class="lead text-center">Let's get some information to make your profile stand out</p>
                    <small class="d-block pb-3">* = required field</small>
                    <b-card>
                        <b-form @submit.prevent="onSubmit">
                            
                            <b-form-group                                
                                description="A unique handle for your profile URL"
                                label-for="handle"                                
                                >
                                <b-form-input id="handle" v-model="profile.handle" type="text" placeholder="* Profile handle" disabled></b-form-input>
                            </b-form-group>
                            
                            <b-form-group                                
                                description="Give us an idea of where you are at in your carier"
                                label-for="status"                                
                                >
                                <b-form-select id="status" v-model="profile.status" :options="options" required/>
                            </b-form-group>

                            <b-form-group                                
                                description="Could be your own company or one you work for"
                                label-for="company"                                
                                >
                                <b-form-input id="company" type="text" v-model="profile.company" placeholder="Company"></b-form-input>
                            </b-form-group>

                            <b-form-group                                
                                description="Could be your own or a company website"
                                label-for="website"                                
                                >
                                <b-form-input id="website" type="text" v-model="profile.website" placeholder="Website"></b-form-input>
                            </b-form-group>

                            <b-form-group                                
                                description="City & state suggested (eg. Boston, MA)"
                                label-for="location"                                
                                >
                                <b-form-input id="location" type="text" v-model="profile.location" placeholder="Location"></b-form-input>
                            </b-form-group>

                            <b-form-group                                
                                description="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                                label-for="skills"                                
                                >
                                <b-form-input id="skills" type="text" v-model="profile.skills" placeholder="Skills"></b-form-input>
                            </b-form-group>

                            <b-form-group                                
                                description="If you want your latest repos and a Github link, include your username"
                                label-for="githubusername"                                
                                >
                                <b-form-input id="githubusername" type="text" v-model="profile.githubusername" placeholder="Github Username"></b-form-input>
                            </b-form-group>

                            <b-form-group                                
                                description="Tell us a little about yourself"
                                label-for="bio"                                
                                >
                                <b-form-textarea id="bio"
                                    v-model="profile.bio"
                                    placeholder="A short bio of yourself"
                                    :rows="3"
                                    :max-rows="6">
                                </b-form-textarea>   
                            </b-form-group>

                            <b-card class="text-center mb-3" bg-variant="secondary" text-variant="white">
                                Add Social Network Links (<small>Optional</small>)
                            </b-card>
                            
                            <b-input-group  prepend="<i class='fab fa-twitter'></i>" class="mb-3">
                                <b-form-input type="text" placeholder="Twitter Profile URL" v-model="profile.social.twitter" ></b-form-input>
                            </b-input-group>

                            <b-input-group  prepend="<i class='fab fa-facebook'></i>" class="mb-3">
                                <b-form-input type="text" placeholder="Facebook Profile URL" v-model="profile.social.facebook"></b-form-input>
                            </b-input-group>

                            <b-input-group  prepend="<i class='fab fa-youtube'></i>" class="mb-3">
                                <b-form-input type="text" placeholder="Youtube Profile URL" v-model="profile.social.youtube"></b-form-input>
                            </b-input-group>

                            <b-input-group  prepend="<i class='fab fa-linkedin'></i>" class="mb-3">
                                <b-form-input type="text" placeholder="Linkedin Profile URL" v-model="profile.social.linkedin"></b-form-input>
                            </b-input-group>

                            <b-input-group  prepend="<i class='fab fa-instagram'></i>" class="mb-3">
                                <b-form-input type="text" placeholder="Instagram Profile URL" v-model="profile.social.instagram"></b-form-input>
                            </b-input-group>
                            
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
    data () {
    return {
        options: [
                    { value: null, text: '* Select Professional Status' },
                    { value: 'Developer', text: 'Developer' },
                    { value: 'Junior Developer', text: 'Junior Developer' },
                    { value: 'Senior Developer', text: 'Senior Developer' },
                    { value: 'Manager', text: 'Manager' },
                    { value: 'Student or Learning', text: 'Student or Learning' }                
                ],
        profile: {
            handle: '',
            status: '',                
            company: '',
            website: '',
            location: '',
            skills: '',
            githubusername: '',
            bio: '',
            social: {
                youtube: '',
                instagram: '',
                facebook: '',
                linkedin: '',
                twitter: ''
            }           
        },        
    }
  },
    methods: {
        onSubmit() {
            const profile ={
                handle: this.profile.handle,
                status: this.profile.status,
                company: this.profile.company,
                website: this.profile.website,
                location: this.profile.location,
                skills: this.profile.skills.toString(),
                githubusername: this.profile.githubusername,
                bio: this.profile.bio,
                youtube: this.profile.social.youtube,
                instagram: this.profile.social.instagram,
                facebook: this.profile.social.facebook,
                linkedin: this.profile.social.linkedin,
                twitter: this.profile.social.twitter
                }

            const profileData = (profile) => {
                Object.keys(profile).forEach((key) => (profile[key] == '') && delete profile[key])
                return profile
            } 
                
            this.$store.dispatch('createProfile', profileData(profile))
        }
    },
    created() {        
        const state = this.$store.getters.currentUserProfile
        if(state) {
            this.profile = state
        } else {
            this.$router.push("/create-profile")
        }    
    },
}
</script>

<style>

</style>
