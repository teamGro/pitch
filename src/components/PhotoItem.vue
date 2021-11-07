<template>
  <img
    class="photos__img"
    :src="photo.photo"
    :alt="photo.breed"
  >
  <button
    class="photos__like-btn btn"
    @click.stop="toggleLike(photo)"
  >
    <img
      :src="photo.isLike ? likeIconActive : likeIconDisactive"
      alt=""
    >
  </button>
  <span class="photos__title">{{ photo.breed }}</span>
</template>

<script>
import { defineComponent } from 'vue';
import likeIconDisactive from '../assets/like-icon-big.png';
import likeIconActive from '../assets/like-icon-active.png';
import useFilters from '@/hooks/useFilters';

export default defineComponent({
  props: ['photo'],
  setup() {
    const { toggleLike } = useFilters();

    return {
      likeIconDisactive,
      likeIconActive,
      toggleLike,
    };
  },
});
</script>
