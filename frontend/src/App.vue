<template>
<div>
  <HeaderComponent class="HeaderComponent"></HeaderComponent>
  <router-view></router-view>
</div>
</template>

<script>
 import HeaderComponent from '@/components/HeaderComponent.vue'
 
export default {
  name :"App",
  components :{ HeaderComponent },
  
}

</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "Roboto", sans-serif;
  background-color: #f2f2f2;
}
h1{
  font-family: "Shrikhand";
  font-weight: bold;
}
</style>