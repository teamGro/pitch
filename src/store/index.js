import axios from 'axios';
import { createStore } from 'vuex';

const breedNameInURL = 4;

function normalizeBreedPhotos(response) {
  return response.data.message.map((item) => ({
    photo: item,
    breed: item.split('/')[breedNameInURL],
    isLike: false,
  }));
}

export default createStore({
  state: {
    breeds: {},
    filterBreeds: [],
    photos: [],
    favourites: null,
  },
  getters: {
    getBreedsTitle(state) {
      const result = {};
      const keys = Object.keys(state.breeds);
      let currentLetter = 'a';

      keys.forEach((item) => {
        if (item.startsWith(currentLetter)) {
          if (result[currentLetter]) {
            result[currentLetter].push(item);
          } else {
            result[currentLetter] = [];
            result[currentLetter].push(item);
          }
        } else {
          currentLetter = item.slice(0, 1);
          result[currentLetter] = [];
          result[currentLetter].push(item);
        }
      });

      return result;
    },
    getMainPhoto(state) {
      return state.photos[0] || {};
    },
    getPhotos(state) {
      return state.photos.slice(1);
    },
    getFavouritesPhoto(state) {
      return (state.favourites) ? state.favourites.filter((photo) => photo.isLike === true) : [];
    },
  },
  mutations: {
    setBreeds(state, breeds) {
      state.breeds = breeds;
    },
    addBreedToFilter(state, breed) {
      if (!state.filterBreeds.find(((item) => item === breed))) {
        state.filterBreeds.push(breed);
      }
    },
    clearFilters(state) {
      if (state.filterBreeds.length) {
        state.filterBreeds = [];
        state.photos = [];
      }
    },
    deleteBreedFromFilter(state, itemNumber) {
      state.filterBreeds = state.filterBreeds.filter((item) => (
        item !== state.filterBreeds[itemNumber]
      ));
    },
    setPhotosBreeds(state, photos) {
      if (state.photos.length) {
        state.photos = state.photos.concat(photos);
      } else {
        state.photos = photos;
      }
    },
    updatePhotosBreeds(state, { photos, isUpdate }) {
      if (isUpdate) {
        state.photos = state.photos.concat(photos);
      } else {
        state.photos = photos;
      }
    },
    clearPhotosBreeds(state) {
      state.photos = [];
    },
    setFavourites(state, favourites) {
      state.favourites = favourites;
    },
    updateFavouritesPhoto(state, photo) {
      if (state.photos.find((item) => item.photo === photo.photo)) {
        state.photos.find((item) => item.photo === photo.photo).isLike = photo.isLike;
      }

      if (state.favourites?.length && state.favourites.find((item) => item.photo === photo.photo)) {
        state.favourites.find((item) => item.photo === photo.photo).isLike = photo.isLike;
      }
    },
  },
  actions: {
    async getAllBreeds({ commit }) {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        commit('setBreeds', response.data.message);
      } catch (err) {
        alert('При загрузке данных произошда ошибка, попробуйте ещё раз');
      }
    },
    async getPhotos({ commit }, repeatQuantity) {
      try {
        const response = await axios.get(`https://dog.ceo/api/breeds/image/random/${repeatQuantity}`);
        const photos = normalizeBreedPhotos(response);

        commit('setPhotosBreeds', photos);
      } catch (err) {
        alert('При загрузке данных произошда ошибка, попробуйте ещё раз');
      }
    },
    async getBreed({ commit }, { breed, quantity, isUpdate }) {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/${quantity}`);
        const photos = normalizeBreedPhotos(response);

        commit('updatePhotosBreeds', { photos, isUpdate });
      } catch (err) {
        alert('Фото такой породы не найдены!');
      }
    },
  },
});
