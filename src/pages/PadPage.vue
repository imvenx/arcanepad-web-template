<template>
  <h1>Gamepad</h1>
  <h5> User Name:
    {{ Arcane.pad?.user?.name }}
  </h5>
  <q-btn @click="Arcane.msg.emitToViews(new ArcaneBaseEvent('Jump'))" size="xl" outline>Jump</q-btn>
  <div>
    <q-btn @click="Arcane.pad?.calibratePointer(true)" size="xl" outline>Calibrate Pointer Top Left</q-btn>
    <q-btn @click="Arcane.pad?.calibratePointer(false)" size="xl" outline>Calibrate Pointer Bottom Right</q-btn>
    <q-btn @click="Arcane.pad?.calibrateQuaternion()" size="xl" outline>Calibrate Quaternion</q-btn>
  </div>
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import { AttackedEvent } from 'src/models';
import { onMounted } from 'vue';

onMounted(() => {
  Arcane.msg.on('Attacked', ({ damage }: AttackedEvent) => { alert('taken damage: ' + damage) })
})

</script>
