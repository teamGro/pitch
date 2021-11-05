<template>
  <header class="header">
    <div class="header__wrapper container">
      <router-link
        class="header__logo"
        :to="{name: 'Main'}"
      >Пёсель</router-link>
      <router-link
        class="header__selected-wrapper"
        :to="{name: 'Favourites'}"
      >
        <span class="header__selected">Избранные пёсели</span>
        <img
          class="header__selected-icon"
          :src="likeIconSmall"
        />
      </router-link>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import likeIconSmall from '../assets/like-icon-small.png';

export default defineComponent({
  setup() {
    return {
      likeIconSmall,
    };
  },
});
</script>
