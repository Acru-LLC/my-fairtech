<template>
  <tr>
    <slot name="index"></slot>
    <td
        class="p_cursor"
        @click="$emit('pushData', data)"
        style="width: 70%;"
    >
      <div
          style="width: 100%; margin: auto; height: 100%"
          class="
          d-flex
          align-items-start align-content-center
          justify-content-between
        "
      >
        <div
            v-b-tooltip.hover
            :title="
            getName({
              nameLt: data.nameLt,
              nameUz: data.nameUz,
              nameRu: data.nameRu,
            })
          "
            :style="getStyle(data.children)"
            class="dots"
            :class="data.children.length > 0 ? 'rotate_text' : ''"
        >
          <span class="d-block ml-2 pre dots">
            {{
              getName( {
                nameLt: data.nameLt,
                nameUz: data.nameUz,
                nameRu: data.nameRu,
              } )
            }}
          </span>
        </div>

        <div
            :style="data.children.length > 0 ? 'width:90%;' : ''"
            style="
            border-left: 1px solid #ccc;
            margin-top: -1px;
            margin-bottom: -1.5px;
          "
        >
          <div>
            <div
                :style="
                index !== data.children.length - 1
                  ? 'border-bottom: 1px solid #ccc'
                  : ''
              "
                v-show="data.children.length > 0"
                v-for="(child1, index) in data.children"
                :key="child1.id + 'Child-1'"
            >
              <div class="d-flex align-items-center justify-content-between">
                <div
                    v-b-tooltip.hover
                    :title="
                    getName({
                      nameLt: child1.nameLt,
                      nameUz: child1.nameUz,
                      nameRu: child1.nameRu,
                    })
                  "
                    :class="child1.children.length > 0 ? 'rotate_text' : ''"
                >
                  <span
                      :style="
                      child1.children.length ? getStyle(child1.children) : ''
                    "
                      class="dots d-block ml-2"
                  >
                    {{
                      getName( {
                        nameLt: child1.nameLt,
                        nameUz: child1.nameUz,
                        nameRu: child1.nameRu,
                      } )
                    }}
                  </span>
                </div>

                <div
                    :style="data.children.length > 0 ? 'width:90%' : ''"
                    style="border-left: 1px solid #ccc"
                >
                  <div>
                    <div
                        :style="
                        index !== child1.children.length - 1
                          ? 'border-bottom: 1px solid  #ccc'
                          : ''
                      "
                        v-show="child1.children.length > 0"
                        v-for="(child2, index) in child1.children"
                        :key="child2.id + 'Child-1'"
                    >
                      <div>
                        <div>
                          <span class="ml-2 d-block">
                            {{
                              getName( {
                                nameLt: child2.nameLt,
                                nameUz: child2.nameUz,
                                nameRu: child2.nameRu,
                              } )
                            }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </td>
    <slot name="comment"></slot>
    <td class="text-center">
      <b-form-checkbox switch v-model="data.isVertical" :value="1" :unchecked-value="0">

      </b-form-checkbox>
    </td>
    <td @click="$emit('pushData', data)" v-if="!sidebar" class="text-center">
      {{ data.typeCode }}
    </td>
    <td @click="$emit('pushData', data)" v-if="!sidebar" class="text-center">
      {{ data.comment }}
    </td>
    <td @click="$emit('pushData', data)" v-if="!sidebar" class="text-center">
      {{ data.createdDate }}
    </td>

    <slot name="actions"></slot>
  </tr>

</template>

<script>
// import { getName } from "@/helper";
export default {
  data() {
    return {
      ischeck: false,
      // getName: getName,
    };
  },
  methods: {
    getStyle(data) {
      var total = 0;
      data.forEach( (element) => {
        total = element.children.length;
      } );
      let i = 0;
      if (data.length > 0) {
        while (i <= data.length) {
          if (i % 2 == 0) {
            i++;
            return `height:${data.length + total}0pt`;
          } else {
            i++;
            return "";
          }
        }
      }
    },
  },
  props: ["data", "sidebar"],
  watch: {
    'data.isVertical': {
      handler() {
        this.$emit('isVerticalChange', this.data)
      }
    }
  }
}
</script>
<style scoped>
.rotate_text {
  height: 0;
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
