<template>
  <main
    class="container main"
    @scroll="getNewPhotos"
  >
    <div class="main__controls controls">
      <div class="controls__wrapper">
        <div class="controls__breeds-selected-wrapper">
          <button
            class="btn controls__breed"
            :class="{'controls__breed_active': isBreedsFilter}"
            @click="toggleBreedsFilter"
          >
            <span>Породы</span>
            <span class="arrow controls__arrow"></span>
          </button>
          <p
            class="breeds__item breeds__item_selected"
            v-for="item, i in filtersList"
            :key="i"
          >
            <span>{{ item }}</span>
            <button
              class="controls__delete-btn"
              @click="deleteFiltersBreed(i)"
            >X</button>
          </p>
        </div>
        <button
          class="btn controls__sorting"
          :class="{'controls__sorting_active': isSorting}"
          @click="toggleSorting"
        >
          <span class="controls__sorting-title">Сортировка по алфавиту</span>
          <span class="controls__sorting-switch"></span>
        </button>
      </div>
    </div>

    <breeds-list :isOpen="isBreedsFilter"></breeds-list>

    <div class="photos">
      <photos-list></photos-list>
    </div>

    <preloader v-if="isDownloading"></preloader>

    <button
      v-if="isToTopArrow"
      class="arrowTop"
      @click="goToTop"
    >UP</button>

  </main>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import BreedsList from '@/components/BreedsList.vue';
import PhotosList from '@/components/PhotosList.vue';
import Preloader from '@/components/Preloader.vue';

export default defineComponent({
  components: { BreedsList, PhotosList, Preloader },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isSorting = ref(false);
    const isBreedsFilter = ref(false);
    const isToTopArrow = ref(false);

    const isDownloading = ref(false);

    const toggleBreedsFilter = () => {
      isBreedsFilter.value = !isBreedsFilter.value;
    };

    const deleteFiltersBreed = (itemNum) => {
      const breeds = route.query.breed
        .split('&')
        .filter((item) => item !== store.state.filterBreeds[itemNum])
        .join('&');
      if (breeds.length) {
        router.replace({ name: 'Main', query: { breed: breeds } });
      } else {
        router.replace({ name: 'Main', query: '' });
      }
      store.commit('deleteBreedFromFilter', itemNum);
    };

    const toggleSorting = () => {
      isSorting.value = !isSorting.value;
    };

    const winHeight = document.body.clientHeight;
    const filtersList = computed(() => store.state.filterBreeds);

    const getNewPhotos = () => {
      if (filtersList.value.length) return;
      if (winHeight + window.pageYOffset >= document.body.offsetHeight) {
        isDownloading.value = true;
        window.removeEventListener('scroll', getNewPhotos);
        store.dispatch('getNewPhotos', 12).then(() => {
          window.addEventListener('scroll', getNewPhotos);
          isDownloading.value = false;
        });
      }
    };

    const renderToTopArrow = () => {
      if (window.pageYOffset !== 0) {
        isToTopArrow.value = true;
      }
    };

    const goToTop = () => {
      window.scrollTo(0, 0);
      isToTopArrow.value = false;
    };

    window.addEventListener('scroll', getNewPhotos);
    window.addEventListener('scroll', renderToTopArrow);

    return {
      isSorting,
      isBreedsFilter,
      breeds: computed(() => store.getters.getBreedsTitle),
      filtersList,
      isDownloading,
      isToTopArrow,

      deleteFiltersBreed,
      toggleBreedsFilter,
      toggleSorting,
      getNewPhotos,
      goToTop,
    };
  },
});
</script>

<style lang="less">
.arrowTop {
  position: fixed;
  bottom: 50px;
  right: 50px;

  width: 100px;
  height: 50px;
  background-color: #fff;
}
</style>
