<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import fixedNumbers from '@/helpers/constants';

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();

    store.dispatch('getAllBreeds');

    watch(
      () => route.query,
      () => {
        if (route.query.breed) {
          const breeds = route.query.breed.split('&');
          breeds.forEach((item, i) => {
            if (i === 0) {
              store.dispatch('getBreed', { breed: item, quantity: 13, isUpdate: false });
            } else {
              store.dispatch('getBreed', { breed: item, quantity: 12, isUpdate: true });
            }
            store.commit('addBreedToFilter', item);
          });
        } else if (!route.query.breed && !store.state.photos.length) {
          store.commit('clearPhotosBreeds');
          store.dispatch('getPhotos', fixedNumbers.firstPhotosQty);
        }
      },
    );

    return {};
  },
});
</script>

<style lang="less">
</style>
