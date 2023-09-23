<script setup lang="ts"></script>

<template>
  <div
    class="xl:h-[800px] 2xl:h-[800px] lg:h-[800px] p-[1rem] md:p-[2rem] xl:p-[3rem] 2xl:p-[3rem] lg:p-[3rem]"
  >
    <div>
      <h1 class="font-bold sm:hidden"><slot name="title" /></h1>
      <h3 class="font-bold md:hidden lg:hidden xl:hidden 2xl:hidden"><slot name="title" /></h3>
    </div>
    <div>
      <h5 class="sm:hidden"><slot name="description" /></h5>
      <p class="md:hidden lg:hidden xl:hidden 2xl:hidden"><slot name="description" /></p>
    </div>
    <div class="xl:h-[600px] 2xl:h-[600px] lg:h-[620px] mt-5 mb-5">
      <slot />
    </div>
    <div>
      <slot name="footer" />
    </div>
  </div>
</template>
