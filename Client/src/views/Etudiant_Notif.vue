<template>
  <div>
    <vs-row justify="space-around">
      <vs-col class="margcol" v-for="notif in notifList" :key="notif.id">
        <div class="shadow p-3 mb-5 bg-white rounded">
          <vs-row class="mh" align="center" justify="space-around" direction="column">
            <vs-col class="text-justify">
              <h4>{{notif.title}}</h4>
              <h6>
                <div v-for="pn in profList" :key="pn.value">
                  <div v-if="pn.value==notif.profId">
                    {{pn.text}}
                  </div>
                </div>
              </h6>
              {{notif.notif_date}} {{notif.notif_time}}<br>
                <p>
                  {{notif.text}}
                </p>
              <br>
              <div class="icons">
              </div>
            </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      notifList : [],
      profList : [],
    }
  },
  methods:{
    async fetchNotif(){
        axios.get("http://localhost:8000/notifs/filier/"+this.$myauth.user_id)
        .then(response => (this.notifList = response.data))
    },
    async fetchDataProf(){
            axios.get("http://localhost:8000/profs/user/all",this.$myauth.getBearer())
            .then(response => (this.profList = response.data))
    }, 
    
  },
  mounted(){
    this.fetchNotif()
    this.fetchDataProf()
  }
}
</script>
<style scoped>

.margcol {
    /* margin: 30px 90px 0px 0px; */
    margin-left: 5px;
    width: 360px;
    /* margin-right: 5px; */
}
.icons {
    text-align: right;
}
</style>