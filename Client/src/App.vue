<script>
import HeaderStore from '@/components/HeaderStore.vue'
import FooterStore from '@/components/FooterStore.vue'
export default {
  components: {
    HeaderStore,
    FooterStore
  }
}
</script>

<template>
  <div class="header">
    <HeaderStore />
  </div>
  <div class="main_content">
    <router-view></router-view>
  </div>
  <div class="footer">
    <FooterStore />
  </div>
</template>

<style></style>