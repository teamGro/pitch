<template>
  <ul class="photos__list">
    <main-photo :photo="mainPhoto"></main-photo>
    <photo-item :photos="photos"></photo-item>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import MainPhoto from '@/components/MainPhoto.vue';
import PhotoItem from '@/components/PhotoItem.vue';

export default defineComponent({
  components: { MainPhoto, PhotoItem },
  setup() {
    const store = useStore();

    return {
      mainPhoto: computed(() => store.getters.getMainPhoto),
      photos: computed(() => store.getters.getPhotos),
    };
  },
});
</script>
