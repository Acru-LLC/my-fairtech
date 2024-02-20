<!--<template>-->
<!--    <section class="section-s">-->
<!--        <h1>FAIR TECH axborot tizimlari kompleksi</h1>-->
<!--        <div class="card-wrapper">-->
<!--            <div class="card-main card-main1"-->
<!--                 v-if="$can('view', 'project-menu-fair-tech')"-->
<!--                 @click="$emit('isLoginBtn', 'fair_tech')">-->
<!--                <a class="logos">-->
<!--                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">-->
<!--                </a>-->
<!--                <div class="inner-card1 p-2">-->
<!--                    <span class="pro-name">Fair Tech</span>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="card-main card-main2"-->
<!--                 v-if="$can('view', 'project-menu-fair-price')"-->
<!--                 @click="$emit('isLoginBtn', 'fair_price')">-->
<!--                <a class="logos">-->
<!--                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">-->
<!--                </a>-->
<!--                <div class="inner-card1 p-2">-->
<!--                    <span class="pro-name">Fair Price</span>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="card-main card-main3"-->
<!--                 v-if="$can('view', 'project-menu-pharm-info')"-->
<!--                 @click="$emit('isLoginBtn', 'pharm_info')">-->
<!--                <a class="logos">-->
<!--                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">-->
<!--                </a>-->
<!--                <div class="inner-card2 p-2">-->
<!--                    <span class="pro-name">Pharm Info</span>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="card-main card-main4"-->
<!--                 v-if="$can('view', 'project-menu-product-info')"-->
<!--                 @click="$emit('isLoginBtn', 'product_info')">-->
<!--                <a class="logos">-->
<!--                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">-->
<!--                </a>-->
<!--                <div class="inner-card2 p-2">-->
<!--                    <span class="pro-name">Product Info</span>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="card-main card-main5"-->
<!--                 v-if="$can('view', 'project-menu-integration')"-->
<!--                 @click="$emit('isLoginBtn', 'integration')">-->
<!--                <a class="logos">-->
<!--                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">-->
<!--                </a>-->
<!--                <div class="inner-card2 p-2">-->
<!--                    <span class="pro-name">Integratsiya</span>-->
<!--                </div>-->
<!--            </div>-->
<!--            &lt;!&ndash;            <div class="card-main"&ndash;&gt;-->
<!--            &lt;!&ndash;                 v-if="$can('view', 'project-menu-integration')"&ndash;&gt;-->
<!--            &lt;!&ndash;                 @click="$emit('isLoginBtn', 'integration')">&ndash;&gt;-->
<!--            &lt;!&ndash;                <a class="logos">&ndash;&gt;-->
<!--            &lt;!&ndash;                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">&ndash;&gt;-->
<!--            &lt;!&ndash;                </a>&ndash;&gt;-->
<!--            &lt;!&ndash;                <div class="inner-card2 p-2">&ndash;&gt;-->
<!--            &lt;!&ndash;                    <span class="pro-name">Murojaat</span>&ndash;&gt;-->
<!--            &lt;!&ndash;                </div>&ndash;&gt;-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <div class="bg-blur"></div>-->
<!--        </div>-->

<!--    </section>-->
<!--</template>-->
<!--<script src="https://kit.fontawesome.com/0f9634eaff.js" crossorigin="anonymous" defer>-->
<!--</script>-->

<!--<script>-->
<!--export default {}-->
<!--</script>-->


<!--<style lang="css">-->
<!--@font-face {-->
<!--    font-family: 'engraversgothic-bt-regular';-->
<!--    src: url('~@/assets/fonts/EngraversGothicBT.ttf');-->
<!--}-->

<!--:root {-->
<!--    &#45;&#45;bg-color: #eef5fa;-->
<!--    &#45;&#45;font-color: #2E4F4F;-->
<!--    &#45;&#45;hover-font-color: #2DB1FD;-->
<!--    &#45;&#45;wrapper-width: clamp(10rem, 70vw, 60rem);-->
<!--    &#45;&#45;ul-padding: clamp(.6rem, 3vw, 3rem);-->
<!--    &#45;&#45;card-height: clamp(18rem, 28vw, 22rem);-->
<!--    &#45;&#45;color: #ffffff;-->
<!--    &#45;&#45;background: #2196f3;-->
<!--}-->

