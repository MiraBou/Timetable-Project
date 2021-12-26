import jwt_decode from "jwt-decode"

const MyPlugin = {
      install(Vue) {
      var userOAuth = new Vue({
        data: {
            isAuthenticated : false,
            access_token : null,
            token_type : 'bearer',
            user_type : '',
            user_id : '',
            config : {
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              }
            },
        },
        methods : {
          getBearer(){
            return {  headers: {'Authorization': `Bearer ${this.access_token}`}}
          },
          setToken(access_token){
              this.access_token = access_token
              this.user_type = jwt_decode(access_token).type
              this.user_id = jwt_decode(access_token).id
              this.isAuthenticated = true
          },
        },
        mounted() {
          if(localStorage.access_token) 
            this.access_token = localStorage.access_token
        },
        watch:{
          access_token(newAccess_token) {
            localStorage.access_token = newAccess_token;
          },
          // isAuthenticated(){
          //   if (localStorage.access_token) {
          //     let d = new Date(0)
          //     d.setUTCSeconds(jwt_decode(localStorage.access_token).exp);
          //     let n = new Date()
          //     if ((n.getTime() - d.getTime()) / (1000) < 3600) {
          //       return false
          //     }
          //     return true
          //   }
          //   return false
          //   }
        }
      })
      Vue.prototype.$myauth = userOAuth
      
  }
};

export default MyPlugin;
