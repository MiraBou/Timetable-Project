<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Label"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
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
        errorMessage : null,
        departement : {},
        error : false,
      }
    },
    methods: {
      async adddepartement(){
      try{
        const res = await axios.post("http://localhost:8000/departements", this.departement,this.$myauth.getBearer())
        return res
      }catch(err){
        return err.response
      }
      },
      
      show(){
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
        this.labelState = validLabel
        this.titleState = validTitle
        const valid = validLabel && validTitle
        return valid
      },    
      resetModal() {
        this.label = ''
        this.title = ''
        this.departement = {}
        this.labelState = null
        this.titleState = null
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
        this.departement.label = this.label
        this.departement.title = this.title
        //this.checkRequestError()
        this.error = false
        const res = await this.adddepartement()
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