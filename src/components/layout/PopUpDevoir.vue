<template>
    <b-modal 
    id="modal-1" 
    :title="`${title}`" 
    @hidden="resetModal"
    ref="modal"
    ok-only
    centered>
        <p class="my-4">{{descr}}</p>
        <p class="text-right"><span v-text="currentDateTime(endRecur,endTime)"></span></p>
    </b-modal>
</template>

<script>
import moment from 'moment'

  export default {
    data() {
      return {
        title : "",
        descr : "",
        endRecur : "",
        endTime : ""


      }
    },
    methods: {
        show(devoir){
            this.title = devoir.title
            this.descr = devoir.descr
            this.endRecur = devoir.endRecur
            this.endTime = devoir.endTime
            this.$refs.modal.show()
        },
        currentDateTime(endRecur,endTime) {
            let local = moment(endRecur.concat(" ".concat(endTime)))
            local.locale('fr')
            return local.format('LLL')
        },
      
      resetModal() {
        
      },
    //   handleOk(bvModalEvt) {
    //      this.$nextTick(() => {
    //                     this.$bvModal.hide('modal-prevent-closing')
    //                   })

    //   }
    },
   
    
}
    
</script>


