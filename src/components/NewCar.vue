<template>
    <div id="new-car">

        <div class="row">
            <form @submit.prevent="saveCar" class="col s12">
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="car_id" required>
                        <label>Car ID</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="name" required>
                        <label>Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="model" required>
                        <label>Model</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="distance" required>
                        <label>Distance</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="engine_size" required>
                        <label>Engine size</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="engine_type" required>
                        <label>Engine type</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="power" required>
                        <label>Power</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="type" required>
                        <label>Type</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="year" required>
                        <label>Year</label>
                    </div>
                    <div class="input-field col s12 m6 l6">
                        <input type="text" class="white-text" v-model="price" required>
                        <label>Price</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6 m6 l6">
                        <button type="submit" class="btn btn-large right w-50">Submit</button>
                    </div>
                    <div class="col s6 m6 l6">
                        <router-link to="/" class="btn btn-large grey w-50">Cancel</router-link>
                    </div>
                </div>
            </form>    
            
            <div class="row">
                <div class="col s12 l12 valign-wrapper px-0">
                    <div class="col s6 m6 l6">
                        <input 
                            style="display: none" 
                            type="file"
                            @change="onFileSelected"
                            ref="fileInput">
                        <button @click="$refs.fileInput.click()" class="btn btn-large right w-50">Select image</button>
                    </div>
                    <div class="col s6 m6 l6">
                        <button class="btn btn-large w-50" id="upload-btn"
                                @click="onUpload">Upload image
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
    name: 'new-car',
    data() {
        return {
            message: 'New car Component',
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
    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0]
            /* eslint-disable */
            console.log(this.selectedFile)
        },
        onUpload() {
            var selectedFile = this.selectedFile
            /* eslint-disable */
            console.log(selectedFile)
            var self = this
            var filename = selectedFile.name
            var storageRef = firebase.storage().ref(this.name);

            var metadata = {
                contentType: 'image/jpeg'
            }
            var uploadTask = storageRef.child(filename).put(selectedFile, metadata);

            uploadTask.on('state_changed', function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function(error) {
                // Handle unsuccessful uploads
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    // console.log(downloadURL);
                    self.image_src = downloadURL
                    /* eslint-disable */
                    console.log(self.image_src)
                }).catch(err => {
                    /* eslint-disable */
                    console.log(err)
                });
            });
        },
        saveCar() {
            db.collection('vehicles').add({
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
            .then(docRef => this.$router.push('/'))
            .catch( err => /* eslint-disable */ console.log(err) )
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
.row .col.l6 > .w-50 {
    width: 50%;
}
.row .col.s6 > .w-50{
    width: 100%;
}
</style>