<template>
  <div>
    <div class="p-2 m-2 flex flex-col border-2">
      Woodcutting
      <igt-exp-level :exp-level="woodCutting"></igt-exp-level>
    </div>
    <div class="p-2 m-2 flex flex-col border-2">
      Mining
      <igt-exp-level :exp-level="mining"></igt-exp-level>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ISkills} from "ts-multiplayer-common/game/features/skills/ISkills";
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level.vue";
import {woodcutting, mining} from "ts-multiplayer-common/content";

@Component({
  components: {IgtExpLevel}
})
export default class Skills extends Vue {
  @Prop({required: true}) private skills!: ISkills;

  private localWoodcutting = woodcutting;
  private localMining = mining;

  get woodCutting() {
    this.localWoodcutting.exp = this.skills.woodcutting.exp;
    return this.localWoodcutting
  }

  get mining() {
    this.localMining.exp = this.skills.mining.exp
    return this.localMining;
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
