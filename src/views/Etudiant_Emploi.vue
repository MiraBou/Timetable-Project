<template>
  <div class="container bg-white text-dark">
        <b-dropdown :text="Text" block variant="primary" class="m-2" >
            <div v-for="filier in this.filier_list.data" :key="filier.id">
            <b-dropdown-item v-on:click="selectedFilier(filier)">
                {{filier.title}}
            </b-dropdown-item>
            </div>
        </b-dropdown>
        <div class="Title">{{filier_title}}</div>
        <div class="row">
            <div class="Table">
            <div class="Heading">
                <div class="EmptyCell col-xs">
                    <div class="box"></div>
                </div>
                <div class="CellDays col-xs">
                    <div class="box">8h30 à 10h30</div>
                </div>
                <div class="CellDays col-xs">
                    <div class="box">10h30 à 12h30</div>
                </div>
                <div class="EmptyCell col-xs">
                    <div class="box"></div>
                </div>
                <div class="CellDays col-xs">
                    <div class="box">14h à 16h</div>
                </div>
                <div class="CellDays col-xs">
                    <div class="box">16h à 18h </div>
                </div>
            </div>
            <div class="Row" v-for="(items, dayOfWeek, i) in emploi" :key="i+1">
                <div class="CellDays col-xs">
                    <div class="box">{{Days[i]}}</div>
                </div>
                <div class="col-xs" :class="classCell(j+1)"
                    v-for="(item, j) in items.slice(0,2).concat(null).concat(items.slice(2))" :key="j+1"
                    :style="{ color: item&&item.textColor?item.textColor:'#000', 'background-color': item&&item.color?item.color:'#fff' }">
                    <div class="box">
                        <span v-if="item">
                            {{ item.title }}<br>
                            <div v-for="pn in profList" :key="pn.value">
                                <div v-if="pn.value==item.profId">
                                    {{pn.text}}
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="box" v-if="j==2"></div>
                </div>
            </div>
        </div>        
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            Days : ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],
            timeslotsMap : {
                1: "08:30:00",
                2: "10:30:00",
                3: "12:30:00",
                4: "14:00:00",
                5: "16:00:00",
                6: "18:00:00",
            },
            emploi : [],
            profList : [],
            filier_id : null,
            filier_label : null,
            filier_title : null,
            filierList : [{ text: 'Select One', value: null }],
            filier_list : "",
            semesterList : ["S1","S2","S3","S4","S5"],
            semester : null

        }
    },
    methods : {
        async fetchEmploi(id){
            axios
            .get("http://localhost:8000/timeslots/filier/"+id)
            .then(response => (this.emploi  =response.data))
        },
        async fetchFilierList(){
            axios
            .get("http://localhost:8000/filiers",this.$myauth.getBearer())
            .then(response => (this.filier_list = response))
        },
        async fetchDataProf(){
            axios.get("http://localhost:8000/profs/user/all",this.$myauth.getBearer())
            .then(response => (this.profList = response.data))
        },
        async selectedFilier(filier){
            this.filier_id = filier.id
            this.filier_label = filier.label
            this.filier_title = filier.title
            await this.fetchEmploi(filier.id)
        },
        classCell(ind){
            if(ind != 3)
                return "Cell"
            return "EmptyCell"
        },
        selectedSemester(semester){
            this.semester = semester
        },
    },
    mounted(){
        this.fetchFilierList()
        this.fetchDataProf()
    },
    async created(){
        await this.fetchEmploi(this.$myauth.user_id)
    },
    computed : {
        Text(){
            if(this.filier_id)
                return this.filier_label
            return "Select Filier"
        },
        Semester(){
            if(this.semester)
                return this.semester
            return "Select Filier"
        }, 
    }
}
</script>

<style scoped>
.drop{
    text-align: center;
    width: auto;
}
.Title
{
    text-align: center;
    font-weight: bold;
    font-size: larger;
}
.Table
{
    display: table;
    margin-bottom:10px;
}
.Heading
{
    display: table-row;
    font-weight: bold;
    text-align: center;
}
.Row
{
    display: table-row;
    min-width: 100px;
    height:75px;
}
.Cell
{
    display: table-cell;
    border: solid;
    border-width: thin;
    height: 70px;
    text-align: center;
    margin: auto;
    min-width: 260px;
}
.Cell:hover{
    background-color: #dee2e6;
}
.CellDays{
    display: table-cell;
    border: solid;
    border-width: thin;
    /* height: 50px; */
    text-align: center;
    margin: auto;
    min-width: 100px;
    vertical-align: middle
}
.EmptyCell{
    display: table-cell;
    min-width: 20px;
}
</style>