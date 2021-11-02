<template>
  <main-page></main-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import MainPage from './views/MainPage.vue';

export default defineComponent({
  components: { MainPage },
  setup() {
    const store = useStore();

    store.dispatch('getAllBreeds');
  },
});
</script>

<style lang="less">
</style>
