<template>
  <div id="app" class="indigo darken-3">
    <Navbar/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
body {
  overflow: auto;
}
</style>
