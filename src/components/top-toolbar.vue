<script setup lang="ts">
import { ref } from 'vue'
import NavigationSidebar from '@/components/navigation-sidebar.vue'
import SvgIcon from '../../node_modules/@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiHospitalBuilding, mdiBell, mdiHelpCircle } from '../../node_modules/@mdi/js'

const selectedBranch = ref({ label: 'Bandung', value: '5' })

interface Option {
  label: string
  value: string
}

const branchesOptions = [
  { label: 'Jakarta', value: '1' },
  { label: 'Palembang', value: '2' },
  { label: 'Samarinda', value: '3' },
  { label: 'Padang', value: '4' },
  { label: 'Bandung', value: '5' }
] as Option[]

const visible = ref(false)
const toggleSidebar = () => {
  visible.value = !visible.value
}

const menu = ref()
const items = ref([
  {
    items: [
      {
        label: 'Pembayaran berhasil!',
        description: 'Lorem ipsum dolor sit amet.',
        date: '20 Sep',
        icon: mdiBell
      },
      {
        label: 'Aktivasi akun berhasil!',
        description: 'Lorem ipsum dolor sit amet.',
        date: '20 Sep',
        icon: mdiBell
      },
      {
        label: 'Akun anda akan kadaluarsa',
        description: 'Lorem ipsum dolor sit amet.',
        date: '20 Sep',
        icon: mdiBell
      }
    ]
  }
])

const toggle = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div
    class="shadow-md h-[80px] pt-4 px-5 pb-3 flex flex-row justify-between items-center text-base"
  >
    <div class="lg:hidden xl:hidden 2xl:hidden bg-inherit">
      <Sidebar v-model:visible="visible" class="w-[200px] h-full bg-[#053D41] text-white p-4">
        <NavigationSidebar />
      </Sidebar>
      <div>
        <Button
          icon="pi pi-align-justify"
          class="bg-inherit text-[#053D41]"
          @click="toggleSidebar()"
        />
      </div>
    </div>
    <div class="flex flex-row gap-2 items-center px-5 text-base font-semibold">
      <div class="sm:hidden md:hidden">
        <SvgIcon type="mdi" :path="mdiHospitalBuilding"></SvgIcon>
      </div>

      <Dropdown
        v-model="selectedBranch"
        :options="branchesOptions"
        option-label="label"
        placeholder="Pilih Cabang"
        class="w-full md:w-14rem bg-white p-4 text-base font-normal"
      >
        <template #header>
          <div class="mt-2 mb-4 font-semibold">Data Cabang</div>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div class="py-1">
              <router-link to="/">{{ `Cabang ${slotProps.option.label}` }}</router-link>
            </div>
          </div>
        </template>
        <template #value="slotProps">
          <div class="flex align-items-center font-semibold">
            <div class="py-1">{{ `Cabang ${slotProps.value.label}` }}</div>
          </div>
        </template>
        <template #footer>
          <div class="my-5">
            <Button class="px-3 py-1 !text-sm">
              <router-link to="/branches">Lihat semua cabang</router-link>
            </Button>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="flex flex-row gap-[20px] items-center">
      <div>
        <SvgIcon
          type="mdi"
          :path="mdiBell"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        ></SvgIcon>
        <Menu
          style="position: absolute; top: 80px; right: 10px; left: auto"
          ref="menu"
          id="overlay_menu"
          :model="items"
          :popup="true"
        >
          <template #start>
            <div>
              <div class="font-semibold border-b pb-4 px-5">Notifikasi</div>
            </div>
          </template>
          <template #item="{ item, label, props }">
            <div class="flex flex-row justify-between gap-5 w-full items-center">
              <div
                class="font-semibold p-2 bg-gray-200 text-gray-600 rounded-md sm:hidden md:hidden"
              >
                <SvgIcon type="mdi" :path="item.icon" size="24px"></SvgIcon>
              </div>
              <div
                class="font-semibold p-2 bg-gray-200 text-gray-600 rounded-md 2xl:hidden xl:hidden lg:hidden"
              >
                <SvgIcon type="mdi" :path="item.icon" size="18px"></SvgIcon>
              </div>
              <div
                class="flex-col flex items-start w-[280px] sm:w-[200px] md:w-[200px] sm:text-xs md:text-sm lg:text-sm"
              >
                <div class="font-semibold">{{ label }}</div>
                <div>{{ item?.description }}</div>
              </div>
              <div
                class="text-base sm:text-xs md:text-sm lg:text-sm w-[60px] sm:w-[50px] md:w-[50px]"
              >
                {{ item?.date }}
              </div>
            </div>
          </template>
        </Menu>
      </div>
      <div>
        <SvgIcon type="mdi" :path="mdiHelpCircle"></SvgIcon>
      </div>
      <div>
        <img
          alt="user header"
          :src="'https://i.ibb.co/hDMmmZD/foto-almas.jpg'"
          class="h-[48px] w-[48px] rounded-full"
          style="object-fit: cover"
        />
      </div>
      <div class="flex flex-col text-sm sm:hidden">
        <div class="font-semibold">Almas Utami</div>
        <div>Frontend Developer</div>
      </div>
    </div>
  </div>
</template>
