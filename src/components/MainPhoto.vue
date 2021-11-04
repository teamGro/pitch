<template>
  <li class="photos__item photos__item_main">
    <img
      class="photos__img"
      :src="photo.photo"
      :alt="photo.breed"
    >
    <button class="photos__like-btn photos__like-btn_main btn">
      <img
        :src="likeIcon"
        alt=""
      >
    </button>
    <span class="photos__title photos__title_main">{{ photo.breed }}</span>
  </li>
</template>

<script>
import { defineComponent } from 'vue';
import likeIcon from '../assets/like-icon-big.png';

export default defineComponent({
  props: ['photo'],
  setup() {
    return {
      likeIcon,
    };
  },
});
</script>
