<template>
  <div>

    <div class="relative pt-1">
      <div class="flex justify-between">
        <p>Lvl. {{ expLevel.getLevel() }} / {{ expLevel.maxLevel }}</p>
        <p>{{ progress.actual }} <span v-if="!isMaxLevel">/ {{ progress.target }}</span></p>

      </div>
      <igt-progress-bar :percentage="progressPercentage"></igt-progress-bar>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {IgtExpLevel} from "ts-multiplayer-common/game/features/skills/IgtExpLevel";
import IgtProgressBar from "@/components/util/igt-progress-bar.vue";

@Component({
  components: {IgtProgressBar}
})
export default class IgtExpLevelComponent extends Vue {
  @Prop({required: true}) private expLevel!: IgtExpLevel;

  get isMaxLevel() {
    return this.expLevel.isMaxLevel();
  }

  get progress() {
    return this.expLevel.getLevelProgress();
  }

  get progressPercentage() {
    if (this.isMaxLevel) {
      return 1;
    }
    return this.progress.getPercentage();
  }
}
</script>


<style scoped>
</style>
