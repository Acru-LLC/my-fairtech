<template>
  <!-- Style switcher -->
  <div id="style-switcher" style="">
    <div>
      <h3>Select your color</h3>
      <ul class="pattern">
        <li>
          <a class="color1" href="#" v-on:click="setTheme('red')"></a>
        </li>
        <li>
          <a class="color2" href="#" v-on:click="setTheme('green')"></a>
        </li>
        <li>
          <a class="color3" href="#" v-on:click="setTheme('pink')"></a>
        </li>
        <li>
          <a class="color4" href="#" v-on:click="setTheme('cyan')"></a>
        </li>
        <li>
          <a class="color5" href="#" v-on:click="setTheme('purple')"></a>
        </li>
        <li>
          <a class="color6" href="#" v-on:click="setTheme('blue')"></a>
        </li>
        <li>
          <a class="color7" href="#" v-on:click="setTheme('orange')"></a>
        </li>
        <li>
          <a class="color8" href="#" v-on:click="setTheme('yellow')"></a>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <a href="#" class="settings">
        <i class="mdi mdi-settings mdi-spin"></i>
      </a>
    </div>
  </div>
  <!-- end Style switcher -->
</template>

<script>
export default {
  data() {
    return {
      isVisible: true
    };
  },
  name: "Switcher",
  props: {},
  methods: {
    setTheme(theme) {
      // eslint-disable-next-line no-undef
      return jQuery("#settingOption").attr(
        "href",
        "./css/colors/" + theme + ".css"
      );
    }
  }
};
</script>

<style>
</style>
