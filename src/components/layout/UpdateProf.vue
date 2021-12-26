<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modalUpdateProf"
      title="Edit prof" 
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      centered
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
            v-on:change="detectchange"
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
            v-on:change="detectchange"
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
            v-on:change="detectchange"
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
              ref="departement"
              :state="departementState"
              v-on:change="detectchange"
              required 
              :options="departementList">
          </b-form-select>
         </b-form-group>

        <b-form-group
          label="Add new password: "
          label-for="Password-input"  
          >
          <b-form-input
            id="Password-input"
            v-model="password"
            ref="password"
            v-on:change="detectchange"
            
            >
          </b-form-input>
        </b-form-group>


        <div v-show="error">
          {{errorMessage}}
        </div>

      </form>
    </b-modal>
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
        // passwordState : null,
        departementId : null,
        departementState : null,
        departementList :[],
        profId : null,
        errorMessage : null,
        prof : {},
        error : false,
        modelChange : false,
      }
    },
    methods: {
      show(reqProf,departementList){
          this.$refs.modalUpdateProf.show()
          this.departementList = departementList
          this.name = reqProf.lastName
          this.prenom = reqProf.firstName
          this.username = reqProf.username
          this.password = reqProf.password
          this.departementId = reqProf.departementId
          this.profId = reqProf.id 
      },
      async updateProf(){
        try{
        // const res = await axios.post("http://localhost:8000/profs/"+id, this.prof,this.$myauth.getBearer())
          
          const res = await axios.post("http://localhost:8000/profs/user/me", this.prof,this.$myauth.getBearer())
          return res
        }catch(err){
          return err.response
        }
      },
      updateData(){
        if(this.$myauth.user_type == 'admin')
          this.$root.$emit('fetchDataProfs')
        else
          this.$root.$emit('fetchDataProf')
      },
      checkFormValidity() {
        const validName = this.$refs.name.checkValidity()
        const validPrenom = this.$refs.prenom.checkValidity()
        const validUsername = this.$refs.username.checkValidity()
        // const validPassword = this.$refs.password.checkValidity()
        this.nameState = validName
        this.prenomState = validPrenom
        this.usernameState = validUsername
        // this.passwordState = validPassword
        const valid = validName && validPrenom && validUsername
        return valid
      },    
      resetModal() {
        this.modelChange = false
        this.name = ''
        this.prenom = ''
        this.username = ''
        this.password = ""
        this.departementId = null
        this.departementList = []
        this.prof = {}
        this.nameState = null
        this.prenomState = null
        this.usernameState = null
        this.departementState = null
        // this.passwordState = null
        this.errorMessage = null
        this.error = false
      },
      detectchange(){
        this.modelChange = true
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
        if(this.modelChange){
          this.prof.lastName = this.name
          this.prof.firstName = this.prenom
          this.prof.username = this.username
          this.prof.password = this.password == null ? "" : this.password
          this.prof.type = 'prof'
          this.prof.departementId = this.departementId
          this.prof.id = this.profId
          // console.log(this.prof)
          //this.checkRequestError()
          this.error = false
          const res = await this.updateProf()
          if(res.status !== 200){
            this.error = true
            this.errorMessage = res.data.detail
            return 
          }
        }
        // Hide the modal 
         this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing')
                      })
        //Send data to Crud_Prof
        //this.$emit('add-prof',res.data)
        this.updateData()
      }
    },
  }
</script>