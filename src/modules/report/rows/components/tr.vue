<template>
  <tr>
    <slot name="index"></slot>
    <td
        class="p_cursor"
        @click="$emit('pushData', data)"
        style="width: 40%;"
    >

      <div
          v-b-tooltip.hover
          :title="
                  getName({
                      nameUz: data.nameUz,
                      nameLt: data.nameLt,
                      nameRu: data.nameRu,
                    })
                "
          class="dots"
      >
                <span class="d-block ml-2 pre dots">
                    {{
                    getName( {
                      nameUz: data.nameUz,
                      nameLt: data.nameLt,
                      nameRu: data.nameRu,
                    } )
                  }}
                </span>
      </div>

    </td>

    <td
        class="p_cursor"
        @click="$emit('pushData', data)"
    >

      <div
          v-b-tooltip.hover
          :title="data.comment"
          class="dots"
      >
                <span class="d-block ml-2 pre dots">
                    {{data.comment}}
                </span>
      </div>

    </td>


    <slot name="actions"></slot>
  </tr>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  props: ["data", "sidebar"],
};
</script>
<style>
.rotate_text {
  writing-mode: vertical-lr;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: vertical-lr;
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  margin: auto;
}
</style>
