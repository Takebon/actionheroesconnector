<template>
    <div class="feed">
        <div class="container">
            <b-row>
                <b-col md="12">
                    <b-form @submit.prevent="onSubmit">
                        <b-card header="Say Something..." header-bg-variant="info" header-text-variant="white" class="mb-3">
                            <b-form-textarea id="post"                                    
                                    placeholder="Create a post"
                                    v-model="text"
                                    :rows="3"
                                    :max-rows="6"
                                    class="mb-3">
                                </b-form-textarea> 
                            <b-button type="submit" variant="success">Submit</b-button>
                        </b-card>
                        <div v-for="(post, index) in posts" :key="index">
                            <b-card class="mb-3">
                                <b-row >
                                    <b-col md="2">
                                        <b-img thumbnail :src="post.avatarURL" width="100" />
                                        <p>{{ post.name }}</p>
                                    </b-col>
                                    <b-col md="10">
                                        <p>{{ post.text }}</p>                                                                         
                                    </b-col>                                                                           
                                        <div class="p-2">
                                            <b-button class="mr-2"                                                      
                                                      variant="light"
                                                      @click="like(post._id)"
                                                      ><i class="fas fa-thumbs-up" :class="{'text-success' : post.likes.filter(like => like.user === currentUser.user._id).length > 0 }"></i>
                                                      <span class="badge badge-light">{{ post.likes.length }}</span></b-button>
                                            <b-button class="mr-2" 
                                                      variant="light"
                                                      @click="unLike(post._id)"
                                                      ><i class="fas fa-thumbs-down"></i></b-button>
                                            <b-button class="mr-2 " 
                                                      variant="info"
                                                      @click="goComments(post._id)">Comments {{ post.comments.length }}</b-button>
                                            <b-button variant="danger"                                                  
                                                      v-if="currentUser.user._id === post.user"
                                                      @click="deletePost(post._id)">Delete</b-button>                                            
                                        </div>                                       
                                </b-row>
                                <small class="d-flex mx-auto"> Published: {{ post.date | date }}</small>
                            </b-card>                            
                        </div>                            
                    </b-form>
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
            text: ''
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('addPost', {text: this.text})
            .then(() => {
                this.text = ''
            })
        },
        deletePost(id) {
            this.$store.dispatch('deletePost', id)
        },
        like(id) {
            this.$store.dispatch('likePost', id)
        },
        unLike(id) {
            this.$store.dispatch('unLikePost', id)
        },
        goComments(id) {
            this.$router.push(`/post/${id}`)
        }
    },
    computed: {
        posts() {
            return this.$store.getters.getPosts
        },
        currentUser() {
            return this.$store.getters.currentUserProfile
        }
    },
    async fetch (context) {
        let data = await context.app.$axios.get('/api/posts')
        context.store.commit('setPosts', data.data)
    }
    
}
</script>

<style>

</style>
