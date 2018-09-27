<template>
    <div class="profile">
        <b-container class="mb-5">        
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col sm="6" class="mb-3">
                            <b-button to="/profiles" variant="light">Back To Profiles</b-button>
                        </b-col>
                        
                    </b-row>
                    <b-row>
                        <b-col md="12" class="text-center">
                            <b-jumbotron bg-variant="info" class="mb-3" text-variant="white">
                                <template slot="header">
                                <b-img 
                                    :src="profile.user.avatarURL" 
                                    rounded="circle" 
                                    width="200" 
                                    height="200" 
                                    fluid
                                ></b-img>
                                </template>
                                <template slot="lead" >
                                    <h1 class="display-5">{{ profile.user.name }}</h1>
                                    <h5>{{ profile.status }} at {{ profile.company }}</h5>
                                    <p class="lead">{{ profile.location }}</p>
                                </template>
                                <hr class="my-4" >
                                <div v-if="profile.social">
                                    <a class="text-white p-2"
                                        v-if="profile.social.youtube"
                                        :href="profile.social.youtube" 
                                        target="_blank">
                                        <i class="fab fa-youtube fa-2x"></i>
                                    </a>
                                    <a class="text-white p-2"
                                        v-if="profile.social.twitter"
                                        :href="profile.social.twitter" 
                                        target="_blank">
                                        <i class="fab fa-twitter fa-2x"></i>
                                    </a>
                                    <a class="text-white p-2" 
                                        v-if="profile.social.facebook"
                                        :href="profile.social.facebook" 
                                        target="_blank">
                                        <i class="fab fa-facebook fa-2x"></i>
                                    </a>
                                    <a class="text-white p-2"
                                        v-if="profile.social.linkedin"
                                        :href="profile.social.linkedin" 
                                        target="_blank">
                                        <i class="fab fa-linkedin fa-2x"></i>
                                    </a>
                                    <a class="text-white p-2"
                                        v-if="profile.social.instagram"
                                        :href="profile.social.instagram" 
                                        target="_blank">
                                        <i class="fab fa-instagram fa-2x"></i>
                                    </a>
                                    <a class="text-white p-2 fa-2x"
                                        v-if="profile.website"
                                        :href="profile.website" 
                                        target="_blank">
                                        <i class="fas fa-globe"></i>
                                    </a>
                                </div>                                                                                             
                            </b-jumbotron>                            
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col md="12" class="text-center">
                            <b-card 
                                :title="profile.user.name.split(' ')[1]+'\'s Bio'"
                                text-variant="info"
                                bg-variant="light">
                            <p class="card-text" style="color: black">{{ profile.bio }}</p>
                            <hr class="my-4">
                            <h4>Skill Set</h4>
                                <b-row>
                                    <div class="d-flex flex-wrap justify-content-center align-items-center" 
                                         style="color: black"
                                         v-for="(skill, index) in profile.skills" :key="index">
                                        <div class="p-3">
                                        <i class="fa fa-check"></i> {{ skill }}</div>                                        
                                    </div>
                                </b-row>
                            </b-card>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="6">
                            <h3 style="color: #42a2b8" class="text-center">Experience</h3>
                            <b-list-group>
                                <b-list-group-item class="mb-1" v-for="(exp, index) in profile.experience" :key="index">
                                    <h5 class="text-center mb-2">{{ exp.company }}</h5>
                                    <p class="text-center" v-if="exp.current">{{ exp.from }} - Current </p>
                                    <p class="text-center" v-else>{{ exp.from }} - {{ exp.to }}</p>
                                    <p class="mt-1"><strong>Position: </strong>{{ exp.title }}</p>
                                    <p class="mt-1"><strong>Location: </strong>{{ exp.location }}</p>
                                    <p class="mt-1"><strong>Description: </strong>{{ exp.description }}</p>
                                </b-list-group-item>
                            </b-list-group>
                        </b-col>
                        <b-col md="6" >
                            <h3 style="color: #42a2b8" class="text-center">Education</h3>
                            <b-list-group>
                                <b-list-group-item class="mb-1" v-for="(edu, index) in profile.education" :key="index">
                                    <h5 class="text-center mb-2">{{ edu.school }}</h5>
                                    <p class="text-center" v-if="edu.current">{{ edu.from }} - Current </p>
                                    <p class="text-center" v-else>{{ edu.from }} - {{ edu.to }}</p>
                                    <p class="mt-1"><strong>Degree: </strong>{{ edu.degree }}</p>
                                    <p class="mt-1"><strong>Field Of Study: </strong>{{ edu.fieldofstudy }}</p>
                                    <p class="mt-1"><strong>Description: </strong>{{ edu.description }}</p>
                                </b-list-group-item>
                            </b-list-group>
                        </b-col>
                    </b-row>
                    <!-- <hr class="my-4">
                    <h3 class="mb-4">Latest Github Repos</h3> -->

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    computed: {
        profile() {       
                
            return this.$store.getters.getProfile(this.$route.params.handle)
        }
    },
    
}
</script>

<style>


</style>
