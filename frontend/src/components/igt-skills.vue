<template>
  <div>
    {{skills}}
    <div class="p-2 m-2 flex flex-col border-2">
      Woodcutting
      <igt-exp-level :exp-level="skills.woodcutting"></igt-exp-level>
    </div>
    <div class="p-2 m-2 flex flex-col border-2">
      Mining
      <igt-exp-level :exp-level="skills.mining"></igt-exp-level>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import IgtExpLevel from "@/components/tools/exp-level/igt-exp-level.vue";
import {Skills} from "ts-multiplayer-common/game/features/skills/Skills";

@Component({
  components: {IgtExpLevel}
})
export default class IgtSkills extends Vue {
  @Prop({required: true}) private skills!: Skills;


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
