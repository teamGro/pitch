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
        @click="toggleLike(photo)"
      >
    </button>
    <span class="photos__title photos__title_main">{{ photo.breed }}</span>
  </li>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';
import likeIconDisactive from '../assets/like-icon-big.png';
import likeIconActive from '../assets/like-icon-active.png';

export default defineComponent({
  props: ['photo'],
  setup() {
    const store = useStore();
    const isLike = ref(false);
    const likeIcon = ref(likeIconDisactive);

    watch(isLike, (value) => {
      if (value) {
        likeIcon.value = likeIconActive;
      } else {
        likeIcon.value = likeIconDisactive;
      }
    });

    const toggleLike = (photo) => {
      let favouritesPhotos = JSON.parse(localStorage.getItem('favourites')) || [];
      if (favouritesPhotos && favouritesPhotos.find((item) => item.photo === photo.photo)) {
        favouritesPhotos = favouritesPhotos.filter((item) => item.photo !== photo.photo);
        store.commit('setFavourites', favouritesPhotos);
        isLike.value = false;
      } else {
        favouritesPhotos.push(photo);
        isLike.value = true;
      }
      localStorage.setItem('favourites', JSON.stringify(favouritesPhotos));
    };

    return {
      likeIcon,
      toggleLike,
    };
  },
});
</script>
