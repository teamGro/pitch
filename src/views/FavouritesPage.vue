<template>
  <base-header></base-header>
  <div class="container">
    <ul class="photos__list">
      <li
        class="photos__item photos__item_favourites"
        v-for="item, i in favourites"
        :key="i"
      >
        <photo-item :photo="item"></photo-item>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import BaseHeader from '@/components/BaseHeader.vue';
import PhotoItem from '@/components/PhotoItem.vue';

export default defineComponent({
  components: { BaseHeader, PhotoItem },
  setup() {
    const store = useStore();

    const favourites = JSON.parse(localStorage.getItem('favourites'));
    if (favourites && favourites.length) {
      store.commit('setFavourites', favourites);
    }

    return {
      favourites: computed(() => store.state.favourites),
    };
  },
});
</script>