<!--* {-->
<!--    padding: 0;-->
<!--    margin: 0;-->
<!--    box-sizing: border-box;-->
<!--}-->

<!--h1 {-->
<!--    text-align: center;-->
<!--    margin-bottom: 20px;-->
<!--    color: #6f7070;-->
<!--    z-index: 1;-->
<!--    font-family: 'engraversgothic-bt-regular', sans-serif;-->
<!--    font-size: 50px;-->
<!--    font-weight: bold;-->
<!--    width: 100%;-->
<!--    letter-spacing: 5px;-->
<!--    text-shadow: -2px -2px 0px var(&#45;&#45;background),-->
<!--    1px 1px 1px var(&#45;&#45;background),-->
<!--    1px 1px 1px rgba(68, 67, 67, 0.33);-->
<!--}-->

<!--.section-s {-->
<!--    top: 0;-->
<!--    min-height: 100vh;-->
<!--    background-color: var(&#45;&#45;bg-color);-->
<!--    padding-block: var(&#45;&#45;ul-padding);-->
<!--    position: relative;-->
<!--    display: grid;-->
<!--    place-content: center;-->
<!--}-->

<!--/*.active {*/-->
<!--/*    color: var(&#45;&#45;hover-font-color);*/-->
<!--/*    filter: drop-shadow(0px 0px 20px var(&#45;&#45;hover-font-color));*/-->
<!--/*}*/-->

<!--.card-wrapper {-->
<!--    margin: 0 20px 0 20px;-->
<!--    padding: 10px ;-->
<!--    border: 2px solid var(&#45;&#45;hover-font-color);-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    flex-wrap: wrap;-->
<!--    border-radius: calc(var(&#45;&#45;card-height) * .05);-->
<!--}-->

<!--.inner-card1 {-->
<!--    margin: 50px auto;-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    flex-wrap: wrap;-->
<!--    border-radius: calc(var(&#45;&#45;card-height) * .05);-->
<!--    text-decoration: none;-->
<!--    top: 60%;-->
<!--    left: 50%;-->
<!--    transform: translateX(-50%) translateY(-50%);-->
<!--    position: relative;-->
<!--}-->

<!--.inner-card2 {-->
<!--    margin: 50px auto;-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    flex-wrap: wrap;-->
<!--    border-radius: calc(var(&#45;&#45;card-height) * .05);-->
<!--    text-decoration: none;-->
<!--    top: 60%;-->
<!--    left: 50%;-->
<!--    transform: translateX(-50%) translateY(-50%);-->
<!--    position: relative;-->
<!--}-->

<!--.pro-name {-->
<!--    font-size: 28px;-->
<!--    font-weight: bold;-->
<!--    color: #ffffff;-->
<!--    font-family: 'engraversgothic-bt-regular', sans-serif;-->
<!--    text-align: center;-->
<!--    width: 100%;-->
<!--    margin: 0px auto;-->
<!--    letter-spacing: 3px;-->
<!--    position: absolute;-->
<!--    margin-top: -10px;-->
<!--    text-shadow: -2px -2px 0px var(&#45;&#45;background),-->
<!--    3px 3px 3px var(&#45;&#45;background),-->
<!--    3px 3px 3px #00000055;-->
<!--}-->

<!--.card-main {-->
<!--    height: var(&#45;&#45;card-height);-->
<!--    aspect-ratio: 1/1.2;-->
<!--    margin: calc(var(&#45;&#45;card-height) * .04);-->
<!--    animation: cardBgAnimation 30s infinite;-->
<!--    position: relative;-->
<!--    cursor: pointer;-->
<!--    transition: 200ms ease-in-out;-->
<!--    border-radius: calc(var(&#45;&#45;card-height) * .05);-->
<!--}-->

<!--.card-main::before {-->
<!--    content: '';-->
<!--    position: absolute;-->
<!--    background-color: #113738FF;-->
<!--    height: 100%;-->
<!--    width: 100%;-->
<!--    mix-blend-mode: color;-->
<!--    transition: 200ms ease-in-out;-->
<!--    border-radius: calc(var(&#45;&#45;card-height) * .05);-->
<!--}-->

<!--.card-main::after {-->
<!--    content: '';-->
<!--    position: absolute;-->
<!--    height: 80%;-->
<!--    width: 80%;-->
<!--    border: 1px solid var(&#45;&#45;hover-font-color);-->
<!--    left: 50%;-->
<!--    top: 50%;-->
<!--    transform: translate(-50%, -50%);-->
<!--    filter: drop-shadow(0px 0px 5px var(&#45;&#45;hover-font-color));-->
<!--    transition: 200ms ease-in-out;-->
<!--    pointer-events: none;-->
<!--    border-radius: calc(var(&#45;&#45;card-height) * .05);-->
<!--}-->

<!--.card-main:hover:before {-->
<!--    opacity: 0 !important;-->
<!--}-->

<!--.card-main:hover {-->
<!--    scale: 1.05;-->
<!--    z-index: 1 !important;-->
<!--}-->

<!--.bg-blur {-->
<!--    top: 0;-->
<!--    left: 0;-->
<!--    position: fixed;-->
<!--    height: 100vh;-->
<!--    width: 100vw;-->
<!--    pointer-events: none;-->
<!--    transition: 200ms ease !important;-->
<!--}-->

<!--.card-main:hover ~ .bg-blur {-->
<!--    backdrop-filter: blur(15px);-->
<!--}-->

<!--.card-main:hover a i {-->

<!--    filter: drop-shadow(0px 0px 5px var(&#45;&#45;hover-font-color));-->
<!--}-->

<!--.card-main1 {-->
<!--    background: url(../../../assets/pharm/fairTech.jpg);-->
<!--}-->

<!--.card-main2 {-->
<!--    background: url(../../../assets/pharm/product.jpg);-->
<!--}-->

<!--.card-main3 {-->
<!--    background: url(../../../assets/pharm/pharmacy.jpeg);-->
<!--}-->

<!--.card-main4 {-->
<!--    background: url(../../../assets/pharm/price.jpg);-->
<!--}-->

<!--.card-main5 {-->
<!--    background: url(../../../assets/pharm/integration.jpg);-->
<!--}-->


<!--@keyframes cardBgAnimation {-->
<!--    0% {-->
<!--        background-size: 200%;-->
<!--        background-position: 27% 10%;-->
<!--    }-->
<!--    20% {-->
<!--        background-size: 200%;-->
<!--        background-position: 35% 40%;-->
<!--    }-->

<!--    20.00001% {-->
<!--        background-size: 300%;-->
<!--        background-position: 75% 40%;-->
<!--    }-->
<!--    40% {-->
<!--        background-size: 300%;-->
<!--        background-position: 85% 90%;-->
<!--    }-->

<!--    40.00001% {-->
<!--        background-size: 350%;-->
<!--        background-position: 25% 70%;-->
<!--    }-->
<!--    60% {-->
<!--        background-size: 350%;-->
<!--        background-position: 5% 10%;-->
<!--    }-->

<!--    60.00001% {-->
<!--        background-size: 150%;-->
<!--        background-position: 20% 0%;-->
<!--    }-->
<!--    80% {-->
<!--        background-size: 150%;-->
<!--        background-position: 90% 10%;-->
<!--    }-->

<!--    80.00001% {-->
<!--        background-size: 200%;-->
<!--        background-position: 5% 10%;-->
<!--    }-->
<!--    100% {-->
<!--        background-size: 200%;-->
<!--        background-position: 65% 20%;-->
<!--    }-->

<!--}-->

<!--.logos {-->
<!--    text-decoration: none;-->
<!--    display: inline-block;-->
<!--    top: 50%;-->
<!--    left: 50%;-->
<!--    transform: translateX(-50%) translateY(-50%);-->
<!--    position: relative;-->
<!--}-->


<!--</style>-->
