<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SvgIcon from '../../../node_modules/@jamescoyle/vue-icon/lib/svg-icon.vue'
import { mdiClipboardSearchOutline, mdiCog } from '../../../node_modules/@mdi/js'

const router = useRouter()
const route = useRoute()

const active = ref(0)
const items = ref([
  {
    label: 'Informasi Pribadi',
    icon: mdiClipboardSearchOutline,
    route: '/'
  },
  {
    label: 'Pengaturan Akun',
    icon: mdiCog,
    route: '/settings'
  }
])

onMounted(() => {
  active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path)
})

watch(
  route,
  () => {
    active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <TabMenu
      v-model:activeIndex="active"
      :model="items"
      :pt="{
        root: 'overflow-x-auto',
        menu: {
          class: [
            'flex m-0 p-0 list-none flex-nowrap',
            'bg-white border-solid border-gray-300 border-b',
            'outline-none no-underline text-base list-none'
          ]
        },
        menuitem: 'mr-0',
        action: ({ context, state }) => ({
          class: [
            'cursor-pointer select-none flex items-center relative no-underline overflow-hidden',
            'border-b-4 p-5 font-bold rounded-t-lg ',
            {
              'border-gray-300 bg-white text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-600 dark:bg-gray-900 dark:border-orange-900/40 dark:text-white/80 dark:hover:bg-gray-800/80':
                state.d_activeIndex !== context.index, // Condition-based hover styles.
              'bg-white border-orange-400 text-orange-400 dark:bg-gray-900 dark:border-orange-200 dark:text-orange-200':
                state.d_activeIndex === context.index // Condition-based active styles.
            }
          ],
          style: 'top:2px'
        }),
        icon: 'mr-2'
      }"
    >
      <template #item="{ label, item, props }">
        <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
          <a
            :href="routerProps.href"
            v-bind="props.action"
            @click="($event) => routerProps.navigate($event)"
            @keydown.enter.space="($event) => routerProps.navigate($event)"
            :class="{ active: active === item.index }"
          >
            <SvgIcon class="mr-2" type="mdi" :path="item.icon"></SvgIcon>
            <span v-bind="props.label" class="sm:text-sm md:text-sm">{{ label }}</span>
          </a>
        </router-link>
      </template>
    </TabMenu>
    <div class="">
      <router-view />
    </div>
  </div>
</template>
