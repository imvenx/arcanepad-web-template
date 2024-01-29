<template>
  <div :style="`border: 2px solid #${pad.user?.color}`">
    {{ pad.user?.name }}
  </div>
  <div>
    Jump count: {{ jumpCount }}
  </div>
  <q-btn @click="onAttacked" size="xl" outline>Be Attacked</q-btn>
  <div>
    {{ pointerData.x.toFixed(0) }} |
    {{ pointerData.y.toFixed(0) }}
  </div>

  <q-btn @click="pad.startGetPointer()" size="xl" outline>Start Get Pointer</q-btn>
  <q-btn @click="pad.stopGetPointer()" size="xl" outline>Stop Get Pointer</q-btn>
  <div style="width: 10px; height: 10px; border-radius: 100px; border: 2px solid red; position: absolute;"
    :style="`left:${pointerData.x}%; top: ${pointerData.y}%`">
  </div>

  <div>
    Euler Data: {{ eulerData }}
  </div>
  <div>
    <q-btn @click="pad.startGetRotationEuler()" size="xl" outline>Start Get Euler</q-btn>
    <q-btn @click="pad.stopGetRotationEuler()" size="xl" outline>Stop Get Euler</q-btn>
  </div>

  <div>
    Quaternion Data: {{ quaternionData }}
  </div>
  <div>
    <q-btn @click="pad.startGetQuaternion()" size="xl" outline>Start Get Quaternion</q-btn>
    <q-btn @click="pad.stopGetQuaternion()" size="xl" outline>Stop Get Quaternion</q-btn>
  </div>

  <div>
    Linear acceleration Data: {{ linearAcceleration }}
  </div>
  <div>
    <q-btn @click="pad.startGetLinearAcceleration()" size="xl" outline>Start Get linear acceleration</q-btn>
    <q-btn @click="pad.stopGetLinearAcceleration()" size="xl" outline>Stop Get linear acceleration</q-btn>
  </div>
</template>

<script lang="ts" setup>
import { ArcaneBaseEvent, ArcanePad, GetLinearAccelerationEvent, GetPointerEvent, GetQuaternionEvent, GetRotationEulerEvent } from 'arcanepad-web-sdk';
import { AttackedEvent } from 'src/models';
import { onMounted, ref } from 'vue';

const { pad } = defineProps<{ pad: ArcanePad }>()

const jumpCount = ref(0)
const pointerData = ref({ x: 0, y: 0 })
const eulerData = ref({ azimuth: 0, pitch: 0, roll: 0 })
const quaternionData = ref({ x: 0, y: 0, z: 0, w: 0 })
const linearAcceleration = ref({ x: 0, y: 0, z: 0 })

onMounted(() => {
  pad.on('Jump', () => jumpCount.value++)

  pad.onGetPointer(({ x, y }: GetPointerEvent) => {
    pointerData.value = { x, y }
  })

  pad.onGetRotationEuler(({ azimuth, pitch, roll }: GetRotationEulerEvent) => {
    eulerData.value = { azimuth, pitch, roll }
  })


  pad.onGetQuaternion(({ w, x, y, z, }: GetQuaternionEvent) => {
    quaternionData.value = { w, x, y, z }
  })

  pad.onGetLinearAcceleration(({ x, y, z, }: GetLinearAccelerationEvent) => {
    linearAcceleration.value = { x, y, z }
  })

})

function onAttacked() {
  pad.vibrate(1000)
  pad.emit(new AttackedEvent(5))
}



</script>
