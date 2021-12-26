<template>
  <div class="container">
    <br>
    <vs-row>
      <vs-col offset="0" w="4">
        <div class="shadow p-3 mb-5 bg-white rounded">
          <vs-row justify="space-around">
            <vs-col w="6">
              <vs-card type="2">
                <template #img>
                  <img src="https://www.w3schools.com/howto/img_avatar.png" alt="">
                </template>
                <template #text>
                  <p>
                    Update Image
                  </p>
                </template>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-row class="mh" align="center" justify="space-around" direction="column">
            <vs-col w="6">
              <br>
              <h3 align="center">{{this.info.lastName + ' ' +  this.info.firstName}}</h3>
            </vs-col>
            <vs-col w="9" align="center">
              <h6>Département mathématiques </h6>
              <h6>et informatique</h6>
            </vs-col>
          </vs-row>

        </div>
      </vs-col>


      <vs-col w="7">

        <vs-row>
          <vs-col offset="1">
            <div>
              <div class="margpad shadow p-3 mb-5 bg-white rounded">
                <vs-row class="mh" align="center" justify="space-between" direction="row">
                  <h4>Informations </h4>
                  <a v-on:click="showModelUpdate()" class="settings"><i style="font-size=20px;animation-duration:4s;"
                      class="fa fa-cog fa-xs fa-spin"></i></a>
                </vs-row>
                <hr>
                <template>
                  <vs-row class="mh" justify="space-between" direction="column">
                    <div>
                      <h6>First Name: </h6>
                      <h6 class="text-primary"> {{this.info.firstName}} </h6>
                    </div>
                    <br>
                    <div>
                      <h6>Last Name: </h6>
                      <h6 class="text-primary"> {{this.info.lastName}} </h6>
                    </div>
                    <br>
                    <div>
                      <h6>UserName: </h6>
                      <h6 class="text-primary"> {{this.info.username}} </h6>
                    </div>
                    
                  </vs-row>
                </template>
              </div>
            </div>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col offset="1">
            <div>
              <div class="margpad shadow p-3 mb-5 bg-white rounded">
                <vs-row class="mh" align="center" justify="space-between" direction="row">
                  <h4> Informations Supplémentaires</h4>
                  <a v-on:click="showModelUpdate()" class="settings">
                    <i class='bx bx-plus-circle bx-tada bx-rotate-270' style='color:#007bff' ></i></a>
                </vs-row>
                <hr>
                <template>
                <vs-row class="mh" justify="space-between" direction="column">
                    <div>
                      <h6>Email: </h6>
                      <h6></h6>
                    </div>
                    <br>
                    <div>
                      <h6>Phone: </h6>
                      <h6></h6>
                    </div>
                    <br>
                    <div class="main">
                      <h6>Adresse: </h6>
                      <h6></h6>
                      
                    </div>
                  </vs-row>
                </template>
              </div>
            </div>
          </vs-col>
        </vs-row>

      </vs-col>
    </vs-row>
    <UpdateProf ref="updateProfModel" />
  </div>
</template>
<script>
import axios from 'axios'
import UpdateProf from '../components/layout/UpdateProf.vue'


export default {
    components :  {
      UpdateProf
    },
    data(){
      return {
        info : "",
        value :'',
        departementList : [{ text: 'Select One', value: null }]
      }
    },
    methods:{
       async fetchDataProf(){
            axios
            .get("http://localhost:8000/profs/user/me",this.$myauth.getBearer())
            .then(response => (this.info = response.data))
        },
        async showModelUpdate(){
            this.$refs.updateProfModel.show(this.info,this.departementList)
        },
        async fetchDepartement(){
          const response = await axios.get("http://localhost:8000/departements",this.$myauth.getBearer())
            for(let index = 0; index < response.data.length; index++) {
                this.departementList.push({ text:response.data[index].title , value:response.data[index].id })
            }
        },
    },
    mounted(){
      this.fetchDataProf()
      this.fetchDepartement()
      this.$root.$on("fetchDataProf",() => {
        return this.fetchDataProf()
    })
    }
}
</script>

<style scoped>

  h5,h6{
    display: inline;
  }
  h6{
    margin-left: 30px;
  }
  .main{
    width: 70%;
    justify-content: center;
  }
  /* .center {
  margin-left: 20px;
  width: 70%;
  padding: 10px;
} */

@media screen and (max-width: 800px) {
h4,h6,h5
{
    font-size:2.5vw;}
h3
{
    font-size:3vw;}
    
}
.mh i
{
 font-size:2.5vw;
}

</style>
