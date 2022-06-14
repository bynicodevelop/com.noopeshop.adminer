<template>
  <div class="relative shadow sm:rounded-md sm:overflow-hidden">
    <div class="ml-4 flex-shrink-0 flex absolute top-3 right-3">
      <button
        type="button"
        @click.prevent="props.close"
        class="
          bg-white
          rounded-md
          inline-flex
          text-gray-400
          hover:text-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        <span class="sr-only">Close</span>
        <XIcon class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>

    <div class="grid grid-cols-3 px-4 py-5 bg-white space-x-6 sm:p-6">
      <div class="col-span-2 space-y-2">
        <div>
          <div>
            <label for="format" class="block text-sm font-medium text-gray-700">
              Type
            </label>
            <div class="mt-1">
              <select
                v-model="typeComputed"
                id="format"
                name="format"
                autocomplete="format-name"
                class="
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  block
                  w-full
                  sm:text-sm
                  border-gray-300
                  rounded-md
                "
              >
                <option value="color">Couleur</option>
                <option value="size">Taille</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                v-model="nameComputed"
                type="text"
                name="name"
                id="name"
                class="
                  focus:ring-indigo-500 focus:border-indigo-500
                  flex-1
                  block
                  w-full
                  rounded-md
                  sm:text-sm
                  border-gray-300
                "
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                v-model="priceComputed"
                type="text"
                name="price"
                id="price"
                class="
                  focus:ring-indigo-500 focus:border-indigo-500
                  flex-1
                  block
                  w-full
                  rounded-md
                  sm:text-sm
                  border-gray-300
                "
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1">
        <div>
          <label class="block text-sm font-medium text-gray-700"> Image </label>
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
                  for="file-upload"
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
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon } from "@heroicons/vue/outline/index.js";

const { compressImage } = useMedia();

const props = defineProps({
  type: {
    type: String,
    default: "couleur",
  },
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Object,
    default: null,
  },
  close: {
    type: Function,
    default: () => {},
  },
});

const emits = defineEmits([
  "update:type",
  "update:name",
  "update:price",
  "update:images",
]);

const typeComputed = computed({
  get() {
    return props.type;
  },
  set(value) {
    emits("update:type", value);
  },
});

const nameComputed = computed({
  get() {
    return props.name;
  },
  set(value) {
    emits("update:name", value);
  },
});

const priceComputed = computed({
  get() {
    return props.price;
  },
  set(value) {
    emits("update:price", value);
  },
});

const imagesComputed = computed({
  get() {
    return props.images;
  },
  set(value) {
    emits("update:images", value);
  },
});

const onFileChange = async (e) => {
  let files = e.target.files;

  const readData = (f) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(f);
    });

  const compressedImages = await Promise.all(
    Array.from(files).map(async (file) => ({
      type: file.type,
      size: file.size,
      name: file.name,
      data: await compressImage(file),
    }))
  );

  imagesComputed.value = await Promise.all(
    await compressedImages.map(async (img) => ({
      ...img,
      data: await readData(img.data),
    }))
  );
};
</script>