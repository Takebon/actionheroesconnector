import Vuex from 'vuex'
import jwt_decode from 'jwt-decode'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state:{
            profiles:[],
            posts:[],
            token: null,
            message: '',
            currentUser: ''
        },
        mutations: {
            setToken(state, token) {
                state.token = token
            },
            setProfiles(state, profiles) {
                state.profiles = profiles
            },
            setMessage(state, msg) {
                state.message = msg                           
            },
            setCurrentUser(state, curentUserData) {
                state.currentUser = curentUserData
            },            
            setEducation(state, education) {
                state.profiles.find(profile => profile.user._id === state.currentUser.id).education = education                
            },
            setExperience(state, experience) {
                state.profiles.find(profile => profile.user._id === state.currentUser.id).experience = experience  
            },
            setPosts(state, payload) {                
                state.posts = payload
            },
            addPost(state, post) {
                state.posts.unshift(post)
            },
            deletePost(state, id) {
                state.posts = state.posts.filter(post => post._id !== id)
            },
            likePost(state, like) {            
                state.posts.find(post => post._id == like.id).likes = like.likes            
            },
            addComment(state, commentData) {
                state.posts.find(post => commentData.postId === post._id).comments = commentData.comments                
            },
            deleteComment(state, postData) {
                state.posts.find(post => post._id === postData._id).comments = postData.comments
            }
            
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get('/api/profile/all')
                    .then(data => {
                        vuexContext.commit('setProfiles', data)                      
                    })                    
                    .catch(err => console.log(err))
            },            
            initAuth(vuexContext, req) {
                let token
                let tokenExp
                if(req) {
                    if(!req.headers.cookie) {
                        return
                    }
                    const jwtCookie = req.headers.cookie.split(";").find(c => c.trim().startsWith("jwt="))
                    if(!jwtCookie) {
                        return
                    }
                    token = jwtCookie.split('=')[1].replace("%", " ")                    
                    tokenExp = req.headers.cookie.split(";").find(c => c.trim().startsWith("expirationDate=")).split('=')[1]
                    
                } else {
                    token = localStorage.getItem('jwtToken')
                    tokenExp = localStorage.getItem('tokenExp')
                }                
               
                if(Date.now() > (tokenExp * 1000) || !token) {
                    if(token) {
                        vuexContext.dispatch('logout')
                    }             
                    return
                }
                
                vuexContext.commit('setToken', token)
                const rawToken = token.split(" ")[1]
                const decoded = jwt_decode(rawToken)
                vuexContext.commit('setCurrentUser', decoded)
            },
            login(vuexContext, authData) {
                vuexContext.commit('setMessage', '')
                this.$axios.$post('/api/users/login', {
                    email: authData.email,
                    password: authData.password
                })
                .then(result => {
                    vuexContext.commit('setToken', result.token)
                    const { token } = result
                    const rawToken = token.split(" ")[1]
                    const decoded = jwt_decode(rawToken)
                    
                    
                    localStorage.setItem('jwtToken', token)
                    localStorage.setItem('tokenExp', decoded.exp)
                    Cookie.set('jwt', token)
                    Cookie.set('expirationDate', decoded.exp)

                    vuexContext.commit('setCurrentUser', decoded)
                    vuexContext.commit('setMessage', result.message)
                    this.$router.push('/dashboard')
                    })
                .catch(err => vuexContext.commit('setMessage', err.response.data.message))
            },    
            logout(vuexContext) {
                
                vuexContext.commit('setMessage', '')
                vuexContext.commit('setToken', null)

                if(process.client) {
                    localStorage.clear('jwtToken')
                    localStorage.clear('tokenExp')
                    }                
                Cookie.remove('jwt')
                Cookie.remove('expirationDate')            
                this.$router.push('/login')    
            },
            register(vuexContext, userData) {
                vuexContext.commit('setMessage', '')
                this.$axios.$post('/api/users/register', userData)
                .then(response => {
                    vuexContext.commit('setMessage', response.message)
                    this.$router.push('/login')
                })               
                .catch(err => {
                    vuexContext.commit('setMessage', (err.response.data.message ? err.response.data.message : err.response.data))                                        
                })              
            },
            createProfile(vuexContext, profileData) {
                vuexContext.commit('setMessage', '')                
                this.$axios.$post('/api/profile', profileData)
                    .then(profile => {
                        this.$axios.$get('/api/profile/all')
                        .then(data => {
                            vuexContext.commit('setProfiles', data)
                        })
                        this.$router.push('/profiles')
                    })
                    .catch(err => console.log(err))
            },            
            addEducation(vuexContext, newEducation) {
                vuexContext.commit('setMessage', '')
                this.$axios.$post('/api/profile/education', newEducation)
                    .then(profile => {
                        vuexContext.commit('setEducation', profile.education)
                        this.$router.push('/dashboard')                       
                    })
                    .catch(err => console.log(err))                
            },
            addExperience(vuexContext, newExperience) {
                vuexContext.commit('setMessage', '')
                this.$axios.$post('/api/profile/experience', newExperience)
                    .then(profile => {
                        vuexContext.commit('setExperience', profile.experience)
                        this.$router.push('/dashboard')
                    })
                    .catch(err => console.log(err))                
            },
            deleteItem(vuexContext, payload) {
                if(payload.tipe === 'experience') {
                    this.$axios.delete(`/api/profile/experience/${payload.item}`)
                    .then(profile => {
                        
                        vuexContext.commit('setExperience', profile.data.experience)
                        
                    })
                    .catch(err => console.log(err))
                    
                } else {
                    this.$axios.delete(`/api/profile/education/${payload.item}`)
                    .then(profile => {
                        
                        vuexContext.commit('setEducation', profile.data.education)
                        
                    })
                    .catch(err => console.log(err))
                }
            },
            deleteUser(vuexContext) {
                if(confirm("Are you sure?")) {
                    this.$axios.delete('/api/users')                    
                    .then(() => {                        
                        this.$axios.$get('/api/profile/all')
                        .then(data => {
                            vuexContext.commit('setProfiles', data)
                        })
                        vuexContext.dispatch('logout')
                    })
                    .catch(err => console.log(err))
                } 
            },
            addPost(vuexContext, post) {
                this.$axios.post('/api/posts', post)
                    .then(resp => {                        
                        const post = resp.data                        
                        vuexContext.commit('addPost', post)
                        return
                    })
                    .catch(err => console.log(err))
            },
            deletePost(vuexContext, id) {
                this.$axios.delete(`/api/posts/${id}`)
                    .then(() => {
                        vuexContext.commit('deletePost', id)
                    })
                    .catch(err => console.log(err))
            },
            likePost(vuexContext, id) {
                this.$axios.post(`/api/posts/like/${id}`)
                    .then((post) => {
                        const like = {
                            id: id,
                            likes: post.data.likes
                        }
                        vuexContext.commit('likePost', like)
                    })
                    .catch(err => console.log(err))
            },
            unLikePost(vuexContext, id) {
                this.$axios.post(`/api/posts/unlike/${id}`)
                    .then((post) => {
                        const unlike = {
                            id: id,
                            likes: post.data.likes
                        }
                        vuexContext.commit('likePost', unlike)
                    })
                    .catch(err => console.log(err))
            },
            addComment(vuexContext, comment) {
                this.$axios.post(`/api/posts/comment/${comment.id}`, comment)
                    .then(res => {
                        vuexContext.commit('addComment', {
                            postId: comment.id,
                            comments: res.data.comments
                        })
                       
                    })
                    .catch(err => console.log(err))
            },
            deleteComment(vuexContext, commentData) {
                this.$axios.delete(`/api/posts/comment/${commentData.postId}/${commentData.commentId}`)
                    .then(resp => {
                        vuexContext.commit('deleteComment', resp.data)
                    })
                    .catch(err => console.log(err))
            }
            
        },
        getters: {
            loadedProfiles(state) {
                return state.profiles
            },
            getProfile(state) {
                return (handle) => {
                    return state.profiles.find(profile => { return profile.handle == handle})
                }
            },
            isLogin(state) {
                return !!state.token
            },
            getMessage(state) {
                return state.message
            },
            getToken(state) {
                return state.token
            },
            currentUserProfile(state) {
                const currentUserProfile = state.profiles.find(profile => profile.user._id === state.currentUser.id)
                if(currentUserProfile === undefined) {
                    return null
                }
                return currentUserProfile
            },
            getPosts(state) {
                return state.posts
            },
            getPost(state) {
                return (id) => {
                    return state.posts.find(post => {return post._id === id})
                }
            }
        }
    })
}

export default createStore