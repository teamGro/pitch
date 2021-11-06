<template>
  <ul class="photos__list">
    <main-photo :photo="mainPhoto"></main-photo>
    <li
      class="photos__item photos__item_list"
      v-for="item, i in photos"
      :key="i"
      @click="addToFilter(item.breed)"
    >
      <photo-item :photo="item"></photo-item>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import MainPhoto from '@/components/MainPhoto.vue';
import PhotoItem from '@/components/PhotoItem.vue';
import useFilters from '@/hooks/useFilters';

export default defineComponent({
  components: { MainPhoto, PhotoItem },
  setup() {
    const { addToFilter } = useFilters();
    const store = useStore();

    return {
      mainPhoto: computed(() => store.getters.getMainPhoto),
      photos: computed(() => store.getters.getPhotos),
      addToFilter,
    };
  },
});
</script>
