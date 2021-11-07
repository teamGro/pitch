<template>
  <li
    class="photos__item photos__item_main"
    @click="addToFilter(photo.breed)"
  >
    <img
      class="photos__img"
      :src="photo.photo"
      :alt="photo.breed"
    >
    <button class="photos__like-btn photos__like-btn_main btn">
      <img
        :src="photo.isLike ? likeIconActive : likeIconDisactive"
        alt=""
        @click.stop="toggleLike(photo)"
      >
    </button>
    <span class="photos__title photos__title_main">{{ photo.breed }}</span>
  </li>
</template>

<script>
import { defineComponent } from 'vue';
import likeIconDisactive from '../assets/like-icon-big.png';
import likeIconActive from '../assets/like-icon-active.png';
import useFilters from '@/hooks/useFilters';

export default defineComponent({
  props: ['photo'],
  setup() {
    const { toggleLike, addToFilter } = useFilters();

    return {
      likeIconDisactive,
      likeIconActive,
      toggleLike,
      addToFilter,
    };
  },
});
</script>
