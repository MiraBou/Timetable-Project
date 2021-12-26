<template>
  <div>
       <div class="row">
            <div class="Table">
            <!-- <div class="Title">
                    <div>{{filier_title}}</div><br>
            </div> -->
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
            <div class="Row" v-for="(items, i) in emploi" :key="i+1">
                <div class="CellDays col-xs">
                    <div class="box">{{Days[i]}}</div>
                </div>
                <div class="col-xs" :class="classCell(j+1)"
                    v-for="(item, j) in items.slice(0,2).concat(null).concat(items.slice(2))" :key="j+1"
                    
                    :style="{ color: item&&item.textColor?item.textColor:'#000', 'background-color': item&&item.color?item.color:'#fff' }">
                    <div class="box">
                        <span v-if="item">
                            {{ item.title }}<br>
                            <div v-for="fl in filierList" :key="fl.id">
                                <div v-if="fl.id==item.filierId">
                                    {{fl.label}}
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
            filierList : [{ text: 'Select One', value: null }],

        }
    },
    methods : {
        async fetchEmploi(prof_id){
            axios
            .get("http://localhost:8000/timeslots/prof/"+prof_id)
            .then(response => (this.emploi  =response.data))
        },
        async fetchDataFilier(){
            axios.get("http://localhost:8000/filiers",this.$myauth.getBearer())
            .then(response => (this.filierList = response.data))
        },
        classCell(ind){
            if(ind != 3)
                return "Cell"
            return "EmptyCell"
        },
    },
    mounted(){
        this.fetchDataFilier()
    },
    async created(){
        await this.fetchEmploi(this.$myauth.user_id)
    },
}
</script>

<style scoped>
.drop{
    text-align: center;
    width: auto;
}
.Title
{
    /* display: table-caption; */
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