<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Ajouter un Devoir"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        

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
          :state="descrState"
          label="Descr"
          label-for="descr-input"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="descr-input"
            v-model="descr"
            :state="descrState"
            ref="descr"
            required
          ></b-form-input>
        </b-form-group>
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
              ref="filier"
              required 
              :options="filierList">
        </b-form-select>
        </b-form-group>
        <b-form-group
          :state="descrState"
          label="Date limite"
          label-for="date-input"
          invalid-feedback="Date is required"
        >
        <b-form-input 
            id="date-input" 
            type="date"
            v-model="date"
            :state="dateState"
            ref="date"
            required
            ></b-form-input><br>
        <b-form-input 
            id="endtime-input" 
            type="time"
            v-model="endTime"
            ref="endTime"
            :state="endTimeState"
            required
            ></b-form-input>
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
        descr: '',
        descrState: null,
        title: '',
        titleState : null,
        date : '',
        dateState : null,
        endTime : "",
        endTimeState : null, 
        filierName : '',
        filierId : null,
        filierState : null,
        filierList: [],
        errorMessage : null,
        devoir : {},
        error : false,
      }
    },
    methods: {
      async adddevoir() {
        try {
          const res = await axios.post("http://localhost:8000/devoirs/"+this.devoir.id, this.devoir, this.$myauth.getBearer())
          return res
        } catch (err) {
          return err.response
        }
      },
      
      show(devoir,filierList){
        this.$refs.modal.show()
        this.filierList = filierList
        this.title = devoir.title
        this.filierName = devoir.filierId
        this.descr  =devoir.descr
        this.date = devoir.endRecur
        this.endTime  = devoir.endTime
        this.devoir = devoir
      },
      updateTotal(){
        this.$root.$emit('getTotalEntries')
      },
       updateData(){
        this.$root.$emit('fetchData')
      },
      checkFormValidity() {
        const validDescr = this.$refs.descr.checkValidity()
        const validTitle = this.$refs.title.checkValidity()
        // const validFiliere = this.$refs.filierState.checkValidity()
        const validDate = this.$refs.date.checkValidity()
        const validTime = this.$refs.endTime.checkValidity()
        this.descrState = validDescr
        this.titleState = validTitle
        // this.filierState  =validFiliere
        this.dateState = validDate
        this.endTimeState  =validTime
        const valid = validDescr && validTitle && validDate && validTime
        return valid
      },    
      resetModal() {
        this.descr = ''
        this.title = ''
        this.date = ''
        this.endTime = ''
        this.devoir = {}
        this.filierList = []
        this.descrState = null
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
        this.devoir.descr = this.descr
        this.devoir.title = this.title
        this.devoir.endRecur = this.date
        this.devoir.endTime = this.endTime
        this.devoir.matiereId = 1
        this.devoir.filierId = this.filierName
        this.devoir.profId = this.$myauth.user_id
        //this.checkRequestError()
        this.error = false
        const res = await this.adddevoir()
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
        // this.updateTotal()
        this.updateData()
      }
    },
    mounted() {
      // this.fetchDatafilier()
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


