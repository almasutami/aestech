<script setup lang="ts">
import { useRouter } from 'vue-router'
import aestech from '../../public/aestech.jpg'
import SvgIcon from '../../node_modules/@jamescoyle/vue-icon/lib/svg-icon.vue'
import {
  mdiChartLine,
  mdiViewDashboard,
  mdiStethoscope,
  mdiApps,
  mdiNewspaperVariantMultipleOutline,
  mdiClipboardTextClock,
  mdiReceiptText,
  mdiAccountGroup,
  mdiPackageVariantClosed,
  mdiCartArrowDown,
  mdiSale
} from '../../node_modules/@mdi/js'

const router = useRouter()

interface SideBarMenu {
  label: string
  icon: string
  to: string
  subMenu?: SideBarMenu[]
}

const sideBarMenu = [
  {
    label: 'Dashboard',
    icon: mdiViewDashboard,
    to: '/'
  },
  {
    label: 'Penjualan',
    icon: mdiChartLine,
    to: '/'
  },
  {
    label: 'Pelayanan',
    icon: mdiStethoscope,
    to: '/'
  },
  {
    label: 'Rekam Medis',
    icon: mdiNewspaperVariantMultipleOutline,
    to: '/'
  },
  {
    label: 'Promo',
    icon: mdiSale,
    to: '/'
  },
  {
    label: 'Pembelian',
    icon: mdiCartArrowDown,
    to: '/'
  },
  {
    label: 'Penyimpanan',
    icon: mdiPackageVariantClosed,
    to: '/'
  },
  {
    label: 'Kepegawaian',
    icon: mdiAccountGroup,
    to: '/'
  },
  {
    label: 'Tagihan',
    icon: mdiReceiptText,
    to: '/'
  },
  {
    label: 'Reservasi',
    icon: mdiClipboardTextClock,
    to: '/'
  },
  {
    label: 'Aplikasi & Bisnis',
    icon: mdiApps,
    to: '/'
  }
] as SideBarMenu[]

const navigate = (to: string) => {
  router.push(to)
}
</script>

<template>
  <div>
    <div class="flex justify-center items-center">
      <img
        :src="aestech"
        alt="Aestech Logo"
        class="h-[50px] lg:h-[3rem] 2xl:h-[5rem] xl:h-[5rem] mt-2"
      />
    </div>

    <div class="my-2 py-4 px-4 sm:px-2 md:px-2 lg:px-2 xl:px-2">
      <div
        v-for="(menu, i) in sideBarMenu"
        :key="i"
        class="text-lg lg:text-base md:text-sm sm:text-xs my-5"
      >
        <div class="grid grid-cols-12 items-center" @click="navigate(menu.to)">
          <div class="col-start-1 col-span-1 lg:col-start-2 xl:col-start-2 2xl:col-start-2">
            <SvgIcon type="mdi" :path="menu.icon"></SvgIcon>
          </div>
          <div
            class="wrap col-start-3 col-span-8 lg:col-start-4 lg:col-span-7 xl:col-start-4 xl:col-span-6 2xl:col-start-4 2xl:col-span-6"
          >
            {{ menu.label }}
          </div>
          <div class="col-start-12 col-span-1">
            <Button icon="pi pi-angle-right" class="bg-inherit border-none" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
