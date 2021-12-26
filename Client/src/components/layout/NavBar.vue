<template>
    <div class="hidden">
        <vs-navbar shadow square center-collapsed v-model="active">
            <template #left>
                <!-- <vs-button @click="activeSidebar = !activeSidebar" flat icon>
                    <i class='bx bx-menu'></i>
                </vs-button> -->
                <h5><b> ClassTime.</b></h5>
            </template>
            <!-- <vs-navbar-item :active="active == 'guide'" id="guide">
                Guide
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'docs'" id="docs">
                Documents
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'components'" id="components">
                Components
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'license'" id="license">
                license
            </vs-navbar-item> -->
            <template #right>
                <vs-button flat v-if="!$myauth.isAuthenticated"><router-link to="/login">Login</router-link></vs-button>
                <vs-button  @click='logout' v-if="$myauth.isAuthenticated">Sign Out</vs-button>
            </template>
        </vs-navbar>
        <!-- <sidebar v-if="$myauth.isAuthenticated && $myauth.user_type === 'admin'" /> -->
    </div>
</template>
<script>
// import Sidebar from '../Sidebar.vue'

export default {
    components :{
        // Sidebar
    },
    data:() => ({
         active: 'home',
    //   activeSidebar: false
    }),
     methods : {
        logout() {
            this.$myauth.isAuthenticated = false
            this.$router.push({name: 'Home'})
        }
    }   
  }
</script>

  