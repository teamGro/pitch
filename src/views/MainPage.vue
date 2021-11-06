<template>
  <base-header></base-header>
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
        <!-- <button
          class="btn controls__sorting"
          :class="{'controls__sorting_active': isSorting}"
          @click="toggleSorting"
        >
          <span class="controls__sorting-title">Сортировка по алфавиту</span>
          <span class="controls__sorting-switch"></span>
        </button> -->
      </div>
    </div>

    <breeds-list :isOpen="isBreedsFilter"></breeds-list>

    <div class="photos">
      <photos-list></photos-list>
    </div>

    <preloader v-if="isDownloading"></preloader>

    <up-btn :isVisible="isToTopBtnVisible"></up-btn>
  </main>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import BreedsList from '@/components/BreedsList.vue';
import PhotosList from '@/components/PhotosList.vue';
import Preloader from '@/components/Preloader.vue';
import UpBtn from '@/components/UpBtn.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import fixedNumbers from '@/helpers/constants';

export default defineComponent({
  components: {
    BaseHeader,
    BreedsList,
    PhotosList,
    Preloader,
    UpBtn,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const isSorting = ref(false);
    const isBreedsFilter = ref(false);
    const isToTopBtnVisible = ref(false);
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

    if (store.state.filterBreeds.length && !route.query.breed) {
      router.replace({ name: 'Main', query: { breed: store.state.filterBreeds.join('&') } });
    }

    const winHeight = document.body.clientHeight;
    const filtersList = computed(() => store.state.filterBreeds);

    const getNewPhotos = () => {
      if (filtersList.value.length) return;
      if (winHeight + window.pageYOffset >= document.body.offsetHeight) {
        isDownloading.value = true;
        window.removeEventListener('scroll', getNewPhotos);
        store.dispatch('getPhotos', fixedNumbers.restPhotosQty).then(() => {
          window.addEventListener('scroll', getNewPhotos);
          isDownloading.value = false;
        });
      }
    };

    const toggleToTopBtn = () => {
      if (window.pageYOffset > 220) {
        isToTopBtnVisible.value = true;
      } else {
        isToTopBtnVisible.value = false;
      }
    };

    window.addEventListener('scroll', getNewPhotos);
    window.addEventListener('scroll', toggleToTopBtn);

    return {
      isSorting,
      isBreedsFilter,
      breeds: computed(() => store.getters.getBreedsTitle),
      filtersList,
      isDownloading,
      isToTopBtnVisible,

      deleteFiltersBreed,
      toggleBreedsFilter,
      toggleSorting,
      getNewPhotos,
      toggleToTopBtn,
    };
  },
});
</script>
