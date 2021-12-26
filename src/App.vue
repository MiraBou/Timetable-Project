<template>
  <div id="app" class="bg-white">
      <!-- <Header />  -->
      <nav-bar />
      <!-- <NavBar :nav-links="navLinks"  
               :image-path="require('./assets/logo.png')"                   
      /> -->
    <router-view/>
  </div>
</template>
<script>
import NavBar from './components/layout/NavBar.vue'
// import NavBar from './components/layout/ResponsiveNavBar.vue'
// import Header from './components/layout/Header.vue'
export default {
  name:"App",
  components:{
    NavBar
    // NavBar,
    // Header
  },
  data : () => ({
      // navLinks : [
      //   {
      //     path: '/',
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
      //     icon : 'ion-person-stalker'
      //   }, {
      //     path: '/create_emploi',
      //     text: 'CrudEmploi',
      //     icon: 'ion-calendar'
      //   }
      // ]
  })
}
</script>
<style>

</style>
