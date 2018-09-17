<template>
    <div id="view-car">
        <div class="col s12 m7">
            <div class="row valign-wrapper">
                <div class="col s2 m2 l1 pull-l2">
                    <router-link to="/" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="large material-icons">arrow_back</i>
                    </router-link>
                </div>
                <div class="col s10 m10 l10 pull-l1">
                    <h3 class="header white-text">{{ name }} {{ model }}</h3>
                </div>
            </div>
            
            <div class="card horizontal">
                <div class="card-image">
                    <!-- <img src="https://via.placeholder.com/650x450"> -->
                    <img :src="image_src" alt="" class="responsive-img">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item indigo-text text-darken-3"><b>Distance:</b> {{ distance }} km</li>
                            <li class="collection-item indigo-text text-darken-3"><b>Engine size:</b> {{ engine_size }} cm<sup>3</sup></li>
                            <li class="collection-item indigo-text text-darken-3"><b>Engine type:</b> {{ engine_type }}</li>
                            <li class="collection-item indigo-text text-darken-3"><b>Power:</b> {{ power }}</li>
                            <li class="collection-item indigo-text text-darken-3"><b>Type:</b> {{ type }}</li>
                            <li class="collection-item indigo-text text-darken-3"><b>Year of production:</b> {{ year }}</li>
                            <li class="collection-item indigo-text text-darken-3"><b>Price:</b> {{ price }} &euro;</li>
                        </ul>
                        <router-link v-bind:to="{name:'edit-car', params:{car_id: car_id}}" 
                            class="btn-floating btn-large waves-effect waves-light red right">
                            <i class="material-icons">mode_edit</i>
                        </router-link>
                    </div>
                    <!-- <div class="card-action valing-wrapper">
                        
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'view-car',
    data() {
        return {
            id: null,
            car_id: null,
            distance: null,
            engine_size: null,
            engine_type: null,
            image_src: null,
            model: null,
            name: null,
            power: null,
            price: null,
            type: null,
            year: null
        }
    },
    beforeRouteEnter(to, from, next) {
        db.collection('vehicles').where('car_id', '==', to.params.car_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.id = doc.id
                    vm.car_id = doc.data().car_id
                    vm.distance = doc.data().distance
                    vm.engine_size = doc.data().engine_size
                    vm.engine_type = doc.data().engine_type
                    vm.image_src = doc.data().image_src
                    vm.model = doc.data().model
                    vm.name = doc.data().name
                    vm.power = doc.data().power
                    vm.price = doc.data().price
                    vm.type = doc.data().type
                    vm.year = doc.data().year
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('vehicles').where('car_id', '==', this.$route.params.car_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.id = doc.id
                    this.car_id = doc.data().car_id
                    this.distance = doc.data().distance
                    this.engine_size = doc.data().engine_size
                    this.engine_type = doc.data().engine_type
                    this.image_src = doc.data().image_src
                    this.model = doc.data().model
                    this.name = doc.data().name
                    this.power = doc.data().power
                    this.price = doc.data().price
                    this.type = doc.data().type
                    this.year = doc.data().year
                })
            })
        }
    }
}
</script>

<style scoped>
ul.collection,
ul.collection > li{
    border: none;
}
</style>
