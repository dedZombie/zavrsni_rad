<template>
    <div id="dashboard">
        <Jumbotron />
        
        <div class="container">
            <h3 class="white-text">{{ message }}</h3>
            <div class="row">
                <div class="col s12 m6 l4" v-for="vehicle in vehicles" :key="vehicle.id">
                    <div class="card">
                        <div class="card-image">
                            <img :src="vehicle.image_src" alt="Image couldn't be loaded">
                            <span class="card-title white-text lighten-2">{{ vehicle.name}} {{ vehicle.model}}</span>
                            <router-link v-bind:to="{name:'view-car', params:{car_id: vehicle.car_id}}"
                                        class="btn-floating halfway-fab waves-effect waves-light red">
                                    <i class="material-icons">remove_red_eye</i>
                            </router-link>
                        </div>
                        <div class="card-content indigo">
                            <ul class="collection">
                                <li class="collection-item"><b>Cena: </b> {{ vehicle.price}} <span>&euro;</span></li>
                                <li class="collection-item"><b>Godište: </b> {{ vehicle.year}}.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <button>See all...</button> -->

            <div class="fixed-action-btn">
                <router-link to="/new" class="btn-floating btn-large pulse red">
                    <i class="large material-icons">add</i>
                </router-link>
                <ul>
                    <li>
                        <a class="btn-floating red">
                            <i class="material-icons">insert_chart</i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import Jumbotron from '@/components/Jumbotron'

export default {
    name: 'dashboard',
    components: {
        Jumbotron
    },
    data() {
        return {
            message: 'Most recently Added',
            vehicles: []
        }
    },
    created() {
        db.collection('vehicles').orderBy("car_id").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                    'id': doc.id,
                    'car_id': doc.data().car_id,
                    'distance': doc.data().distance,
                    'engine_size': doc.data().engine_size,
                    'engine_type': doc.data().engine_type,
                    'image_src': doc.data().image_src,
                    'model': doc.data().model,
                    'name': doc.data().name,
                    'power': doc.data().power,
                    'price': doc.data().price,
                    'type': doc.data().type,
                    'year': doc.data().year
                }
                this.vehicles.push(data)
            })
        })
    },
}

// document.addEventListener('DOMContentLoaded', function(){
// var elem = document.querySelector('.fixed-action-btn');
// var instance = M.FloatingActionButton.init(elem);
// });

</script>

<style scoped>
h3{
    padding-left: .75rem;
}
.card-image .card-title{
    font-size: 16px;
}
.fixed-action-btn {
    bottom: 23px;
}
ul.collection,
ul.collection > li{
    border: none;
}
.card .card-image img{
    max-width: 100%;
    height: 180px;    
}
</style>
