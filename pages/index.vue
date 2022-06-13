<template>
    <NuxtLayout>
    <Head>
      <Title>Ne manquez plus une occasion de faire plaisir ! - {{ SITE_NAME }}</Title>
      <Meta name="description" content="qsdqsd" />
    </Head>
    <div class="bg-white">
    <div class="relative overflow-hidden">
      <main>
        <div class="pt-10 bg-gray-50 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div class="mx-auto max-w-5xl lg:px-8">
            <div class="lg:grid grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center lg:col-span-2">
                <div class="lg:py-24">
                  <h1 class="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl mb-10">
                    <span class="">Ne manquez plus une occasion </span>
                    <span class="pb-3  bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-pink-400 sm:pb-5">de faire plaisir !</span>
                  </h1>
                  <p class="text-base text-gray-800 sm:text-xl lg:text-lg xl:text-xl mb-10">
                    Gardez en favoris des idées de cadeaux, ou des petites plaisir personnels à acheter plus tard !
                  </p>
                  <p class="text-base text-gray-800 sm:text-xl lg:text-lg xl:text-xl">
                    Vous n'avez même pas besoin de vous inscrire !
                  </p>
                  <div class="mt-10 sm:mt-12">
                    
                  </div>
                </div>
              </div>
              <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="/home.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  </NuxtLayout>
</template>


<script setup>
import { defineComponent, h } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
} from '@heroicons/vue/outline/index.js'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/vue/solid/index.js'

const { SITE_NAME } = useRuntimeConfig()
</script>