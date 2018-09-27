<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4">
      <div class="container">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-link to="/" class="navbar-brand">DevConnector</b-link>        

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-link to="/profiles" class="nav-link">Developers</b-link>                     
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">          

            <b-navbar-nav>
              <b-link to="/register" class="nav-link" v-if="!isLogin">Sign Up</b-link>
              <b-link to="/login" class="nav-link" v-if="!isLogin">Login</b-link>                   
              <b-link to="/feed" class="nav-link" v-if="isLogin">Post Feed</b-link>                   
              <b-link to="/dashboard" class="nav-link" v-if="isLogin">Dashboard</b-link>
              <b-link to="#" 
                      class="nav-link" 
                      @click="logout" 
                      v-if="isLogin"><b-img 
                      class="rounded-circle" 
                      style="width: 25px;margin-right:5px" 
                      :src="currentUser.user.avatarURL"
                      alt="" :title="currentUser.user.name" />Logout</b-link>                   
            </b-navbar-nav>            
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <nuxt/>
    
      <footer class="bg-dark text-white mt-5 p-4 text-center">
        Copyright &copy; 2018 Dev Connector
      </footer>

  </div>
</template>

<script>
  export default {
    
    methods: {
        logout() {
            this.$store.dispatch('logout')            
        }
    },
    computed: {
      isLogin() {        
        return this.$store.getters.isLogin
      },
      currentUser() {
        return this.$store.getters.currentUserProfile
      }
    }
    
  }
</script>

<style>
html
{
  /* font-family: 'Kosugi Maru', sans-serif; */
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.nuxt-link-exact-active {
  color: rgb(255, 255, 255) !important;
}
</style>
