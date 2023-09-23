<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardLayout from '@/components/container-layout.vue'
import ProfileCard from '@/components/employee/profile-card.vue'
import EmployeeTabMenu from '@/components/employee/tab-menu.vue'
import { employeeStore } from '@/stores/employee'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const { selectedEmployee } = storeToRefs(employeeStore())
const onFocus = () => {
  return 'focus:border-orange-500 focus:shadow-sm'
}

const socmedContainerStyle = computed(() => {
  return windowWidth.value > 375 ? 'grid grid-cols-6 items-center' : 'grid grid-cols-1 items-center'
})

const socMedTitleStyle = computed(() => {
  return windowWidth.value > 375
    ? 'col-start-1 col-span-1 lg:col-span-6 md:col-span-6 sm:col-span-6 font-semibold'
    : 'col-start-1 col-span-1 font-semibold'
})

const socMedContainerLabelStyle = computed(() => {
  return windowWidth.value > 375
    ? 'col-start-2 col-span-5 grid grid-cols-6 lg:col-start-1 md:col-start-1 sm:col-start-1 md:col-span-6 lg:col-span-6 sm:col-span-6 items-center'
    : 'grid grid-cols-12 col-start-1 col-span-1 items-center'
})

const socMedLabelStyle = computed(() => {
  return windowWidth.value > 375
    ? 'rounded-l-md rounded-r-none bg-gray-100 border border-gray-400 col-span-2 col-start-1 px-2 sm:px-1 h-full items-center flex text-slate-800'
    : 'rounded-l-md rounded-r-none bg-gray-100 border border-gray-400 px-1 h-full items-center flex text-slate-800 col-start-1 col-span-6'
})

const socMedInputStyle = computed(() => {
  return windowWidth.value > 375
    ? 'w-full border-gray-400 rounded-r-md rounded-l-none col-span-4 col-start-3' + onFocus()
    : 'w-full border-gray-400 rounded-r-md rounded-l-none col-span-6 col-start-7' + onFocus()
})

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

let windowWidth = ref(window.innerWidth)

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))
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
              <div :class="socmedContainerStyle">
                <div :class="socMedTitleStyle">Instagram</div>
                <div :class="socMedContainerLabelStyle">
                  <div :class="socMedLabelStyle">instagram.com/</div>
                  <InputText
                    v-if="!loading"
                    v-model="instagramUrl"
                    :class="socMedInputStyle"
                    placeholder="Username facebook"
                  ></InputText>
                  <div v-if="loading" :class="socMedContainerLabelStyle">
                    <Skeleton class="h-[40px]" />
                  </div>
                </div>
              </div>
              <div :class="socmedContainerStyle">
                <div :class="socMedTitleStyle">Twitter</div>
                <div :class="socMedContainerLabelStyle">
                  <div :class="socMedLabelStyle">twitter.com/</div>
                  <InputText
                    v-if="!loading"
                    v-model="twitterUrl"
                    :class="socMedInputStyle"
                    placeholder="Username twitter"
                  ></InputText>
                  <div v-if="loading" :class="socMedContainerLabelStyle">
                    <Skeleton class="h-[40px]" />
                  </div>
                </div>
              </div>
              <div :class="socmedContainerStyle">
                <div :class="socMedTitleStyle">Facebook</div>
                <div :class="socMedContainerLabelStyle">
                  <div :class="socMedLabelStyle">facebook.com/</div>
                  <InputText
                    v-if="!loading"
                    v-model="facebookUrl"
                    :class="socMedInputStyle"
                    placeholder="Username facebook"
                  ></InputText>
                  <div v-if="loading" :class="socMedContainerLabelStyle">
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
