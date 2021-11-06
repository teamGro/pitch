<template>
  <img
    class="photos__img"
    :src="photo.photo"
    :alt="photo.breed"
  >
  <button
    class="photos__like-btn btn"
    @click="toggleLike(photo)"
  >
    <img
      :src="likeIcon"
      alt=""
    >
  </button>
  <span class="photos__title">{{ photo.breed }}</span>
</template>

<script>
import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import likeIconDisactive from '../assets/like-icon-big.png';
import likeIconActive from '../assets/like-icon-active.png';
import useFilters from '@/hooks/useFilters';

export default defineComponent({
  props: ['photo'],
  setup() {
    const { toggleLike, isLike, likeIcon } = useFilters();
    const route = useRoute();

    if (route.name === 'Favourites') {
      likeIcon.value = likeIconActive;
    }

    watch(isLike, (value) => {
      if (value) {
        likeIcon.value = likeIconActive;
      } else {
        likeIcon.value = likeIconDisactive;
      }
    });

    return {
      likeIcon,
      toggleLike,
    };
  },
});
</script>
