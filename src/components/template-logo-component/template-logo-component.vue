<template>
    <div >
<!--    <div :class="{'text-center mb-1' : windowSizeSm}">-->
<!--        <img alt="" class="top-0" height="135" src="@/assets/images/gtl-logo.png" width="135">-->
    </div>
</template>
<script>
    export default {
        name: "TemplateLogoComponent",
        // props: {
        //     position: String,
        //     default: 'text-center'
        // },
        data() {
            return {
                innerWidth: window.innerWidth,
            }
        },
        methods: {
            onResize() {
                this.innerWidth = window.innerWidth
            }
        },
        computed: {
            windowSizeSm() {
                return window.innerWidth < 768;
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
    }

</script>
<style scoped>
    .top-0 {
        top: 0px;
    }
</style>