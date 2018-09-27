<template>
    <div class="feed">
        <div class="container">
            <b-row>
                <b-col md="12">
                    <b-card class="mb-3">
                        <b-row >
                            <b-col md="2">
                                <b-img thumbnail :src="post.avatarURL" width="100" />
                                <p>{{ post.name }}</p>
                            </b-col>
                            <b-col md="10">
                                <p>{{ post.text }}</p>                                                                         
                            </b-col>
                        </b-row>
                    </b-card> 
                    <b-form @submit.prevent="onSubmit">
                        <b-card header="Say Something..." header-bg-variant="info" header-text-variant="white" class="mb-3">
                            <b-form-textarea id="post"                                    
                                    placeholder="Create a comment"
                                    v-model="text"
                                    :rows="3"
                                    :max-rows="6"
                                    class="mb-3">
                                </b-form-textarea> 
                            <b-button type="submit" variant="success">Submit</b-button>                            
                        </b-card>                                                   
                    </b-form>
                    <div v-for="(comment, index) in post.comments" :key="index">
                        <b-card class="mb-3">
                            <b-row >
                                <b-col md="2">
                                    <b-img thumbnail :src="comment.avatarURL" width="100" />
                                    <p>{{ comment.name }}</p>
                                    <small class="d-flex mx-auto"> Published: {{ comment.date | date }}</small>
                                </b-col>
                                <b-col md="10">
                                    <p>{{ comment.text }}</p>                                                                         
                                </b-col>
                                <div class="mx-auto">
                                    <b-button variant="danger" 
                                        v-if="currentUser.user._id === comment.user"
                                        @click="deletePost(comment._id)">Delete</b-button>
                                </div>                                
                            </b-row>
                        </b-card>
                    </div>
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
    computed: {
        post() {
            return this.$store.getters.getPost(this.$route.params.id)
        },
        currentUser() {
            return this.$store.getters.currentUserProfile
        }       
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('addComment', {
                id: this.$route.params.id,
                text: this.text
            })
            this.text = ''
        },
        deletePost(id) {
            this.$store.dispatch('deleteComment', {
                postId: this.$route.params.id,
                commentId: id
            })
        }
    }

}
</script>

<style>

</style>
