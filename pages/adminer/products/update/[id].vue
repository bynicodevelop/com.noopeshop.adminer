<template>
  <NuxtLayout name="adminer">
    <form @submit.prevent="onUpdated" class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Création d'un produit
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Vous pouvez créer un produit en remplissant le formulaire
              ci-dessous.
            </p>
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
                  v-model="description"
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
              <p class="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label
                for="street-address"
                class="block text-sm font-medium text-gray-700"
              >
                Source url
              </label>
              <div class="mt-1">
                <input
                    v-model="urlSource"
                  type="text"
                  name="url-source"
                  id="url-source"
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

            <!-- <div class="sm:col-span-6">
              <label
                for="cover-photo"
                class="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <div
                class="
                  mt-1
                  flex
                  justify-center
                  px-6
                  pt-5
                  pb-6
                  border-2 border-gray-300 border-dashed
                  rounded-md
                "
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="medias"
                      class="
                        relative
                        cursor-pointer
                        bg-white
                        rounded-md
                        font-medium
                        text-indigo-600
                        hover:text-indigo-500
                        focus-within:outline-none
                        focus-within:ring-2
                        focus-within:ring-offset-2
                        focus-within:ring-indigo-500
                      "
                    >
                      <span>Upload a file</span>
                      <input
                        @change="onFileChange"
                        id="medias"
                        name="medias"
                        type="file"
                        class="sr-only"
                        multiple
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> -->
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
            Save
          </button>
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>

<script setup>
const { title, description, urlSource, media, onGetProduct, onUpdated } = useProducts();

await onGetProduct();
</script>