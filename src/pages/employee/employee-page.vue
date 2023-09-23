<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardLayout from '@/components/container-layout.vue'
import ProfileCard from '@/components/employee/profile-card.vue'
import EmployeeTabMenu from '@/components/employee/tab-menu.vue'
import { employeeStore } from '@/stores/employee'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const { selectedEmployee } = storeToRefs(employeeStore())

const onFocus = () => {
  return 'focus:border-orange-500 focus:shadow-sm'
}

const loading = ref(false)

onMounted(async () => {
  loading.value = true
  //employee id, should be dynamic later on
  const employeeId = 'KRYWN-202310-0018'
  //if same with store, dont refetch/ if different, refetch
  if (selectedEmployee.value?.id !== employeeId) {
    const response = await employeeStore().fetchThisEmployee(employeeId)
    if (response?.error) {
      toast.add({
        severity: 'error',
        summary: 'Gagal mememuat data karyawan',
        life: 3000
      })
    }
  }
  loading.value = false
})

// responsive styles
const containerFlexRowStyle = 'grid grid-cols-6 items-center'
const containerTwoRowsSyle = 'grid grid-cols-1 items-center'
const containerStyle = computed(() => {
  return windowWidth.value > 375 ? containerFlexRowStyle : containerTwoRowsSyle
})

const titleFlexRowStyle = 'col-start-1 col-span-2 font-semibold'
const titleTwoRowsSyle = 'col-span-1 font-semibold mb-1'
const titleStyle = computed(() => {
  return windowWidth.value > 375 ? titleFlexRowStyle : titleTwoRowsSyle
})

const dataFlexRowStyle = 'col-start-3 col-span-4'
const dataTwoRowsSyle = 'col-span-1 mb-2'
const dataStyle = computed(() => {
  return windowWidth.value > 375 ? dataFlexRowStyle : dataTwoRowsSyle
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
        <div class="row-span-3 bg-white p-5 sm:p-3 border border-gray-100 shadow-md rounded-md">
          <div>
            <div class="w-full flex flex-col gap-3 py-3 px-4">
              <div :class="containerStyle">
                <div :class="titleStyle">ID Pegawai</div>
                <div v-if="!loading" :class="dataStyle">{{ selectedEmployee?.id }}</div>
                <div v-if="loading" :class="dataStyle"><Skeleton /></div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">Nama Pegawai</div>
                <div v-if="!loading" :class="dataStyle">
                  {{ selectedEmployee?.fullname }}
                </div>
                <div v-if="loading" :class="dataStyle"><Skeleton /></div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">Jenis Kelamin</div>
                <div v-if="!loading" :class="dataStyle">
                  {{
                    selectedEmployee?.gender === 'L'
                      ? 'Laki-Laki'
                      : selectedEmployee?.gender === 'P'
                      ? 'Perempuan'
                      : ''
                  }}
                </div>
                <div v-if="loading" :class="dataStyle"><Skeleton /></div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">Tanggal Lahir</div>
                <div v-if="!loading" :class="dataStyle">
                  {{ selectedEmployee?.date_of_birth }}
                </div>
                <div v-if="loading" :class="dataStyle"><Skeleton /></div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">Posisi</div>
                <div v-if="!loading" :class="dataStyle">
                  {{ selectedEmployee?.position }}
                </div>
                <div v-if="loading" :class="dataStyle"><Skeleton /></div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">Klinik Cabang</div>
                <div v-if="!loading" :class="dataStyle">
                  Klinik Cabang {{ selectedEmployee?.branch?.name }}
                </div>
                <div v-if="loading" :class="dataStyle"><Skeleton /></div>
              </div>
            </div>
          </div>
        </div>

        <div class="row-span-3 bg-white p-5 sm:p-3 border border-gray-100 shadow-md rounded-md">
          <div>
            <div class="w-full flex flex-col gap-3 py-3 px-4">
              <div :class="containerStyle">
                <div :class="titleStyle">No. Telepon</div>
                <div v-if="!loading" :class="dataStyle">
                  <InputText
                    :class="onFocus()"
                    class="w-full border-gray-400 rounded-md"
                    placeholder="08239848xxxx"
                  ></InputText>
                </div>

                <div v-if="loading" :class="dataStyle">
                  <Skeleton class="h-[40px]" />
                </div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">E-mail</div>
                <div v-if="!loading" :class="dataStyle">
                  <InputText
                    :class="onFocus()"
                    class="w-full border-gray-400 rounded-md"
                    placeholder="axx2092@gmail.com"
                  ></InputText>
                </div>
                <div v-if="loading" :class="dataStyle">
                  <Skeleton class="h-[40px]" />
                </div>
              </div>
              <div :class="containerStyle">
                <div :class="titleStyle">Alamat</div>
                <div v-if="!loading" :class="dataStyle">
                  <Textarea
                    :class="onFocus()"
                    placeholder="Jl. ABC no.1, Kelurahan xxx, Kecamatan xxx, Kota Bandung"
                    class="border border-gray-400 rounded-md w-full p-[10px] outline-none"
                  ></Textarea>
                </div>
                <div v-if="loading" :class="dataStyle">
                  <Skeleton class="h-[60px]" />
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
