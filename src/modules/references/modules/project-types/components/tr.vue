<template>
  <tr class="">
    <slot name="index"></slot>
    <td>
      <span>
        <b-badge variant="primary"> UZ: </b-badge>
        {{ data.nameLt }}
      </span>
      <br>
      <span>
        <b-badge class="primary"> RU: </b-badge>
        {{ data.nameRu }}
      </span>
    </td >
    <slot name="actions"></slot>
  </tr>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style>
</style>