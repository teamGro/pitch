import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
  state: {
    breeds: {},
    filterBreeds: [],
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
  },
  actions: {
    async getAllBreeds({ commit }) {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all');
      commit('setBreeds', response.data.message);
    },
  },
});
