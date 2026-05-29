<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import ToastHost from './components/ToastHost.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-950 px-4 py-8 text-slate-100">
    <div class="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6">
      <AppNav />

      <RouterView v-slot="{ Component, route }">
        <div class="flex min-h-0 flex-1 flex-col">
          <Transition name="page" mode="out-in">
            <KeepAlive include="EventListView">
              <component :is="Component" :key="route.name" />
            </KeepAlive>
          </Transition>
        </div>
      </RouterView>
    </div>

    <ToastHost />
  </div>
</template>
