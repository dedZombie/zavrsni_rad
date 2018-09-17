<template>
    <div id="edit-car">
        <h3 class="white-text">{{ message }}</h3>
        <div class="row">
            <form @submit.prevent="updateCar" class="col s12 m6 l12">
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="car_id" disabled>
                        <label class="active">Car ID</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="name" required>
                        <label class="active">Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="model" required>
                        <label class="active">Model</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="distance" required>
                        <label class="active">Distance</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="engine_size" required>
                        <label class="active">Engine size</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="engine_type" required>
                        <label class="active">Engine type</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="power" required>
                        <label class="active">Power</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="type" required>
                        <label class="active">Type</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="year" required>
                        <label class="active">Year</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="price" required>
                        <label class="active">Price</label>
                    </div>
                </div>
            </form>

            <div class="row">
                <div class="col s12 l12 valign-wrapper px-0">
                    <div class="col s12 m6 l6">
                        <input 
                            style="display: none" 
                            type="file" 
                            @change="onFileSelected"
                            ref="fileInput">
                        <button @click="$refs.fileInput.click()" class="btn btn-large right w-50">Select image</button>
                    </div>
                    <div class="col s12 m6 l6">
                        <button class="btn btn-large w-50" id="upload-btn"
                                @click="onUpload">Upload image
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>

            <form @submit.prevent="updateCar" class="col s12 m6 l12">
                <div class="row">
                    <div class="col s12 m6 l6">
                        <button type="submit" class="btn btn-large right w-50">Submit</button>
                    </div>
                    <div class="col s12 m6 l6">
                        <router-link to="/" class="btn btn-large grey w-50">Cancel</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
    name: 'edit-car',
    data() {
        return {
            message: 'Edit Car component',
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
            year: null,
            selectedFile: null
        }
    },
    beforeRouteEnter(to,from,next) {
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
        '$route' : 'fetchData'
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
        },
        onFileSelected(event) {
            this.selected = event.target.files[0]
        },
        onUpload() {
            var selectedFile = this.selectedFile
            var image_src = this.image_src
            var filename = selectedFile.name
            var storageRef = firebase.storage().ref();

            var metadata = {
                contentType: 'image/jpeg'
            }
            var uploadTask = storageRef.child(filename).put(selectedFile, metadata);

            uploadTask.on('state_changed', function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                /* eslint-disable */
                console.log('Upload is ' + progress + '% done');
            }, function(error) {
                // Handle unsuccessful uploads
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    // console.log(downloadURL);
                    image_src = downloadURL
                    /* eslint-disable */
                    console.log(image_src)
                }).catch(err => {
                    /* eslint-disable */
                    console.log(err)
                });
            });
        },
        updateCar() {
            db.collection('vehicles').where('car_id', '==', this.$route.params.car_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        car_id: this.car_id,
                        distance: this.distance,
                        engine_size: this.engine_size,
                        engine_type: this.engine_type,
                        image_src: this.image_src,
                        model: this.model,
                        name: this.name,
                        power: this.power,
                        price: this.price,
                        type: this.type,
                        year: this.year
                    })
                    .then(() => {
                        this.$router.push({name: 'view-car', params: {car_id: this.car_id}})
                    })
                })
            })
        }
    }
}
</script>

<style scoped>
#upload-btn {
    margin-left: auto;
    margin-right: auto;
}
.px-0 {
    padding-left: 0;
    padding-right: 0;
}
.w-50 {
    width: 50%;
}
input[type=text]:not(.browser-default):disabled{
    border-bottom-color: rgb(158, 158, 158);
    cursor: not-allowed;
}
</style>
