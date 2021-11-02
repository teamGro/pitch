<template>
  <main class="container main">
    <div class="main__controls controls">
      <div class="controls__wrapper">
        <button
          class="btn controls__breed"
          :class="{'controls__breed_active': isBreedsFilter}"
          @click="toggleBreedsFilter"
        >
          <span>Породы</span>
          <span class="arrow controls__arrow"></span>
        </button>
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
    <div class="breeds">
      <ul class="breeds__selected-list">
        <li class="breeds__item">Все пёсели</li>
      </ul>

      <p>{{ breeds }}</p>

    </div>
  </main>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const isSorting = ref(false);
    const isBreedsFilter = ref(false);

    const toggleBreedsFilter = () => {
      isBreedsFilter.value = !isBreedsFilter.value;
    };

    const toggleSorting = () => {
      isSorting.value = !isSorting.value;
    };

    return {
      isSorting,
      isBreedsFilter,
      breeds: computed(() => store.getters.getBreedsTitle),

      toggleBreedsFilter,
      toggleSorting,
    };
  },
});
</script>
