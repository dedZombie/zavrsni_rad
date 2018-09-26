<template>
    <div id="jumbotron">
        <div class="row">
            <div class="col s12 m12 l12">
                <div class="card valign-wrapper">
                    <div class="card-image" id="dashboard-img">
                        <img src="../assets/logo.png" alt="" id="logo">
                    </div>
                    <p id="welcome-text">{{ msg.toUpperCase() }}</p>
                    <span id="filler-text">A product for all car sales enthusiast</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    name: 'jumbotron',
    data() {
        return {
            offsetHeight: null,
            msg: 'Welcome to Car Vue app'
        }
    },
    mounted() {
        var offsetHeight = this.offsetHeight
        var jumbotron = document.getElementById('jumbotron');
        offsetHeight = document.getElementById('navigation').offsetHeight;
        jumbotron.style.height = 'calc(100vh - ' + offsetHeight + 'px)';

        var el, secondEl, thirdEl, name, secondName, thirdName, arr;
        el = document.getElementById("welcome-text");
        secondEl = document.getElementById("filler-text");
        thirdEl = document.getElementById("logo");
        name = "showText";
        secondName = "showSecondText";
        thirdName = "scale";
        arr = el.className.split(" ") && secondEl.className.split(" ") && thirdEl.className.split(" ");
        if (arr.indexOf(name) == -1 && arr.indexOf(secondName) == -1 && arr.indexOf(thirdName) == -1) {
            el.className += " " + name;
            secondEl.className += " " + secondName;
            thirdEl.className += " " + thirdName;
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Monoton|Poiret+One');
#jumbotron {
    margin-top: 20px;
    min-height: 100%;
}
#jumbotron::after {
    content: "";
    display: block;
}
.row, .row .col.l12,
.row .col.l12 .card {
    height: 100%;
}
.card {
    font-family: 'Poiret One', cursive;
    /* font-family: 'Monoton', cursive; */
    padding: 20px 0;
    margin: 0;
    background: #ffffff; /* Old browsers */
    background: -moz-linear-gradient(45deg, #ffffff 0%, #0a06d8 75%); /* FF3.6-15 */
    background: -webkit-linear-gradient(45deg, #ffffff 0%,#0a06d8 75%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(45deg, #ffffff 0%,#0a06d8 75%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#0a06d8',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
.card p {
    opacity: 0;
    margin: 0;
    font-size: 7rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-weight: bolder;
    color: beige;
    text-shadow: 5px 5px 3px rgba(0, 0, 0, 1);
}
.card span{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    margin-bottom: 50px;
    opacity: 0;
    font-weight: bolder;
}
.card p.showText {
    opacity: 1;
    transition: opacity 3s ease-in;
    z-index: 1;
}
.card span.showSecondText {
    opacity: 1;
    transition: opacity 5s ease-in;
    z-index: 1;
}
#dashboard-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    opacity: 0.6;
    z-index: 0;
}

#logo {
    width: 0px;
}
#logo.scale {
    width: 350px;
    transition: width 3s ease-in-out;
}
</style>
