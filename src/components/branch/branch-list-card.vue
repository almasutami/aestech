<script setup lang="ts">
import type { Branch } from '@/stores/branch'
import SvgIcon from '../../../node_modules/@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiHospitalBuilding } from '../../../node_modules/@mdi/js'

const props = defineProps({
  branch: { type: Object as () => Branch | null, required: true, default: () => null },
  loading: { type: Boolean, required: true, default: () => true }
})
</script>

<template>
  <div
    class="bg-white shadow-lg p-5 border border-gray-100 rounded-md w-full flex flex-row gap-2 items-center justify-between h-[120px]"
  >
    <SvgIcon
      type="mdi"
      :path="mdiHospitalBuilding"
      size="48"
      class="bg-orange-100 text-orange-500 p-2 rounded-md"
    ></SvgIcon>
    <div>
      <div v-if="!props.loading" class="font-semibold">
        <h5>Klinik {{ props.branch?.name }}</h5>
      </div>
      <div v-if="!props.loading">{{ props.branch?.email }}</div>
      <div v-if="props.loading" class="my-2">
        <Skeleton class="h-[24px] w-[15rem] md:w-[20rem] 2xl:w-[15rem]" />
      </div>
      <div v-if="props.loading" class="my-2">
        <Skeleton class="h-[24px] w-[15rem] md:w-[20rem] 2xl:w-[15rem]" />
      </div>
    </div>
    <Button
      v-if="!props.loading"
      icon="pi pi-chevron-right"
      class="bg-inherit text-inherit"
    ></Button>
  </div>
</template>
