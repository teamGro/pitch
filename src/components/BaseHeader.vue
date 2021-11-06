<template>
  <header class="header">
    <div class="header__wrapper container">
      <a
        class="header__logo"
        @click.prevent="goTo('Main')"
      >Пёсель</a>
      <a
        class="header__selected-wrapper"
        @click.prevent="goTo('Favourites')"
      >
        <span class="header__selected">Избранные пёсели</span>
        <img
          class="header__selected-icon"
          :src="likeIconSmall"
        />
      </a>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import likeIconSmall from '../assets/like-icon-small.png';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goTo = (pageName) => {
      if (pageName === route.name) return;
      router.push({ name: pageName });
    };

    return {
      likeIconSmall,
      goTo,
    };
  },
});
</script>
