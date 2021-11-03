<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
// import MainPage from './views/MainPage.vue';

export default defineComponent({
  // components: { MainPage },
  setup() {
    const store = useStore();

    store.dispatch('getAllBreeds');
    store.dispatch('getPhotos', 13);
  },
});
</script>

<style lang="less">
</style>
