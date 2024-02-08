<script>
export default {
  props: ["propColor"],
  data() {
    return {
      colors: [
        "#2b6c58",
        "#34c38f",
        "#50a5f1",
        "#f1b44c",
        "#f46a6a",
        "#343a40",
        "#74788d",
      ],
      selected: "",
    };
  },
  created() {
    if (this.propColor) {
      this.selected = this.propColor;
    }
  },
  methods: {
    setColor(v) {
      this.selected = v;
    },
    selectColor(v) {
      if (v != this.selected) {
        this.selected = v;
        this.$emit("selectColor", v);
      } else {
        this.selected = "";
        this.$emit("selectColor", "");
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="d-flex">
      <div
        :style="`background-color: ${cl}`"
        @click="selectColor(cl)"
        class="card ml-2 mt-2 mb-0"
        v-for="cl in colors"
        :key="cl"
      >
        <div class="card-body text-center">
          <div
            class="rounded d-flex"
            style="
              height: 11px;
              width: 11px;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
            "
          >
            <i
              v-if="selected == cl"
              class="bx bx-checkbox-checked"
              :class="cl == 'bg-light' ? 'text-dark' : ' text-white'"
              style="font-size: 45px"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>