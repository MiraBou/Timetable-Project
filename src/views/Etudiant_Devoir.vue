<template>
    <div class="main bg-white">
    <div class="container">
    <div class="table-responsive">
        <div class="table-wrapper bg-light">
            <div class="table-title bg-primary">
                <div class="row">
                    <div class="col-sm-5">
                        <h2><b>Devoirs</b></h2>
                    </div>
                    <div class="col-sm-7">
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover table-white">
                <thead>
                    <tr>
                        <!-- <th>#</th> -->
                        <th>Titre</th>
                        <th>Date Limite</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="devoir in this.info" :key="devoir.id" v-on:click="showModel(devoir)">
                        <td @mouseover="isHovering = true" @mouseout="isHovering = false">
                            <i :class="isHovering ? 'bx bxs-notepad' : 'bx bx-notepad'"></i> {{devoir.title}}
                        </td>
                        <td> <span v-text="currentDateTime(devoir.endRecur,devoir.endTime)"></span></td>                    
                    </tr>
                </tbody>
            </table>
            <div class="clearfix">
                <div class="hint-text">Showing <b>{{currentEntrie}}</b> out of <b>{{calcEntries}}</b> entries</div>
                <ul class="pagination">
                    <li :class="{disabled : btnDisabledPrevious}" class="page-item"><a class="page-link" v-on:click="Previous">Previous</a></li>
                    <li class="page-item active"><a href="#" class="page-link">{{count}}</a></li>
                    <li :class="{disabled : btnDisabledNext}" class="page-item" ><a v-on:click="Next" class="page-link" >Next</a></li>
                </ul>
            </div>
        </div>
    </div>
    <PopUpDevoir ref="popupdevoir" />
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import PopUpDevoir from '../components/layout/PopUpDevoir.vue'

export default {
    components : {
        PopUpDevoir
    },
    data(){
        return{
            info : "",
            skip : 0,
            count : 1,
            total: 0,
            currentEntrie : 1,
            selectedDevoir : {},
            prof : "",
            isHovering: false,
            date_devoir : ''
        }
    },
    methods:{
        async fetchData(){
            axios
            .get("http://localhost:8000/devoirs/filier/"+this.$myauth.user_id)
            .then(response => (
                this.info = response.data
            ))
        },
        async fetchDataProf(){
            axios
            .get("http://localhost:8000/profs/user/me",this.$myauth.getBearer())
            .then(response => (this.prof = response.data))
        },
        showModel(devoir){
            this.$refs.popupdevoir.show(devoir)
        },
        Next(){
            this.skip += 10
            this.count += 1
            this.currentEntrie += 1
            this.fetchData()
        },
        Previous(){
            this.skip -= 10
            this.count -= 1
            this.currentEntrie -= 1
            this.fetchData()
            
        },
        getTotalEntries(){
            axios
            .get("http://localhost:8000/devoirs/prof/count/1")
            .then(response => (this.total = response.data))
        },
        currentDateTime(endRecur,endTime) {
            let local = moment(endRecur.concat(" ".concat(endTime)))
            local.locale('fr')
            return local.format('LLL')
        },
        
    },
    mounted () {
        this.fetchData()
        this.getTotalEntries()
        this.currentDateTime()
    },
    computed:{
        calcEntries(){
            if(this.total%10 == 0)
                return Math.floor(this.total/10)
            else
                return (Math.floor(this.total/10) + 1)
        },
        btnDisabledPrevious(){
             if(this.currentEntrie == 1)
                return true
            else
                return false   
        },
        btnDisabledNext(){
            if(this.currentEntrie == this.calcEntries)
                return true
            else
                return false   
        },
    }
}
</script>

<style>
/* .main {
    color: #566787;
    background: #f5f5f5;
    font-family: 'Varela Round', sans-serif;
    font-size: 13px;
} */
/* .table-responsive {
    margin: 10px;
} */
.table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 20px 25px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {
    padding-bottom: 15px;
    /* background: #299be4; */
    color: #fff;
    padding: 16px 30px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}
.table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
}
.table-title .btn {
    color: #566787;
    float: right;
    font-size: 13px;
    background: #fff;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
}
.table-title .btn:hover, .table-title .btn:focus {
    color: #566787;
    background: #f2f2f2;
}
.table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
}
.table-title .btn span {
    float: left;
    margin-top: 2px;
}
table.table tr th, table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
}
table.table tr th:first-child {
    width: 60px;
}
table.table tr th:last-child {
    width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
}
table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
}	
table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
}
table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
}

table.table td a:hover {
    color: #2196F3;
}
table.table td a.settings {
    color: #2196F3;
}
table.table td a.settings:hover {
    color: #0f406b;
}
table.table td a.delete {
    color: #F44336;
}
table.table td a.delete:hover {
    color: #4A1612;
}
table.table td i {
    font-size: 19px;
}
table.table .avatar {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}
.status {
    font-size: 30px;
    margin: 2px 2px 0 0;
    display: inline-block;
    vertical-align: middle;
    line-height: 10px;
}
.text-success {
    color: #10c469;
}
.text-info {
    color: #62c9e8;
}
.text-warning {
    color: #FFC107;
}
.text-danger {
    color: #ff5b5b;
}
.pagination {
    float: right;
    margin: 0 0 5px;
}
.pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
}
.pagination li a:hover {
    color: #666;
}	
.pagination li.active a, .pagination li.active a.page-link {
    background: #03A9F4;
}
.pagination li.active a:hover {        
    background: #0397d6;
}
.pagination li.disabled i {
    color: #ccc;
}
.pagination li i {
    font-size: 16px;
    padding-top: 6px
}
.hint-text {
    float: left;
    margin-top: 10px;
    font-size: 13px;
}
</style>