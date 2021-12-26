<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Mettre à jour Filiere:"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      centered
    >
    <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group 
          :state="filierState" 
          label="Filier" 
          label-for="filierinput" 
          invalid-feedback="Filier is required"
        >
        <b-form-select
              id="filierinput" 
              v-model="FilierId" 
              :state="filierState"
              required 
              :options="filierList">
        </b-form-select>
        </b-form-group>
        
        <b-form-group
          :state="titleState"
          label="Titre: "
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
          :state="textNotifState"
          label="Text"
          label-for="textNotif-input"
          invalid-feedback="Textiption is required"
        >
          <b-form-input
            id="textNotif-input"
            v-model="textNotif"
            :state="textNotifState"
            ref="textNotif"
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
        textNotif: '',
        textNotifState: null,
        title: '',
        titleState : null,
        filierName : '',
        filierId : null,
        filierState : null,
        filierList: [],
        errorMessage : null,
        notif : {},
        error : false,
      }
    },
    methods: {
        async addnotif() {
            try {
                const res = await axios.post("http://localhost:8000/notifs/"+this.notif.id, this.notif, this.$myauth.getBearer())
                return res
            } catch (err) {
                return err.response
            }
        },
        show(notif,filierList) {
            this.$refs.modal.show()
            this.notif = notif
            this.textNotif = notif.text
            this.title = notif.title
            this.filierId = notif.filierId
            this.filierName = notif.filierId
            this.filierList = filierList
        },
        checkFormValidity() {
            const validText = this.$refs.textNotif.checkValidity()
            const validTitle = this.$refs.title.checkValidity()
            this.textNotifState = validText
            this.titleState = validTitle
            const valid = validText && validTitle
            return valid
        },
        resetModal() {
            this.textNotif = ''
            this.textNotifState = null
            this.title = ''
            this.titleState = null
            this.filierList = {}
            this.filierName = ''
            this.filierId = null
            this.notif = {}
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
            this.notif.text = this.textNotif
            this.notif.title = this.title
            this.notif.filierId = this.filierName
            //this.checkRequestError()
            this.error = false
            const res = await this.addnotif()
            if (res.status !== 200) {
                this.error = true
                this.errorMessage = res.data.detail
                return
            }
            // Hide the modal 
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
            this.$root.$emit('fetchNotif')
        }
    },
    computed: {
      FilierId: {
        get(){
              return this.filierName
        },
        set(FilierId){
              this.filierName = FilierId
              Object.values(this.filierList).forEach(val => {
                if(val.text == FilierId)
                  this.filierId = val.value
              });
        }
      }
    }
  }
</script>