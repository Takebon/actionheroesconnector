export default function(context) {
    if(!context.store.getters.isLogin) {
        context.redirect('/login')
    }
}