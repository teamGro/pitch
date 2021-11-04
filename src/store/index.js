import axios from 'axios';
import { createStore } from 'vuex';

const breedFirstPart = 'https://images.dog.ceo/breeds/'.lastIndexOf('/') + 1;

export default createStore({
  state: {
    breeds: {},
    filterBreeds: [],
    photos: [],
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
  },
  actions: {
    async getAllBreeds({ commit }) {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      commit('setBreeds', response.data.message);
    },
    async getPhotos({ commit }, repeatQuantity) {
      const photos = [];
      for (let i = 0; i < repeatQuantity; i += 1) {
        /* eslint-disable no-await-in-loop */
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        const breedLastPart = response.data.message.lastIndexOf('/');
        photos.push(
          {
            photo: response.data.message,
            breed: response.data.message.slice(breedFirstPart, breedLastPart),
          },
        );
      }

      commit('setPhotosBreeds', photos);
    },
  },
});
