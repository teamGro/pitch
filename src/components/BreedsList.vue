<template>
  <div
    class="breeds"
    v-if="isOpen"
  >
    <ul class="breeds__selected-list">
      <li
        class="breeds__item"
        :class="{'breeds__item_selected': activeFilters.length === 0 }"
        @click="getAllDogs"
      >Все пёсели</li>
    </ul>
    <ul class="breeds__list">
      <li
        class="breeds__item-container"
        v-for="breed, i in breeds"
        :key="i"
      >
        <span class="breeds__letter">{{ i }}</span>
        <span
          class="breeds__item"
          v-for="item in breed"
          :key="item"
          @click="addToFilterList(item)"
        >{{ item }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import fixedNumbers from '@/helpers/constants';

export default defineComponent({
  props: ['isOpen'],
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const addToFilterList = (breed) => {
      if (route.query.breed && route.query.breed.indexOf(breed) === -1) {
        router.replace({ name: 'Main', query: { breed: `${route.query.breed}&${breed}` } });
      } else if (!route.query.breed) {
        router.replace({ name: 'Main', query: { breed } });
      }
    };

    const getAllDogs = () => {
      router.replace({ name: 'Main', query: '' });
      store.commit('clearFilters');
      store.dispatch('getPhotos', { repeatQuantity: fixedNumbers.firstPhotosQty });
    };

    return {
      breeds: computed(() => store.getters.getBreedsTitle),
      addToFilterList,
      getAllDogs,
      activeFilters: computed(() => store.state.filterBreeds),
    };
  },
});
</script>
