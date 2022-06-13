<template>
  <div>
    <HeadersAdmin />

    <Notification />
    <div class="py-10">
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <slot />
          <!-- /End replace -->
        </div>
      </main>
    </div>

    <FootersAdmin />
  </div>
</template>