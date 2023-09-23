<script setup lang="ts">
import TopToolbar from '@/components/top-toolbar.vue'
import NavigationSidebar from '@/components/navigation-sidebar.vue'
</script>

<template>
  <div class="grid grid-cols-9 h-full bg-white text-slate-800 text-sm">
    <div class="col-span-2 md:hidden sm:hidden h-full bg-[#053D41] text-white p-4">
      <NavigationSidebar />
    </div>
    <div class="col-span-7 md:col-span-9 sm:col-span-9">
      <TopToolbar />
      <Toast position="top-right" class="text-sm p-toast-sm max-w-fit" />

      <router-view />
    </div>
  </div>
</template>
