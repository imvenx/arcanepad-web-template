<template>
  <h1>Viewer</h1>

  <div style="display: grid; grid-template-columns: 50% 50%;">
    <div v-for="pad in pads">
      <Player :pad="pad" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AEventName, Arcane, ArcanePad, IframePadConnectEvent, IframePadDisconnectEvent } from 'arcanepad-web-sdk';
import Player from 'src/components/Player.vue';
import { Ref, onMounted, ref } from 'vue';


const pads: Ref<ArcanePad[]> = ref([])

onMounted(() => {
  init()
})

async function init() {
  let initialState = await Arcane.arcaneClientInitialized()
  pads.value = initialState.pads

  Arcane.msg.on(AEventName.IframePadConnect, (e: IframePadConnectEvent) => {
    const padExists = pads.value.some(p => p.iframeId === e.iframeId)
    if (padExists) return

    const padToAdd = new ArcanePad({ deviceId: e.deviceId, internalId: e.internalId, iframeId: e.iframeId, isConnected: true, user: e.user })
    pads.value.push(padToAdd)
  })

  Arcane.msg.on(AEventName.IframePadDisconnect, (e: IframePadDisconnectEvent) => {
    const padToRemove = pads.value.find(p => p.iframeId === e.iframeId)
    if (!padToRemove) return

    pads.value.splice(pads.value.indexOf(padToRemove), 1)
  })
}
</script>
