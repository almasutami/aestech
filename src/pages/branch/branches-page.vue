<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CardLayout from '@/components/container-layout.vue'
import { branchStore } from '@/stores/branch'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import BranchCard from '@/components/branch/branch-list-card.vue'
import type { PageState } from 'primevue/paginator'

const { branchesList, totalBranches } = storeToRefs(branchStore())

const loading = ref(false)
const toast = useToast()

onMounted(async () => {
  loadData()
})

const onFilterNameChange = async () => {
  currentPage.value = 0
  setTimeout(async () => {
    await loadData()
  }, 1000)
}

const onPage = (event: PageState) => {
  console.log(event)
  currentPage.value = event.page
  branchPerPage.value = event.rows
  loadData()
}

const loadData = async () => {
  loading.value = true
  const response = await branchStore().fetchBranchesList(
    filterName.value,
    currentPage.value * branchPerPage.value,
    branchPerPage.value * (currentPage.value + 1)
  )
  if (response?.error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal mememuat data cabang',
      life: 3000
    })
  }
  loading.value = false
}

const filterName = ref('')

//for pagination
const totalRecords = computed(() => {
  return totalBranches.value
})
const currentPage = ref(0)
const branchPerPage = ref(9)
</script>

<template>
  <CardLayout>
    <template #title>Daftar Cabang</template>
    <template #description
      >Pilih salah satu cabang untuk melihat aktivitas melalui sistem informasi</template
    >
    <!-- filter -->
    <div class="p-input-icon-left w-full items-center">
      <i class="pi pi-search z-10 left-4" />
      <InputText
        v-model="filterName"
        placeholder="Cari cabang"
        class="w-full pl-12"
        @keyup="onFilterNameChange"
      />
    </div>

    <div
      v-if="!loading && branchesList?.length !== 0"
      class="grid grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 md:w-full sm:w-full my-4"
    >
      <div v-for="(branch, i) in branchesList" :key="i" class="col-span-1 my-2">
        <BranchCard :branch="branch" :loading="loading" />
      </div>
    </div>
    <div
      v-else-if="!loading && branchesList?.length === 0"
      class="grid grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 md:w-full sm:w-full my-4"
    >
      Tidak ada data cabang.
    </div>
    <div
      v-if="loading"
      class="grid grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 md:w-full sm:w-full my-4"
    >
      <div v-for="index in branchPerPage" :key="index" class="col-span-1 my-2">
        <BranchCard :branch="null" :loading="loading" />
      </div>
    </div>
    <div class="my-5">
      <Paginator
        :rows="branchPerPage"
        :totalRecords="totalRecords"
        class="text-slate-700"
        @page="onPage($event)"
      ></Paginator>
    </div>
  </CardLayout>
</template>
