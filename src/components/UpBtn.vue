<template>
  <button
    class="btn up-btn"
    v-if="isVisible"
    @click="goToTop"
  >
    <img
      class="up-btn__icon"
      :src="upArrowIcon"
      alt="Наверх"
    >
    <span></span>
  </button>
</template>

<script>
import { defineComponent } from 'vue';
import upArrowIcon from '../assets/up-arrow-icon.svg';

export default defineComponent({
  props: ['isVisible'],
  setup() {
    const goToTop = () => {
      window.scrollTo(0, 0);
    };

    return {
      upArrowIcon,
      goToTop,
    };
  },
});
</script>
