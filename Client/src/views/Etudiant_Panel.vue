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
export default {
    components: {
        Sidebar,
    },
}
</script>
