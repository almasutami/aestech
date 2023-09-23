<script setup lang="ts">
import type { Employee } from '@/stores/employee'

const props = defineProps({
  selectedEmployee: { type: Object as () => Employee | null, required: true, default: () => null },
  loading: { type: Boolean, required: true, default: () => true }
})

const shortenName = (fullname: string) => {
  const splittedName = fullname?.split(' ')
  let name = `${splittedName[0]}`
  for (let i = 1; i < splittedName.length - 1; i++) {
    name += ` ${splittedName[i][0]}.`
  }
  name += ` ${splittedName[splittedName.length - 1]}`
  return name
}
</script>

<template>
  <Card class="rounded-lg bg-white shadow-lg p-4 border border-gray-100">
    <template #header>
      <div v-if="!loading" class="p-4 mt-5 justify-center flex">
        <img
          alt="user header"
          :src="props.selectedEmployee?.avatar"
          class="h-[200px] w-[200px] rounded-md"
          style="object-fit: cover"
        />
      </div>
      <div v-if="loading" class="p-4 mt-5 justify-center flex">
        <Skeleton class="h-[200px] w-[200px] rounded-md" />
      </div>
    </template>
    <template #title>
      <div v-if="!loading" class="flex justify-center mt-3 mb-1 font-semibold">
        <h4>
          {{
            selectedEmployee?.fullname && selectedEmployee?.fullname?.length < 3
              ? selectedEmployee?.fullname
              : shortenName(selectedEmployee?.fullname || '')
          }}
        </h4>
      </div>
      <div v-if="loading" class="flex justify-center mt-3 mb-1 font-semibold h-full">
        <Skeleton class="h-[32px] w-[100px]" />
      </div>
    </template>
    <template #subtitle>
      <div v-if="!loading" class="flex justify-center mb-5">
        <h5>{{ selectedEmployee?.position }}</h5>
      </div>
      <div v-if="loading" class="flex justify-center mb-5 h-full">
        <Skeleton class="h-[24px] w-[80px]" /></div
    ></template>
    <template #content>
      <div v-if="!loading" class="flex flex-row gap-5 text-slate-600 justify-center mb-5">
        <a :href="selectedEmployee?.social_media?.[0]?.instagram" target="_blank" rel="noreferrer">
          <i class="pi pi-instagram" style="font-size: 24px" />
        </a>
        <a :href="selectedEmployee?.social_media?.[0]?.twitter" target="_blank" rel="noreferrer">
          <i class="pi pi-twitter" style="font-size: 24px" />
        </a>
        <a :href="selectedEmployee?.social_media?.[0]?.facebook" target="_blank" rel="noreferrer">
          <i class="pi pi-facebook" style="font-size: 24px" />
        </a>
      </div>
      <div v-if="loading" class="flex flex-row gap-5 text-slate-600 justify-center mb-5 h-full">
        <Skeleton class="h-[24px] w-[24px]" shape="circle" />
        <Skeleton class="h-[24px] w-[24px]" shape="circle" />
        <Skeleton class="h-[24px] w-[24px]" shape="circle" />
      </div>
    </template>
    <template #footer
      ><div v-if="!loading" class="flex flex-col items-center mt-5 py-5">
        <h5 class="font-semibold">Klinik Cabang {{ selectedEmployee?.branch?.name }}</h5>
        <p>{{ selectedEmployee?.branch?.address }}</p>
      </div>
      <div v-if="loading" class="flex flex-col gap-2 items-center mt-5 py-5 h-full">
        <Skeleton class="h-[24px] w-[100px]" /><Skeleton class="h-[24px] w-[80px]" /></div
    ></template>
  </Card>
</template>
