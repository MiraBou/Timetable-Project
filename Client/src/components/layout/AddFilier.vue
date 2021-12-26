<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Ajouter nouvelle Filiere"
      @hidden="resetModal"
      @ok="handleOk"
      centered 
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="labelState"
          label="Label"
          label-for="label-input"
          invalid-feedback="Label is required"
        >
          <b-form-input
            id="label-input"
            v-model="label"
            :state="labelState"
            ref="label"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="titleState"
          label="Title: "
          label-for="Title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            ref="title"
            :state="titleState"
            required
          ></b-form-input>
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
        label: '',
        labelState: null,
        title: '',
        titleState : null,
        password : '',
        passwordState : null,
        departementId : null,
        departementState : null,
        departementList :[],
        errorMessage : null,
        filier : {},
        error : false,
      }
    },
    methods: {
      async addfilier(){
      try{
        const res = await axios.post("http://localhost:8000/filiers", this.filier,this.$myauth.getBearer())
        return res
      }catch(err){
        return err.response
      }
      },
      
      show(departementList){
          this.departementList = departementList
          this.$refs.modal.show()
      },
      updateTotal(){
        this.$root.$emit('getTotalEntries')
      },
       updateData(){
        this.$root.$emit('fetchData')
      },
      checkFormValidity() {
        const validLabel = this.$refs.label.checkValidity()
        const validTitle = this.$refs.title.checkValidity()
        const validPassword = this.$refs.password.checkValidity()
        this.labelState = validLabel
        this.titleState = validTitle
        this.passwordState = validPassword
        const valid = validLabel && validTitle && validPassword
        return valid
      },    
      resetModal() {
        this.label = ''
        this.title = ''
        this.password = ''
        this.departementId = null
        this.filier = {}
        this.departementList = []
        this.labelState = null
        this.titleState = null
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
        // Push the label to submitted labels
        this.filier.label = this.label
        this.filier.title = this.title
        this.filier.username = this.label
        this.filier.password = this.password
        this.filier.type = "filiere"
        this.filier.departementId = this.departementId
        
        //this.checkRequestError()
        this.error = false
        const res = await this.addfilier()
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