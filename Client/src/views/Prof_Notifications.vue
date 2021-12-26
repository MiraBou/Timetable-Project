<template>
  <div>
    <vs-row justify="space-around">
      <vs-col class="margcol" v-for="notif in notifList" :key="notif.id">
        <div class="shadow p-3 mb-5 bg-white rounded">
          <vs-row class="mh" align="center" justify="space-around" direction="column">
            <vs-col class="text-justify">
              <h6>{{notif.title}}</h6>
              {{notif.notif_date}} {{notif.notif_time}}<br>
                <p>
                  {{notif.text}}
                </p>
              <br>
              <div class="icons">
              <a v-on:click="showModelUpdate(notif)" class="settings" ><i class="material-icons">&#xE8B8;</i></a>
              <a v-on:click="coonfirmDelet(notif)" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a>    
              </div>
            </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>
    <a v-on:click="showModel" class="float primary">
    <i class="fa fa-plus my-float"></i>
    <b-modal id="bv-modal-delete" hide-footer @hidden="resetModal" centered>
                <div class="d-block text-center">
                    <h3>Etes-vous sûr que vous voulez supprimer : {{selectedNotification.title}}?</h3>
                </div>
                <b-button class="mt-3" variant="danger" block @click="deleteNotification()">Delete</b-button>
    </b-modal>
    <AddNotif ref="addNotifModel"/>
    <UpdateNotif ref="updateNotifModel"/>
    </a>
    <br><br>
  </div>
</template>

<script>
import AddNotif from '../components/layout/AddNotif.vue'
import UpdateNotif from '../components/layout/UpdateNotif.vue'
import axios from 'axios'

export default {
  components: { 
    AddNotif,
    UpdateNotif 
  },
  data(){
    return {
      notifList : [],
      filierList : [{ text: 'Select One', value: null }],
      selectedNotification : {}
    }
  },
  methods:{
    async fetchNotif(){
        axios.get("http://localhost:8000/notifs/prof/"+this.$myauth.user_id)
        .then(response => (this.notifList = response.data))
    },
    async fetchFilier(){
          const response = await axios.get("http://localhost:8000/filiers?limit=20",this.$myauth.getBearer())
            for(let index = 0; index < response.data.length; index++) {
                this.filierList.push({ text:response.data[index].title , value:response.data[index].id })
            }
    },  
    showModel(){
      this.$refs.addNotifModel.show(this.filierList);
      this.fetchNotif()
    },
    showModelUpdate(notif){
      this.$refs.updateNotifModel.show(notif,this.filierList)
      this.fetchNotif()
    },
    coonfirmDelet(notif){
            this.selectedNotification = notif
            this.$bvModal.show('bv-modal-delete')
    },
    async deleteNotification(){
            await axios.delete('http://localhost:8000/notifs/'+this.selectedNotification.id,this.$myauth.getBearer())
            await this.fetchNotif();
            this.resetModal
            this.$bvModal.hide('bv-modal-delete')

    },
    resetModal(){
      this.selectedNotification = {}
    },
  },
  mounted(){
    this.fetchNotif()
    this.fetchFilier()
    this.$root.$on("fetchNotif",() => {
        return this.fetchNotif()
    })
  }
}
</script>

<style scoped>
    
.float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: rgb(26,92,255);
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
}

.my-float {
    margin-top: 22px;
}

.margcol {
    /* margin: 30px 90px 0px 0px; */
    margin-left: 5px;
    width: 360px;
    /* margin-right: 5px; */
}

a.settings {
    color: #2196F3;
}

a.settings:hover {
    color: #0f406b;
}

a.delete {
    color: #F44336;
}

a.delete:hover {
    color: #4A1612;
}

.icons {
    text-align: right;
}
</style>