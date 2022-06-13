<template>
  <NuxtLayout name="adminer">
    <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Produits</h1>
        <p class="mt-2 text-sm text-gray-700">Liste des produits.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <NuxtLink :to="{
            name: 'adminer-products-create'
        }" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Ajouter</NuxtLink>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table v-if="products.length > 0" class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="product in products" :key="product.email">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ product.title }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ product.description.substr(0, 50) }}…</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <NuxtLink :to="{
                      name: 'adminer-products-update-id',
                      params: {
                        id: product.id
                      }
                    }" class="text-indigo-600 hover:text-indigo-900 pr-5"
                      >Edit</NuxtLink
                    >

                    <button @click.prevent="onDelete(product)" type="button" class="text-red-600 hover:text-red-900"
                      >Delete</button
                    >
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-else>
              <div class="text-center">
                <p class="text-gray-500 py-10">Aucun produit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup>
const { products, onLoadAll, onDelete } = useProducts();

await onLoadAll();
</script>