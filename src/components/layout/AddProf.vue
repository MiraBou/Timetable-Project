<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Ajouter nouveau prof" 
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"  
          invalid-feedback="Name is required">
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            ref="name"
            required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          :state="prenomState"
          label="Prenom: "
          label-for="Prenom-input"  
          invalid-feedback="Prenom is required">
          <b-form-input
            id="prenom-input"
            v-model="prenom"
            ref="prenom"
            :state="prenomState"
            required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          :state="usernameState"
          label="Username: "
          label-for="Username-input"  
          invalid-feedback="Username is required">
          <b-form-input
            id="username-input"
            v-model="username"
            ref="username"
            :state="usernameState"
            required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          :state="departementState"  
          label="Departement:" 
          label-for="Departement-input"
          invalid-feedback="Departement is required">
          <b-form-select
              id="Departement-input" 
              v-model="departementId" 
              :state="departementState"
              required 
              :options="departementList">
          </b-form-select>
         </b-form-group>

        <b-form-group
          :state="passwordState"
          label="Password: "
          label-for="Password-input"  
          invalid-feedback="Password is required">
          <b-form-input
            id="Password-input"
            v-model="password"
            ref="password"
            :state="passwordState"
            required>
          </b-form-input>
        </b-form-group>


        <div v-show="error">
          {{errorMessage}}
        </div>

      </form>
    </b-modal>
  <!-- </div> -->
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        prenom: '',
        prenomState : null,
        username: '',
        usernameState : null,
        password: '',
        passwordState : null,
        departementId : null,
        departementState : null,
        errorMessage : null,
        prof : {},
        departementList :[],
        error : false,
      }
    },
    methods: {
      async addprof(){
      try{
        const res = await axios.post("http://localhost:8000/profs", this.prof,this.$myauth.getBearer())
        // const res = await axios.post("http://localhost:8000/profs", this.testprof,this.$myauth.getBearer())
        return res
      }catch(err){
        return err.response
      }
      },
      showProf(departementList){
        this.departementList = departementList
        this.$refs.modal.show()
      },
      updateTotal(){
        this.$root.$emit('getTotalEntriesProf')
      },
       updateData(){
        this.$root.$emit('fetchDataProfs')
      },
      checkFormValidity() {
        const validName = this.$refs.name.checkValidity()
        const validPrenom = this.$refs.prenom.checkValidity()
        const validUsername = this.$refs.prenom.checkValidity()
        const validPassword = this.$refs.prenom.checkValidity()
        this.nameState = validName
        this.prenomState = validPrenom
        this.usernameState = validUsername
        this.passwordState = validPassword
        const valid = validName && validPrenom && validUsername && validPassword
        return valid
      },    
      resetModal() {
        this.name = ''
        this.prenom = ''
        this.username = ''
        this.password = ''
        this.departementId = null
        this.prof = {}
        this.departementList = []
        this.nameState = null
        this.prenomState = null
        this.usernameState = null
        this.passwordState = null
        this.errorMessage = null
        this.error = false
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.prof.lastName = this.name
        this.prof.firstName = this.prenom
        this.prof.username = this.username
        this.prof.password = this.password
        this.prof.departementId = this.departementId
        this.prof.type = 'prof'
        //this.checkRequestError()
        this.error = false
        const res = await this.addprof()
        if(res.status !== 200){
          this.error = true
          this.errorMessage = res.data.detail
          return 
        }
        // Hide the modal 
         this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing')
                      })
        //call getTotal methode from parent componet to update total
        this.updateTotal()
        this.updateData()
      }
    },
    
  }
</script>