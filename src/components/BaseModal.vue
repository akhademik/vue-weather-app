<script setup>
defineProps(['isShow']);
defineEmits(['closeModal']);
</script>

<template>
  <Teleport to="body">
    <Transition
      name="modal-outer"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div
        v-show="isShow"
        class="fixed inset-0 modal-outer bg-black/50">
        <Transition
          name="modal-inner"
          enter-active-class="animate__animated animate__slideInDown"
          leave-active-class="animate__animated animate__slideOutUP">
          <div
            v-if="isShow"
            class="mx-auto mt-12 flex w-[500px] flex-col gap-3 rounded-lg bg-white p-3">
            <!-- Start Slot -->
            <div class="flex flex-col gap-3 [&>section>h1]:font-bold">
              <slot />
              <!-- End Slot -->
            </div>
            <button
              class="flex justify-start px-4 py-1 text-xl text-white bg-blue-600 rounded-lg cursor-pointer w-max hover:bg-blue-300 hover:text-red-500"
              @click="$emit('closeModal')">
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal-outer.animate__animated.animate__fadeIn,
.modal-outer.animate__animated.animate__fadeOut {
  --animate-duration: 0.7s;
}
</style>
