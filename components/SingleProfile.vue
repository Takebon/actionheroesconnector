<template>
     <div class="card card-body bg-light mb-3">
            <div class="row">
              <div class="col-md-3 col-sm-12 text-center">
                  <b-img :src="avatarURL"  height="100" rounded="circle"></b-img>
                          
              </div>
              <div class=" col-md-5 col-sm-12">
                <h3>{{ name }}</h3>
                <p>{{ status }} at {{ company }}</p>
                <p>{{ location }}</p>
                <nuxt-link :to="'/profiles/'+ handle" class="btn btn-info">View Profile</nuxt-link>                
              </div>
              <div class="col-md-4 d-none d-md-block">
                <h4>Skill Set:</h4>
                    <b-list-group v-for="(skill, index) in skills" :key="index">                        
                        <b-list-group-item>{{ skills[index] }}</b-list-group-item>                       
                    </b-list-group>
              </div>
            </div>
          </div>
</template>

<script>
export default {
    name: 'ProfilePreview',
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        handle: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        company: {
            type: String
        },
        location: {
            type: String
        },
        skills: {
            type: Array
        },
        avatarURL: {
            type: String,
            required: true
        }
    },
    computed: {
        
    }
}
</script>

<style>

</style>
