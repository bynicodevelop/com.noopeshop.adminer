<template>
  <NuxtLayout name="adminer">
    <form
      @submit.prevent="onUpdated"
      class="space-y-8 divide-y divide-gray-200"
    >
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div class="grid grid-cols-2">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Création d'un produit
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                Vous pouvez créer un produit en remplissant le formulaire
                ci-dessous.
              </p>
            </div>
            <div class="flex justify-end">
              <SwitchGroup as="div" class="flex items-center justify-between">
                <span class="flex-grow flex flex-col">
                  <SwitchLabel
                    as="span"
                    class="text-sm font-medium text-gray-900"
                    passive
                  >
                    Status
                  </SwitchLabel>
                  <SwitchDescription as="span" class="text-sm text-gray-500">
                    {{ status ? "Publié" : "Non publié" }}
                  </SwitchDescription>
                </span>
                <Switch
                  v-model="status"
                  :class="[
                    status ? 'bg-indigo-600' : 'bg-gray-200',
                    'ml-3 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      status ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    ]"
                  />
                </Switch>
              </SwitchGroup>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label
                for="street-address"
                class="block text-sm font-medium text-gray-700"
              >
                Titre
              </label>
              <div class="mt-1">
                <input
                  v-model="title"
                  type="text"
                  name="title"
                  id="title"
                  class="
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  v-model="body"
                  id="description"
                  name="description"
                  rows="3"
                  class="
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    sm:text-sm
                    border border-gray-300
                    rounded-md
                  "
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="product"
                class="block text-sm font-medium text-gray-700"
              >
                Selectionner un produit
              </label>
              <div class="mt-1">
                <select
                  v-model="productId"
                  id="product"
                  name="product"
                  autocomplete="country-name"
                  class="
                    shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    sm:text-sm
                    border border-gray-300
                    rounded-md
                  "
                >
                  <option
                    v-for="product in products"
                    :key="product.id"
                    :value="product.id"
                  >
                    {{ product.title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="
              ml-3
              inline-flex
              justify-center
              py-2
              px-4
              border border-transparent
              shadow-sm
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Envoyer
          </button>
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>

<script setup>
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";

const enabled = ref(false);

const {
  title,
  body,
  productId,
  status,
  products,
  onGetNotification,
  onLoadProducts,
  onUpdated,
} = useNotifications();

await onGetNotification();
await onLoadProducts();
</script>