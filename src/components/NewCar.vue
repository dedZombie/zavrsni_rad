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
                            ref="fileInput"
                            multiple>
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

        <div class="row" id="preloaderWrapper">
            <div class="preloader-wrapper big active" id="preloader">
                <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
            <span id="preloder-text">Uploading...</span>
        </div>

        <div class="row white z-depth-3" id="upload-completed">
            <span class="indigo-text">Image uploaded successfully</span>
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
            console.log('Selected file: ', this.selectedFile)
        },
        onUpload() {
            var selectedFile = this.selectedFile
            /* eslint-disable */
            console.log('Selected file to upload: ', selectedFile)
            var self = this
            var filename = selectedFile.name
            var storageRef = firebase.storage().ref(this.name);

            var metadata = {
                contentType: selectedFile.type
            }
            /* eslint-disable */
            console.log('Metadata: ', metadata)

            var uploadTask = storageRef.child(filename).put(selectedFile, metadata);

            uploadTask.on('state_changed', function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var preloader = document.getElementById('preloaderWrapper')
                preloader.style.display = 'block'
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function(error) {
                // Handle unsuccessful uploads
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    var preloader = document.getElementById('preloaderWrapper')
                    var uploadCompleted = document.getElementById('upload-completed')
                    preloader.style.display = 'none'
                    // setTimeout(function(){ uploadCompleted.style.display = 'block' }, 2000)
                    var uploadCompletedDisplay = setInterval(uploadCompleted.style.display = 'block', 2000)
                    clearInterval(uploadCompletedDisplay)
                    // console.log(downloadURL);
                    self.image_src = downloadURL
                    /* eslint-disable */
                    console.log('Image source: ', self.image_src)
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
#preloaderWrapper {
    position: absolute;
    width: 150px;
    height: 150px;
    padding: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    border-radius: 15px;
    display: none;
    margin: 0;
}
#preloader {
    position: relative;
}
#preloder-text {
    position: relative;
    bottom: 0;
    left: 0;
    font-size: 1.2rem;
    margin-left: -10px;
}
#upload-completed {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin: 0;
    padding: 15px;
    border-radius: 25px;
    display: none;
}
#upload-completed span {
    font-size: 1.75rem;
    font-style: italic;
}
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