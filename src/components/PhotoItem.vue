<template>
  <li
    class="photos__item"
    v-for="item, i in photos"
    :key="i"
    ref="photo"
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
        :coords="getCoords"
      >
    </button>
    <span class="photos__title">{{ item.breed }}</span>
  </li>
</template>

<script>
import {
  computed, defineComponent, ref, onMounted,
} from 'vue';
import likeIcon from '../assets/like-icon-big.png';

export default defineComponent({
  props: ['photos'],
  setup() {
    const photo = ref(null);

    // Hooks
    onMounted(() => {
      console.log('photo', photo.value);
    });

    const getCoords = computed(() => {
      if (photo.value) {
        // console.log(photo.value.getBoundingClientRect().top + window.pageYOffset);
      }
      return true;
    });

    return {
      likeIcon,
      photo,
      getCoords,
    };
  },
});
</script>
