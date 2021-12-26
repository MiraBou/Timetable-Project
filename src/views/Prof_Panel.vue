<template>
    <div class="container">
        <Sidebar />
        <div class="mt-5"></div>
        <br>
          <!-- <ProfNotif /> -->
          <router-view/>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
// import ProfNotif from '../views/Prof_Notifications.vue'
export default {
    components: {
        // Navbar,
        Sidebar,
        // ProfNotif
    },
}
</script>
