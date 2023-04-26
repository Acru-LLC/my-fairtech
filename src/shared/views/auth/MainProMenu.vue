<template>
    <section class="section-s">
        <h1>FAIR TECH axborot tizimlari kompleksi</h1>
        <div class="card-wrapper">
            <div class="card-main"
                 v-if="$can('view', 'project-menu-fair-tech')"
                 @click="$emit('isLoginBtn', 'fair_tech')">
                <a class="logos">
                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">
                </a>
                <div class="inner-card1 p-2">
                    <span class="pro-name">Fair Tech</span>
                </div>
            </div>
            <div class="card-main"
                 v-if="$can('view', 'project-menu-fair-price')"
                 @click="$emit('isLoginBtn', 'fair_price')">
                <a class="logos">
                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">
                </a>
                <div class="inner-card1 p-2">
                    <span class="pro-name">Fair Price</span>
                </div>
            </div>
            <div class="card-main"
                 v-if="$can('view', 'project-menu-pharm-info')"
                 @click="$emit('isLoginBtn', 'pharm_info')">
                <a class="logos">
                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">
                </a>
                <div class="inner-card2 p-2">
                    <span class="pro-name">Pharm Info</span>
                </div>
            </div>

            <div class="card-main"
                 v-if="$can('view', 'project-menu-product-info')"
                 @click="$emit('isLoginBtn', 'product_info')">
                <a class="logos">
                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">
                </a>
                <div class="inner-card2 p-2">
                    <span class="pro-name">Product Info</span>
                </div>
            </div>
            <div class="card-main"
                 v-if="$can('view', 'project-menu-integration')"
                 @click="$emit('isLoginBtn', 'integration')">
                <a class="logos">
                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">
                </a>
                <div class="inner-card2 p-2">
                    <span class="pro-name">Integratsiya</span>
                </div>
            </div>
            <!--            <div class="card-main"-->
            <!--                 v-if="$can('view', 'project-menu-integration')"-->
            <!--                 @click="$emit('isLoginBtn', 'integration')">-->
            <!--                <a class="logos">-->
            <!--                    <img src="../../../assets/pharm/favicon.png" style="width: 50px">-->
            <!--                </a>-->
            <!--                <div class="inner-card2 p-2">-->
            <!--                    <span class="pro-name">Murojaat</span>-->
            <!--                </div>-->
            <!--            </div>-->
            <div class="bg-blur"></div>
        </div>

    </section>
</template>
<script src="https://kit.fontawesome.com/0f9634eaff.js" crossorigin="anonymous" defer>
</script>

<script>
export default {}
</script>


<style lang="css">
@font-face {
    font-family: 'engraversgothic-bt-regular';
    src: url('~@/assets/fonts/EngraversGothicBT.ttf');
}

:root {
    --bg-color: #eef5fa;
    --font-color: #2E4F4F;
    --hover-font-color: #2DB1FD;
    --wrapper-width: clamp(10rem, 70vw, 60rem);
    --ul-padding: clamp(.5rem, 2vw, 2rem);
    --card-height: clamp(15rem, 25vw, 19rem);
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #6f7070;
    z-index: 1;
    font-family: 'engraversgothic-bt-regular', sans-serif;
}

.section-s {
    top: 0;
    min-height: 100vh;
    background-color: var(--bg-color);
    padding-block: var(--ul-padding);
    position: relative;
    display: grid;
    place-content: center;
    place-content: center;
}

/*.active {*/
/*    color: var(--hover-font-color);*/
/*    filter: drop-shadow(0px 0px 20px var(--hover-font-color));*/
/*}*/

.card-wrapper {
    margin: 0px auto;
    border: 2px solid var(--hover-font-color);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: calc(var(--card-height) * .05);
}

.inner-card1 {
    margin: 50px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: calc(var(--card-height) * .05);
    text-decoration: none;
    top: 60%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: relative;
}

.inner-card2 {
    margin: 50px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: calc(var(--card-height) * .05);
    text-decoration: none;
    top: 60%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: relative;
}

.pro-name {
    font-size: 22px;
    font-weight: bold;
    color: var(--hover-font-color);
    font-family: 'engraversgothic-bt-regular', sans-serif;
}

.card-main {
    height: var(--card-height);
    aspect-ratio: 1/1.2;
    margin: calc(var(--card-height) * .04);
    animation: cardBgAnimation 30s infinite;
    position: relative;
    cursor: pointer;
    transition: 200ms ease-in-out;
    border-radius: calc(var(--card-height) * .05);
}

.card-main::before {
    content: '';
    position: absolute;
    background-color: #113738FF;
    height: 100%;
    width: 100%;
    mix-blend-mode: color;
    transition: 200ms ease-in-out;
    border-radius: calc(var(--card-height) * .05);
}

.card-main::after {
    content: '';
    position: absolute;
    height: 80%;
    width: 80%;
    border: 1px solid var(--hover-font-color);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0px 0px 5px var(--hover-font-color));
    transition: 200ms ease-in-out;
    pointer-events: none;
    border-radius: calc(var(--card-height) * .05);
}

.card-main:hover:before {
    opacity: 0 !important;
}

.card-main:hover {
    scale: 1.05;
    z-index: 1 !important;
}

.bg-blur {
    top: 0;
    left: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    pointer-events: none;
    transition: 200ms ease !important;
}

.card-main:hover ~ .bg-blur {
    backdrop-filter: blur(15px);
}

.card-main:hover a i {

    filter: drop-shadow(0px 0px 5px var(--hover-font-color));
}

.card-main:first-child {
    background: url(../../../assets/pharm/fairTech.jpg);
}

.card-main:nth-child(2) {
    background: url(../../../assets/pharm/product.jpg);
}

.card-main:nth-child(3) {
    background: url(../../../assets/pharm/pharmacy.jpeg);
}

.card-main:nth-child(4) {
    background: url(../../../assets/pharm/price.jpg);
}

.card-main:nth-child(5) {
    background: url(../../../assets/pharm/integration.jpg);
}


@keyframes cardBgAnimation {
    0% {
        background-size: 200%;
        background-position: 27% 10%;
    }
    20% {
        background-size: 200%;
        background-position: 35% 40%;
    }

    20.00001% {
        background-size: 300%;
        background-position: 75% 40%;
    }
    40% {
        background-size: 300%;
        background-position: 85% 90%;
    }

    40.00001% {
        background-size: 350%;
        background-position: 25% 70%;
    }
    60% {
        background-size: 350%;
        background-position: 5% 10%;
    }

    60.00001% {
        background-size: 150%;
        background-position: 20% 0%;
    }
    80% {
        background-size: 150%;
        background-position: 90% 10%;
    }

    80.00001% {
        background-size: 200%;
        background-position: 5% 10%;
    }
    100% {
        background-size: 200%;
        background-position: 65% 20%;
    }

}

.logos {
    text-decoration: none;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: relative;
}


</style>