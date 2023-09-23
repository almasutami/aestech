<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardLayout from '@/components/container-layout.vue'
import ProfileCard from '@/components/employee/profile-card.vue'
import EmployeeTabMenu from '@/components/employee/tab-menu.vue'
import { employeeStore } from '@/stores/employee'
import { onMounted, ref } from 'vue'

const { selectedEmployee } = storeToRefs(employeeStore())
const onFocus = () => {
  return 'focus:border-orange-500 focus:shadow-sm'
}
const socMedLabel = () => {
  return 'rounded-l-md rounded-r-none bg-gray-100 border border-gray-400 col-span-2 col-start-1 px-2 sm:px-1 h-full items-center flex text-slate-800'
}
const socMedContainerLabel = () => {
  return 'col-start-2 col-span-5 grid grid-cols-6 lf:col-start-1 md:col-start-1 sm:col-start-1 md:col-span-6 lg:col-span-6 sm:col-span-6 items-center'
}

const twitterUrl = ref(selectedEmployee?.value?.social_media?.[0]?.twitter)
const facebookUrl = ref(selectedEmployee?.value?.social_media?.[0]?.facebook)
const instagramUrl = ref(selectedEmployee?.value?.social_media?.[0]?.instagram)

const loading = ref(false)
onMounted(async () => {
  loading.value = true
  //employee id, should be dynamic later on
  const employeeId = 'KRYWN-202310-0018'
  //if same with store, dont refetch/ if different, refetch
  if (selectedEmployee.value?.id !== employeeId) {
    await employeeStore().fetchThisEmployee(employeeId)
  }
  twitterUrl.value = selectedEmployee?.value?.social_media?.[0]?.twitter
  facebookUrl.value = selectedEmployee?.value?.social_media?.[0]?.facebook
  instagramUrl.value = selectedEmployee?.value?.social_media?.[0]?.instagram
  loading.value = false
})
</script>

<template>
  <CardLayout>
    <template #title>Profil akun</template>
    <template #description>Lihat profil dan kelola data akun</template>
    <EmployeeTabMenu />
    <div
      class="grid grid-cols-12 gap-4 mt-5 mb-5 sm:flex sm:flex-col sm:gap-4 md:flex md:flex-col md:gap-4"
    >
      <div class="col-start-1 col-span-5 grid grid-rows-6 grid-flow-col gap-4">
        <ProfileCard :loading="loading" :selected-employee="selectedEmployee" class="row-span-6" />
      </div>
      <div
        class="col-start-6 col-span-7 grid grid-rows-6 grid-flow-col gap-4 sm:text-xs md:text-sm"
      >
        <div
          class="row-span-1 bg-white p-5 sm:p-3 border border-gray-100 shadow-md rounded-md flex flex-row justify-between items-center"
        >
          <div class="text-base font-semibold px-5">Ubah kode akses</div>
          <Button icon="pi pi-chevron-right" class="bg-inherit text-inherit" />
        </div>
        <div
          class="row-span-1 bg-white p-5 sm:p-3 border border-gray-100 shadow-md rounded-md flex flex-row justify-between items-center"
        >
          <div class="text-base font-semibold px-5">Ubah password</div>
          <Button icon="pi pi-chevron-right" class="bg-inherit text-inherit" />
        </div>
        <div class="row-span-4 bg-white p-5 sm:p-3 border border-gray-100 shadow-md rounded-md">
          <div class="h-full py-4">
            <div class="font-semibold px-4 text-base">Sosial Media</div>
            <div class="w-full flex flex-col gap-3 py-5 px-4">
              <div class="grid grid-cols-6 items-center">
                <div
                  class="col-start-1 col-span-1 lg:col-span-6 md:col-span-6 sm:col-span-6 font-semibold"
                >
                  Instagram
                </div>
                <div :class="socMedContainerLabel()">
                  <div :class="socMedLabel()">instagram.com/</div>
                  <InputText
                    v-if="!loading"
                    :class="onFocus()"
                    v-model="instagramUrl"
                    class="w-full border-gray-400 rounded-r-md rounded-l-none col-span-4 col-start-3"
                    placeholder="Username facebook"
                  ></InputText>
                  <div v-if="loading" :class="socMedContainerLabel()">
                    <Skeleton class="h-[40px]" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-6 items-center">
                <div
                  class="col-start-1 col-span-1 lg:col-span-6 md:col-span-6 sm:col-span-6 font-semibold"
                >
                  Twitter
                </div>
                <div :class="socMedContainerLabel()">
                  <div :class="socMedLabel()">twitter.com/</div>
                  <InputText
                    v-if="!loading"
                    v-model="twitterUrl"
                    :class="onFocus()"
                    class="w-full border-gray-400 rounded-r-md rounded-l-none col-span-4 col-start-3"
                    placeholder="Username twitter"
                  ></InputText>
                  <div v-if="loading" :class="socMedContainerLabel()">
                    <Skeleton class="h-[40px]" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-6 items-center">
                <div
                  class="col-start-1 col-span-1 lg:col-span-6 md:col-span-6 sm:col-span-6 font-semibold"
                >
                  Facebook
                </div>
                <div :class="socMedContainerLabel()">
                  <div :class="socMedLabel()">facebook.com/</div>
                  <InputText
                    v-if="!loading"
                    v-model="facebookUrl"
                    :class="onFocus()"
                    class="w-full border-gray-400 rounded-r-md rounded-l-none col-span-4 col-start-3"
                    placeholder="Username facebook"
                  ></InputText>
                  <div v-if="loading" :class="socMedContainerLabel()">
                    <Skeleton class="h-[40px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer
      ><div class="my-5 text-base flex flex-row justify-end"><Button>Simpan</Button></div></template
    >
  </CardLayout>
</template>
