<template>
      <div class="profiles">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4 text-center">Developer Profiles</h1>
          <p class="lead text-center">Browse and connect with developers</p>
          
          <single-profile
          v-for="(profile, index) in profiles" :key="index"
          :id="profile._id"
          :avatarURL="profile.user.avatarURL"
          :name="profile.user.name"
          :status="profile.status"
          :location="profile.location"
          :company="profile.company"
          :handle="profile.handle"
          :skills="profile.skills"
           />                        

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import SingleProfile from "~/components/SingleProfile"
export default {
  middleware: ['check-auth'],
    components: {
        SingleProfile
    },
    data() {
        return {
            
        }
    },
    computed: {
      profiles() {
        return this.$store.getters.loadedProfiles
      }
    },    
}
</script>

<style>

</style>
