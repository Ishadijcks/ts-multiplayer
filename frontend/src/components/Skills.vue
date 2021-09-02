<template>
  <div>
    {{ woodCutting }}
    <igt-exp-level :exp-level="woodCutting"></igt-exp-level>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ISkills} from "ts-multiplayer-common/game/features/skills/ISkills";
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level.vue";
import {DiscreteExpLevel} from "ts-multiplayer-common/game/features/skills/DiscreteExpLevel";

@Component({
  components: {IgtExpLevel}
})
export default class Skills extends Vue {
  @Prop({required: true}) private skills!: ISkills;

  get woodCutting() {
    return DiscreteExpLevel.fromJson(this.skills.woodcutting);
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
