<template>
  <li
    class="photos__item"
    v-for="item, i in photos"
    :key="i"
  >
    <img
      class="photos__img"
      :src="item.photo"
      :alt="item.breed"
    >
    <button class="photos__like-btn btn">
      <img
        :src="likeIcon"
        alt=""
      >
    </button>
    <span class="photos__title">{{ item.breed }}</span>
  </li>
</template>

<script>
import { defineComponent } from 'vue';
import likeIcon from '../assets/like-icon-big.png';

export default defineComponent({
  props: ['photos'],
  setup() {
    return {
      likeIcon,
    };
  },
});
</script>
