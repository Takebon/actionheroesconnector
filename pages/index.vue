<template>
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="display-3 mb-4">Developer Connector
            </h1>
            <p class="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
            <hr />
            <nuxt-link to="/register" class="btn btn-lg btn-info mr-2">Sign Up</nuxt-link>
            <nuxt-link to="/login" class="btn btn-lg btn-light">Login</nuxt-link>            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
  components: {
    
  }
}
</script>

<style scoped>
img {
  width: 100%;
}

.landing {
  position: relative;
  background: url('~/assets/img/showcase.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-top: -24px;
  margin-bottom: -50px;
}

.landing-inner {
  padding-top: 80px;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-form {
  opacity: 0.9;
}

.latest-profiles-img {
  width: 40px;
  height: 40px;
}

.form-control::placeholder {
  color: #bbb !important;
}
</style>
