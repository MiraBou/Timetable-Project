<template>
        <div class="container">
            <Sidebar />
            <!-- <div class="row justify-content-center mt-5">
                <h6>Your Token : </h6><br>
            </div>
            <div class="row">
                <p>{{$myauth.access_token}}</p>
            </div> -->
            <!-- <div class="row">
                <p v-if="localStorage.access_token" class="col-md-8">true : {{localStorage.access_token}}</p>
                <p v-if="!localStorage.access_token" class="col-md-8">false : {{localStorage.access_token}}</p>
            </div>  -->
            <div class="mt-5"></div>
            <br>
              <router-view/>
        </div>
</template>

<script>
// import Navbar from '../components/layout/ResponsiveNavBar'
import Sidebar from '../components/Sidebar.vue'
// import jwt_decode from "jwt-decode"
export default {
    components: {
        // Navbar,
        Sidebar
    },
    data (){
        return {
            // token_exp : jwt_decode(this.$myauth.access_token).exp
            // navLinks: [{
            //     path: '/admin',
            //     text: 'Home',
            //     icon: 'ion-home'
            //   },
            //   {
            //     path: '/filier',
            //     text: 'Filier',
            //     icon: 'ion-university'
            //   }, {
            //     path: '/profs',
            //     text: 'Profs',
            //     icon: 'ion-person-stalker'
            //   }, {
            //     path: '/create_emploi',
            //     text: 'CrudEmploi',
            //     icon: 'ion-calendar'
            //   }
            // ],
            // items: [{
            //     message: "Accueil",
            //     href: "/",
            //     icon: "fa fa-user"
            //   },
            //   {
            //     message: "CRUD profs",
            //     href: "/about",
            //     icon: "fa fa-user"
            //   },
            //   {
            //     message: "CRUD classes",
            //     href: "#hala3",
            //     icon: "fa fa-user"
            //   },
            //   {
            //     message: "CRUD étudiants",
            //     href: "#hala4",
            //     icon: "fa fa-user"
            //   },
            //   {
            //     message: "CRUD vacances",
            //     href: "#hala5",
            //     icon: "fa fa-user"
            //   },
            //   {
            //     message: "Calendrier",
            //     href: "/emploi",
            //     icon: "fa fa-user"
            //   }
            // ]
        }
    },
    // mounted(){
    //     let d = new Date(0)
    //     d.setUTCSeconds(jwt_decode(this.$myauth.access_token).exp);
    //     console.log(d);
    // }
}
</script>

 <!-- <Navbar :nav-links="navLinks"  
               :image-path="require('../assets/logo.png')"                   
            /> -->
            <!-- <div class="row justify-content-center">
                <h1>Admin</h1>
            </div>
            <div class="row justify-content-center mt-5">
                <h6>Your Token : </h6><br>
            </div>
            <div class="row">
                <p>{{$myauth.access_token}}</p>
            </div> -->