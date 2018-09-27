
export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        if(store.getters.isLogin) {
            config.headers.common['Authorization'] = store.getters.getToken            
        }
      console.log('Making request to ' + config.url)      
    })
}  