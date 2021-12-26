<template>
  <div class="hidden">
    <vs-sidebar absolute hover-expand reduce v-model="active" open class="sidebarx">
      <template #logo>
      </template>

      <vs-sidebar-item id="Emploi" v-if="this.$myauth.user_type=='filiere'">
        <template #icon>
          <i class='bx bxs-calendar'></i>
        </template>
        <router-link to="/emploi">
        Emploi
        </router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="Devoir" v-if="this.$myauth.user_type=='filiere'">
        <template #icon>
          <i class='bx bx-book-content'></i>
        </template>
        <router-link to="/etudiant_devoir">
        Devoir
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="Filier" v-if="this.$myauth.user_type=='admin'">
        <template #icon>
          <i class='bx bxs-graduation'></i>
        </template>
        <router-link to="/filier">
        Filières
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="Prof" v-if="this.$myauth.user_type=='admin'">
        <template #icon>
          <i class='bx bx-id-card'></i>
        </template>
        <router-link to="/profs">
        Profs
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="Departement" v-if="this.$myauth.user_type=='admin'">
        <template #icon>
          <i class='bx bxs-building-house'></i>
        </template>
        <router-link to="/departement">
        Departements
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="CrudEmploi" v-if="this.$myauth.user_type=='admin'">
        <template #icon>
          <i class='bx bx-calendar-plus'></i>
        </template>
        <router-link to="/create_emploi">
        Créer Emploi
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="ProfNotifications" v-if="this.$myauth.user_type=='prof'">
        <template #icon>
          <!-- <i class='bx bx-book-open'></i> -->
          <i class='bx bx-calendar'></i>
        </template>
        <router-link to="/prof_emploi">
        Emploi Personnel
        </router-link>
      </vs-sidebar-item>
      <vs-sidebar-item id="EmploiClass" v-if="this.$myauth.user_type=='prof'">
        <template #icon>
          <i class='bx bxs-calendar'></i>
        </template>
        <router-link to="/emploi">
        Emploi
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="Devoir" v-if="this.$myauth.user_type=='prof'">
        <template #icon>
          <!-- <i class='bx bx-book-open'></i> -->
          <i class='bx bx-book-content'></i>
        </template>
        <router-link to="/devoirs">
        Devoir
        </router-link>
      </vs-sidebar-item>

      <vs-sidebar-item id="UpdateProfile" v-if="this.$myauth.user_type=='prof'">
        <template #icon>
          <i class='bx bx-id-card'></i>
        </template>
        <router-link to="/update_profile">
        Update Profile
        </router-link>
      </vs-sidebar-item>
      <!-- <vs-sidebar-item id="chat">
        <template #icon>
          <i class='bx bx-chat'></i>
        </template>
        Chat
      </vs-sidebar-item> -->
      <template #footer v-if="this.$myauth.user_type!='admin'">
          <vs-row justify="space-between" class="footbill">
            <vs-avatar v-on:click="NotifRouter" badge-color="danger" badge-position="top-right">
              <i class='bx bxs-bell' ></i>
              <template #badge>
                *
              </template>
            </vs-avatar>
          </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data:() => ({
      active: 'home',
      total : 0
    }),
    methods : {
      getTotalEntries(){
            axios
            .get("http://localhost:8000/notifs/prof/count/"+this.$myauth.user_id)
            .then(response => (this.total = response.data))
      },
      NotifRouter(){
        if(this.$myauth.user_type=='prof')
          this.$router.push({name: 'ProfNotif'})
        else
          this.$router.push({name: 'EtudiantNotif'})
      }
    },
    mounted(){
      // this.getTotalEntries()
    }
  }
</script>
<style scoped>
    .sidebarx{
          margin-top: 44px;
    }
    .footbill{
      margin-bottom:50px;
    }
  </style>