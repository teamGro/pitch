<template>
  <div class="container not-found">
    <h1 class="not-found__title">Страница не нйдена</h1>
    <router-link
      class="not-found__link"
      :to="{ name: 'Main' }"
    >На главную</router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

  },
});
</script>

<style lang="less">
.not-found {
  &__title,
  &__link {
    color: #fff;
  }
}
</style>
