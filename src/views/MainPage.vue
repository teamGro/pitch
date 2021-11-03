<template>
  <main class="container main">
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

  </main>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import BreedsList from '@/components/BreedsList.vue';

export default defineComponent({
  components: { BreedsList },
  setup() {
    const store = useStore();
    const isSorting = ref(false);
    const isBreedsFilter = ref(false);

    const toggleBreedsFilter = () => {
      isBreedsFilter.value = !isBreedsFilter.value;
    };

    const deleteFiltersBreed = (itemNum) => store.commit('deleteBreedFromFilter', itemNum);

    const toggleSorting = () => {
      isSorting.value = !isSorting.value;
    };

    return {
      isSorting,
      isBreedsFilter,
      breeds: computed(() => store.getters.getBreedsTitle),
      filtersList: computed(() => store.state.filterBreeds),

      deleteFiltersBreed,
      toggleBreedsFilter,
      toggleSorting,
    };
  },
});
</script>
