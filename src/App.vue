<template>
  <div>
    <div id="app" class="indigo darken-3">
      <Navbar/>
      <div>
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}
body {
  overflow: auto;
}
#app {
  min-height: 100%;
  /* negative value is same measurement as footer height */
  margin-bottom: -60px;
}
#app::after {
  content: "";
  display: block;
}
footer.page-footer, #app::after{
  height: 60px;
}
</style>
