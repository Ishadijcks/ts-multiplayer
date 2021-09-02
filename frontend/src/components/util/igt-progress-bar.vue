<template>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded" :class="bgClass">
    <div :style="{'width' : percentage * 100 + '%'}"
         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
         :class="fgClass"></div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class IgtProgressBar extends Vue {
  @Prop({required: true}) private percentage!: number;
  @Prop({default: 'bg-pink-200'}) private bgClass!: string;
  @Prop({default: 'bg-pink-500'}) private fgClass!: string;
}
</script>

<style scoped>
</style>
