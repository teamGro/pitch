import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import likeIconDisactive from '@/assets/like-icon-big.png';

export default function () {
  const isLike = ref(false);
  const likeIcon = ref(likeIconDisactive);
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const addToFilter = (breed) => {
    if (route.query.breed && route.query.breed.indexOf(breed) === -1) {
      router.replace({ name: 'Main', query: { breed: `${route.query.breed}&${breed}` } });
    } else if (!route.query.breed) {
      router.replace({ name: 'Main', query: { breed } });
    }
  };

  const toggleLike = (photo) => {
    let favouritesPhotos = JSON.parse(localStorage.getItem('favourites')) || [];
    if (favouritesPhotos && favouritesPhotos.find((item) => item.photo === photo.photo)) {
      favouritesPhotos = favouritesPhotos.filter((item) => item.photo !== photo.photo);
    } else {
      favouritesPhotos.push(photo);
    }
    store.commit('updateFavouritesPhoto', { ...photo, isLike: !photo.isLike });
    localStorage.setItem('favourites', JSON.stringify(favouritesPhotos));
  };

  return {
    isLike,
    likeIcon,
    addToFilter,
    toggleLike,
  };
}
