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
        :src="likeIcon"
        alt=""
        @click="toggleLike(photo)"
      >
    </button>
    <span class="photos__title photos__title_main">{{ photo.breed }}</span>
  </li>
</template>

<script>
import { defineComponent, watch } from 'vue';
import likeIconDisactive from '../assets/like-icon-big.png';
import likeIconActive from '../assets/like-icon-active.png';
import useFilters from '@/hooks/useFilters';

export default defineComponent({
  props: ['photo'],
  setup() {
    const {
      toggleLike, isLike, likeIcon, addToFilter,
    } = useFilters();

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
      addToFilter,
    };
  },
});
</script>
