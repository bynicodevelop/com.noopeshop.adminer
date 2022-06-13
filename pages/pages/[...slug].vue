<template>
  <NuxtLayout>
    <ContentDoc v-slot="{ doc }">
      <div class="text-lg max-w-prose mx-auto">
        <h1>
          <span
            class="
              block
              text-base text-center text-indigo-600
              font-semibold
              tracking-wide
              uppercase
            "
            >Introducing</span
          >
          <span
            class="
              mt-2
              block
              text-3xl text-center
              leading-8
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-4xl
            "
            >{{ doc.title }}</span
          >
        </h1>

        <div
          class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto mb-10"
        >
          <ContentRenderer :value="doc" />
        </div>
      </div>
    </ContentDoc>
  </NuxtLayout>
</template>