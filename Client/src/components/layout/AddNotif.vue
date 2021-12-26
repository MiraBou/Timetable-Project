<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Ajouter une nouvelle Notification"
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
        notif_date : '',
        notif_time : '',
        errorMessage : null,
        notif : {},
        error : false,
      }
    },
    methods: {
      async fetchDatafilier(){
            const total  = await axios.get("http://localhost:8000/filiers/filier/count",this.$myauth.getBearer())
            const filiers = await axios.get("http://localhost:8000/filiers?limit="+total.data,this.$myauth.getBearer())
            if(filiers.status === 200){
              filiers.data.forEach(filier => {
                this.filierList.push({text : filier.title, value : filier.id})
              })
            }
      },
      async addnotif() {
        try {
          const res = await axios.post("http://localhost:8000/notifs", this.notif, this.$myauth.getBearer())
          return res
        } catch (err) {
          return err.response
        }
      },
      show(filierList){
        this.filierList = filierList
        this.$refs.modal.show()
      },
       updateData(){
        this.$root.$emit('fetchNotif')
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
        this.filierList = []
        this.notif_date = ""
        this.notif_time = ""
        this.notif = {}
        this.filierName = ''
        this.filierId = null
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
        // tetsNot: {
        //   title: "Titre de Notification 3",
        //   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sequi ducimus enim, provident tenetur delectus asperiores iusto quas maxime aperiam, atque assumenda laudantium, mollitia dignissimos molestiae vitae ab aut quisquam!",
        //   notif_date: "2021-01-09",
        //   notif_time: "12:30:00",
        //   filierId: 2,
        //   profId: 1
        // }
        let d = new Date()
        this.notif.title = this.title
        this.notif.text = this.textNotif
        this.notif.notif_date = d.toISOString().split('T')[0] 
        this.notif.notif_time = d.toTimeString().split(' ')[0] 
        this.notif.filierId = this.filierName
        this.notif.profId = this.$myauth.user_id
        this.error = false
        const res = await this.addnotif()
        if(res.status !== 200){
          this.error = true
          this.errorMessage = res.data.detail
          return 
        }
        // Hide the modal 
         this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing')
                      })
        this.updateData()
      }
    },
    mounted() {
      this.fetchDatafilier()
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