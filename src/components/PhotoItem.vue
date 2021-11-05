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
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import likeIconDisactive from '../assets/like-icon-big.png';
import likeIconActive from '../assets/like-icon-active.png';

export default defineComponent({
  props: ['photo'],
  setup() {
    const route = useRoute();
    const store = useStore();
    const isLike = ref(false);
    const likeIcon = ref(likeIconDisactive);

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
