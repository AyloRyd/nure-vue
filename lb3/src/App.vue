<script setup lang="ts">
import AppNav from './components/AppNav.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-950 px-4 py-8 text-slate-100">
    <div class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6">
      <AppNav />

      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>
