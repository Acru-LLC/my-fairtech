<template>

  <body>
  <div class="main">

    <div class="switch" id="switch-cnt">
      <div class="switch__circle"></div>
      <div class="switch__circle switch__circle--t"></div>
      <!--      <div class="switch__container" id="switch-c1">-->
      <!--        <h2 class="switch__title title">Welcome Back !</h2>-->
      <!--        <p class="switch__description description">To keep connected with us please login with your personal info</p><button class="switch__button button switch-btn">SIGN IN</button>-->
      <!--      </div>-->
      <!--      <div class="switch__container is-hidden" id="switch-c2">-->
      <!--        <h2 class="switch__title title">Hello Friend !</h2>-->
      <!--        <p class="switch__description description">Enter your personal details and start journey with us</p><button class="switch__button button switch-btn">SIGN UP</button>-->
      <!--      </div>-->

      <ul class="honeycomb" lang="es">
        <li class="honeycomb-cell" @click="$emit('isLoginBtn')">
          <img class="honeycomb-cell__image" src="https://source.unsplash.com/random/1">
          <div class="honeycomb-cell__title">Fair Tech</div>
        </li>
        <li class="honeycomb-cell">
          <img class="honeycomb-cell__image" src="https://source.unsplash.com/random/2">
          <div class="honeycomb-cell__title">Fair Price</div>
        </li>
        <li class="honeycomb-cell">
          <img class="honeycomb-cell__image" src="https://source.unsplash.com/random/3">
          <div class="honeycomb-cell__title">Pharm Info</div>
        </li>
        <li class="honeycomb-cell">
          <img class="honeycomb-cell__image" src="https://source.unsplash.com/random/4">
          <div class="honeycomb-cell__title area">Product Info</div>
        </li>

        <li class="honeycomb-cell honeycomb__placeholder"></li>
      </ul>
    </div>

    <!--    <div class="container a-container" id="a-container">-->
    <!--     -->

    <!--    </div>-->
    <!--    <div class="container b-container" id="b-container">-->
    <!--      <form class="form" id="b-form" method="" action="">-->
    <!--        <h2 class="form_title title">Sign in to Website</h2>-->
    <!--        <div class="form__icons"><img class="form__icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iRmFjZWJvb2siPjxwYXRoIGQ9Ik0yNSw1MCBDMzguODA3MTE5NCw1MCA1MCwzOC44MDcxMTk0IDUwLDI1IEM1MCwxMS4xOTI4ODA2IDM4LjgwNzExOTQsMCAyNSwwIEMxMS4xOTI4ODA2LDAgMCwxMS4xOTI4ODA2IDAsMjUgQzAsMzguODA3MTE5NCAxMS4xOTI4ODA2LDUwIDI1LDUwIFogTTI1LDQ3IEMzNy4xNTAyNjUxLDQ3IDQ3LDM3LjE1MDI2NTEgNDcsMjUgQzQ3LDEyLjg0OTczNDkgMzcuMTUwMjY1MSwzIDI1LDMgQzEyLjg0OTczNDksMyAzLDEyLjg0OTczNDkgMywyNSBDMywzNy4xNTAyNjUxIDEyLjg0OTczNDksNDcgMjUsNDcgWiBNMjYuODE0NTE5NywzNiBMMjYuODE0NTE5NywyNC45OTg3MTIgTDMwLjA2ODc0NDksMjQuOTk4NzEyIEwzMC41LDIxLjIwNzYwNzIgTDI2LjgxNDUxOTcsMjEuMjA3NjA3MiBMMjYuODIwMDQ4NiwxOS4zMTAxMjI3IEMyNi44MjAwNDg2LDE4LjMyMTM0NDIgMjYuOTIwNzIwOSwxNy43OTE1MzQxIDI4LjQ0MjU1MzgsMTcuNzkxNTM0MSBMMzAuNDc2OTYyOSwxNy43OTE1MzQxIEwzMC40NzY5NjI5LDE0IEwyNy4yMjIyNzY5LDE0IEMyMy4zMTI4NzU3LDE0IDIxLjkzNjg2NzgsMTUuODM5MDkzNyAyMS45MzY4Njc4LDE4LjkzMTg3MDkgTDIxLjkzNjg2NzgsMjEuMjA4MDM2NiBMMTkuNSwyMS4yMDgwMzY2IEwxOS41LDI0Ljk5OTE0MTMgTDIxLjkzNjg2NzgsMjQuOTk5MTQxMyBMMjEuOTM2ODY3OCwzNiBMMjYuODE0NTE5NywzNiBaIE0yNi44MTQ1MTk3LDM2IiBpZD0iT3ZhbC0xIi8+PC9nPjwvZz48L3N2Zz4=" alt=""><img class="form__icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iTGlua2VkSW4iPjxwYXRoIGQ9Ik0yNSw1MCBDMzguODA3MTE5NCw1MCA1MCwzOC44MDcxMTk0IDUwLDI1IEM1MCwxMS4xOTI4ODA2IDM4LjgwNzExOTQsMCAyNSwwIEMxMS4xOTI4ODA2LDAgMCwxMS4xOTI4ODA2IDAsMjUgQzAsMzguODA3MTE5NCAxMS4xOTI4ODA2LDUwIDI1LDUwIFogTTI1LDQ3IEMzNy4xNTAyNjUxLDQ3IDQ3LDM3LjE1MDI2NTEgNDcsMjUgQzQ3LDEyLjg0OTczNDkgMzcuMTUwMjY1MSwzIDI1LDMgQzEyLjg0OTczNDksMyAzLDEyLjg0OTczNDkgMywyNSBDMywzNy4xNTAyNjUxIDEyLjg0OTczNDksNDcgMjUsNDcgWiBNMTQsMjAuMTE4MDQ3OSBMMTQsMzQuNjU4MTgzNCBMMTguNzEwMDg1MSwzNC42NTgxODM0IEwxOC43MTAwODUxLDIwLjExODA0NzkgTDE0LDIwLjExODA0NzkgWiBNMTYuNjY0Njk2MiwxMyBDMTUuMDUzNDA1OCwxMyAxNCwxNC4wODU4NjExIDE0LDE1LjUxMTUxMjIgQzE0LDE2LjkwNzYzMzEgMTUuMDIyMjcxMSwxOC4wMjQ3NjE0IDE2LjYwMzU1NTYsMTguMDI0NzYxNCBMMTYuNjMzNjU1NiwxOC4wMjQ3NjE0IEMxOC4yNzU5ODY3LDE4LjAyNDc2MTQgMTkuMjk4ODIyMiwxNi45MDc2MzMxIDE5LjI5ODgyMjIsMTUuNTExNTEyMiBDMTkuMjY4MjUxOSwxNC4wODU4NjExIDE4LjI3NTk4NjcsMTMgMTYuNjY0Njk2MiwxMyBaIE0zMC41NzY5MjEzLDIwLjExODA0NzkgQzI4LjA3NjE3NiwyMC4xMTgwNDc5IDI2Ljk1NjU1MDEsMjEuNTI5MzE5OSAyNi4zMzE0MTA4LDIyLjUxOTM1MjcgTDI2LjMzMTQxMDgsMjAuNDU5ODY0NCBMMjEuNjIwNzYxNCwyMC40NTk4NjQ0IEMyMS42ODI4NDI3LDIxLjgyNDIzNTYgMjEuNjIwNzYxNCwzNSAyMS42MjA3NjE0LDM1IEwyNi4zMzE0MTA4LDM1IEwyNi4zMzE0MTA4LDI2Ljg3OTU4ODcgQzI2LjMzMTQxMDgsMjYuNDQ1MDMyIDI2LjM2MTk4MTIsMjYuMDExNTM2OCAyNi40ODY1MTk5LDI1LjcwMDQwODQgQzI2LjgyNjkzMiwyNC44MzIyNiAyNy42MDIwMDY5LDIzLjkzMzQyMzMgMjguOTAzMjY3NCwyMy45MzM0MjMzIEMzMC42MDgzMzgxLDIzLjkzMzQyMzMgMzEuMjg5OTE0OSwyNS4yNjY3MjAyIDMxLjI4OTkxNDksMjcuMjIwNjMzMyBMMzEuMjg5OTE0OSwzNC45OTk2MTQgTDM1Ljk5OTgxMTksMzQuOTk5NjE0IEwzNiwyNi42NjI3NDQ2IEMzNiwyMi4xOTY2NDM5IDMzLjY3NjM3NDMsMjAuMTE4MDQ3OSAzMC41NzY5MjEzLDIwLjExODA0NzkgWiBNMzAuNTc2OTIxMywyMC4xMTgwNDc5IiBpZD0iT3ZhbC0xIi8+PC9nPjwvZz48L3N2Zz4="><img class="form__icon" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI1MHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iVHdpdHRlciI+PHBhdGggZD0iTTI1LDUwIEMzOC44MDcxMTk0LDUwIDUwLDM4LjgwNzExOTQgNTAsMjUgQzUwLDExLjE5Mjg4MDYgMzguODA3MTE5NCwwIDI1LDAgQzExLjE5Mjg4MDYsMCAwLDExLjE5Mjg4MDYgMCwyNSBDMCwzOC44MDcxMTk0IDExLjE5Mjg4MDYsNTAgMjUsNTAgWiBNMjUsNDcgQzM3LjE1MDI2NTEsNDcgNDcsMzcuMTUwMjY1MSA0NywyNSBDNDcsMTIuODQ5NzM0OSAzNy4xNTAyNjUxLDMgMjUsMyBDMTIuODQ5NzM0OSwzIDMsMTIuODQ5NzM0OSAzLDI1IEMzLDM3LjE1MDI2NTEgMTIuODQ5NzM0OSw0NyAyNSw0NyBaIE0yNC42ODIyNTU0LDIwLjU1NDI5NzUgTDI0LjcyOTk0NCwyMS4zNzYxMDExIEwyMy45MzUxMzMzLDIxLjI3NTQ3MjEgQzIxLjA0MjAyMjUsMjAuODg5NzI3NSAxOC41MTQ1MjQ2LDE5LjU4MTU1MDQgMTYuMzY4NTM1OCwxNy4zODQ0ODM3IEwxNS4zMTkzODU3LDE2LjI5NDMzNjEgTDE1LjA0OTE1MDEsMTcuMDk5MzY4MSBDMTQuNDc2ODg2NCwxOC44OTM5MTg4IDE0Ljg0MjQ5OTMsMjAuNzg5MDk4NSAxNi4wMzQ3MTUzLDIyLjA2MzczMjYgQzE2LjY3MDU2MzgsMjIuNzY4MTM1NyAxNi41Mjc0OTc5LDIyLjg2ODc2NDcgMTUuNDMwNjU5MiwyMi40NDk0NzcyIEMxNS4wNDkxNTAxLDIyLjMxNTMwNTEgMTQuNzE1MzI5NiwyMi4yMTQ2NzYxIDE0LjY4MzUzNzEsMjIuMjY0OTkwNyBDMTQuNTcyMjYzNywyMi4zODIzOTEyIDE0Ljk1Mzc3MjgsMjMuOTA4NTk3OCAxNS4yNTU4MDA4LDI0LjUxMjM3MTkgQzE1LjY2OTEwMjQsMjUuMzUwOTQ3IDE2LjUxMTYwMTcsMjYuMTcyNzUwNSAxNy40MzM1ODIsMjYuNjU5MTI0MSBMMTguMjEyNDk2NSwyNy4wNDQ4Njg2IEwxNy4yOTA1MTYxLDI3LjA2MTY0MDEgQzE2LjQwMDMyODIsMjcuMDYxNjQwMSAxNi4zNjg1MzU4LDI3LjA3ODQxMTYgMTYuNDYzOTEzMSwyNy40MzA2MTMxIEMxNi43ODE4Mzc0LDI4LjUyMDc2MDggMTguMDM3NjM4MiwyOS42Nzc5OTQ0IDE5LjQzNjUwNSwzMC4xODExMzk0IEwyMC40MjIwNzAxLDMwLjUzMzM0MSBMMTkuNTYzNjc0NiwzMS4wNzAwMjkgQzE4LjI5MTk3NzYsMzEuODQxNTE4MSAxNi43OTc3MzM1LDMyLjI3NzU3NzIgMTUuMzAzNDg5NSwzMi4zMTExMjAyIEMxNC41ODgxNTk5LDMyLjMyNzg5MTYgMTQsMzIuMzk0OTc3NiAxNCwzMi40NDUyOTIyIEMxNCwzMi42MTMwMDcxIDE1LjkzOTMzOCwzMy41NTIyMTEzIDE3LjA2Nzk2OTIsMzMuOTIxMTg0MyBDMjAuNDUzODYyNiwzNS4wMTEzMzE5IDI0LjQ3NTYwNDYsMzQuNTQxNzI5OCAyNy40OTU4ODUxLDMyLjY4MDA5MzIgQzI5LjY0MTg3MzksMzEuMzU1MTQ0NSAzMS43ODc4NjI4LDI4LjcyMjAxODggMzIuNzg5MzI0MiwyNi4xNzI3NTA1IEMzMy4zMjk3OTU0LDI0LjgxNDI1ODkgMzMuODcwMjY2NywyMi4zMzIwNzY3IDMzLjg3MDI2NjcsMjEuMTQxMyBDMzMuODcwMjY2NywyMC4zNjk4MTEgMzMuOTE3OTU1MywyMC4yNjkxODIgMzQuODA4MTQzMiwxOS4zNDY3NDk0IEMzNS4zMzI3MTgzLDE4LjgxMDA2MTMgMzUuODI1NTAwOSwxOC4yMjMwNTg4IDM1LjkyMDg3ODIsMTguMDU1MzQzNyBDMzYuMDc5ODQwMywxNy43MzY2ODUyIDM2LjA2Mzk0NDIsMTcuNzM2Njg1MiAzNS4yNTMyMzczLDE4LjAyMTgwMDcgQzMzLjkwMjA1OTEsMTguNTI0OTQ1OCAzMy43MTEzMDQ1LDE4LjQ1Nzg1OTggMzQuMzc4OTQ1NSwxNy43MDMxNDIyIEMzNC44NzE3MjgxLDE3LjE2NjQ1NDEgMzUuNDU5ODg4LDE2LjE5MzcwNzEgMzUuNDU5ODg4LDE1LjkwODU5MTUgQzM1LjQ1OTg4OCwxNS44NTgyNzcgMzUuMjIxNDQ0OCwxNS45NDIxMzQ2IDM0Ljk1MTIwOTIsMTYuMDkzMDc4IEMzNC42NjUwNzczLDE2LjI2MDc5MzEgMzQuMDI5MjI4OCwxNi41MTIzNjU2IDMzLjU1MjM0MjQsMTYuNjYzMzA5MSBMMzIuNjkzOTQ2OSwxNi45NDg0MjQ2IEwzMS45MTUwMzI0LDE2LjM5NDk2NSBDMzEuNDg1ODM0NiwxNi4wOTMwNzggMzAuODgxNzc4NiwxNS43NTc2NDggMzAuNTYzODU0MywxNS42NTcwMTkgQzI5Ljc1MzE0NzQsMTUuNDIyMjE4IDI4LjUxMzI0MjgsMTUuNDU1NzYxIDI3Ljc4MjAxNjksMTUuNzI0MTA1IEMyNS43OTQ5OTAzLDE2LjQ3ODgyMjYgMjQuNTM5MTg5NCwxOC40MjQzMTY4IDI0LjY4MjI1NTQsMjAuNTU0Mjk3NSBDMjQuNjgyMjU1NCwyMC41NTQyOTc1IDI0LjUzOTE4OTQsMTguNDI0MzE2OCAyNC42ODIyNTU0LDIwLjU1NDI5NzUgWiBNMjQuNjgyMjU1NCwyMC41NTQyOTc1IiBpZD0iT3ZhbC0xIi8+PC9nPjwvZz48L3N2Zz4="></div><span class="form__span">or use your email account</span><input class="form__input" type="text" placeholder="Email"><input class="form__input" type="password" placeholder="Password"><a class="form__link">Forgot your password?</a><button class="form__button button submit">SIGN IN</button>-->
    <!--      </form>-->
    <!--    </div>-->

    <!--    </div>-->
  </div>

  </body>
</template>

<script>

let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");
let getButtons = e => e.preventDefault();
let changeForm = e => {
  switchCtn.classList.add("is-gx");
  setTimeout(function () {
    switchCtn.classList.remove("is-gx");
  }, 1500);
  switchCtn.classList.toggle("is-txr");
  switchCircle[0].classList.toggle("is-txr");
  switchCircle[1].classList.toggle("is-txr");
  switchC1.classList.toggle("is-hidden");
  switchC2.classList.toggle("is-hidden");
  aContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-z200");
};
let mainF = e => {
  for (var i = 0; i < allButtons.length; i++) allButtons[i].addEventListener("click", getButtons);
  for (var j = 0; j < switchBtn.length; j++) switchBtn[j].addEventListener("click", changeForm);
};
window.addEventListener("load", mainF);
</script>

<style lang="scss" scoped>
$bg: #EDF2F0;

$neu-1: #ecf0f3;
$neu-2: #d1d9e6;

$white: #f9f9f9;
$gray: #a0a5a8;
$black: #181818;

$purple: #4B70E2;


$transition: 1.25s;

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

/* Generic */
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  background-color: $neu-1;
  color: $gray;
}

/**/
.main {
  position: relative;
  width: 100%;
  min-width: 1000px;
  min-height: 600px;
  height: 100%;
  padding: 25px;
  background-color: $neu-1;
  box-shadow: 10px 10px 10px $neu-2,
  -10px -10px 10px $white;
  border-radius: 12px;
  overflow: hidden;
  @media(max-width: 1200px) {
    transform: scale(.7);
  }
  @media(max-width: 1000px) {
    transform: scale(.6);
  }
  @media(max-width: 800px) {
    transform: scale(.5);
  }
  @media(max-width: 600px) {
    transform: scale(.4);
  }


}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;

  background-color: $neu-1;
  transition: $transition;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__icon {
    object-fit: contain;
    width: 30px;
    margin: 0 5px;
    opacity: .5;
    transition: .15s;

    &:hover {
      opacity: 1;
      transition: .15s;
      cursor: pointer;

    }
  }

  &__input {
    width: 350px;
    height: 40px;
    margin: 4px 0;

    padding-left: 25px;
    font-size: 13px;
    letter-spacing: .15px;
    border: none;
    outline: none;

    font-family: 'Montserrat', sans-serif;
    background-color: $neu-1;
    transition: .25s ease;
    border-radius: 8px;

    box-shadow: inset 2px 2px 4px $neu-2,
    inset -2px -2px 4px $white;

    &:focus {
      box-shadow: inset 4px 4px 4px $neu-2,
      inset -4px -4px 4px $white;
    }
  }

  &__span {
    margin-top: 30px;
    margin-bottom: 12px;
  }

  &__link {
    color: $black;
    font-size: 15px;
    margin-top: 25px;
    border-bottom: 1px solid $gray;
    line-height: 2;
  }
}

.title {
  font-size: 34px;
  font-weight: 700;
  line-height: 3;
  color: $black;
}

.description {
  font-size: 14px;
  letter-spacing: .25px;
  text-align: center;
  line-height: 1.6;
}

.button {
  width: 180px;
  height: 50px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;

  background-color: $purple;
  color: $white;
  box-shadow: 8px 8px 16px $neu-2,
  -8px -8px 16px $white;

  border: none;
  outline: none;
}

/**/

.a-container {
  z-index: 100;
  left: calc(100% - 600px);
}

.b-container {
  left: calc(100% - 600px);
  z-index: 0;
}

.switch {
  background-image: url("~@/assets/bgr_mainPage.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  padding: 50px;
  z-index: 200;
  transition: $transition;

  background-color: $neu-1;
  overflow: hidden;


  box-shadow: 4px 4px 10px $neu-2,
  -4px -4px 10px $white;

  &__circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: $neu-1;
    box-shadow: inset 8px 8px 12px $neu-2,
    inset -8px -8px 12px $white;
    //background: #3ea0eb;
    bottom: -35%;
    right: -10%;
    transition: $transition;

    &--t {
      top: -35%;
      left: -15%;
      width: 600px;
      height: 450px;
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;

    transition: $transition;

  }

  &__button {
    cursor: pointer;

    &:hover {
      box-shadow: 6px 6px 10px $neu-2,
      -6px -6px 10px $white;
      transform: scale(.985);
      transition: .25s;
    }

    &:active,
    &:focus {
      box-shadow: 2px 2px 6px $neu-2,
      -2px -2px 6px $white;
      transform: scale(.97);
      transition: .25s;
    }
  }
}

/**/
.is-txr {
  left: calc(100% - 400px);
  transition: $transition;
  transform-origin: left;
}

.is-txl {
  left: 0;
  transition: $transition;
  transform-origin: right;
}

.is-z200 {
  z-index: 200;
  transition: $transition;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: $transition;
}

.is-gx {
  animation: is-gx $transition;
}

@keyframes is-gx {
  0%, 10%, 100% {
    width: 400px;
  }
  30%, 50% {
    width: 500px;
  }
}

</style>

<style lang="scss" scoped>
$hexagon-width: 250px;
$hexagon-height: $hexagon-width*.55;
$hexagon-margin: 25px;
$hexagon-title-color: #fff;
$hexagon-border-color: #fff;
$hexagon-border-color--hover: #72f88e;
$hexagon-image-color: #3ea0eb;
$honeycomb-max-width: 1200px;
$viewport-thereshold: $hexagon-width + $hexagon-margin;

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

body {
  font-family: 'Montserrat', sans-serif;
  //background: #3ea0eb;
}

*, *::before, *::after {
  box-sizing: border-box;
}

.honeycomb {
  width: 35%;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: right;
  align-items: inherit;
  max-width: $honeycomb-max-width;
  margin: 0 auto;
  padding: 0;
  margin-right: 50px;
  margin-bottom: 100px;
  transform: translateY(#{$hexagon-height/4});

  &-cell {
    flex: 0 1 $hexagon-width;
    max-width: $hexagon-width;
    height: $hexagon-height;
    margin: $hexagon-height/2.1 $hexagon-margin/2 $hexagon-margin;
    position: relative;
    padding: 0.5em;

    text-align: center;
    z-index: 1;


    &__title {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      hyphens: auto;
      word-break: break-word;
      text-transform: uppercase;
      color: #fff;
      font-weight: 900;
      font-size: 2.3em;
      transition: opacity 350ms;
      letter-spacing: 7px;

      > small {
        font-weight: 300;
        margin-top: 0.25em;
      }
    }

    &__image {
      object-fit: cover;
      object-position: center;
    }

    &::before, &::after {
      content: '';
    }

    &::before, &::after, &__image {
      top: -50%;
      left: 0;
      width: 100%;
      height: 200%;
      display: block;
      position: absolute;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      z-index: -1;
    }

    &::before {
      background: #47B5FF;
      transform: scale(1.055);
    }

    &::after {
      background: $hexagon-image-color;
      opacity: 0.5;
      transition: opacity 350ms;
    }

    &:hover {

      .honeycomb-cell__title {
        opacity: 0;
      }

      &::before {
        background: $hexagon-border-color--hover;
      }

      &::after {
        opacity: 0;
      }
    }
  }

  &__placeholder {
    display: none;
    opacity: 0;
    width: $hexagon-width;
    margin: 0 $hexagon-margin/2;
  }
}

@media (max-width: #{2*$viewport-thereshold}) {
  .honeycomb-cell {
    margin: #{$hexagon-margin/2 + $hexagon-height/2} $hexagon-margin;
  }
}

@media (min-width: #{2*$viewport-thereshold}) and (max-width: #{3*$viewport-thereshold}) {
  .honeycomb-cell:nth-child(3n) {
    margin-right: calc(50% - #{$hexagon-width/2});
    margin-left: calc(50% - #{$hexagon-width/2});
  }

  .honeycomb__placeholder:nth-child(3n + 5) {
    display: block;
  }
}

@media (min-width: #{3*$viewport-thereshold}) and (max-width: #{4*$viewport-thereshold}) {
  .honeycomb-cell:nth-child(5n + 4) {
    margin-left: calc(50% - #{$hexagon-width + $hexagon-margin});
  }

  .honeycomb-cell:nth-child(5n + 5) {
    margin-right: calc(50% - #{$hexagon-width + $hexagon-margin});
  }

  .honeycomb__placeholder:nth-child(5n), .honeycomb__placeholder:nth-child(5n + 3) {
    display: block;
  }
}

@media (min-width: #{4*$viewport-thereshold}) {
  .honeycomb-cell:nth-child(7n + 5) {
    margin-left: calc(50% - #{$hexagon-width*1.5 + $hexagon-margin});
  }

  .honeycomb-cell:nth-child(7n + 7), .honeycomb-cell:nth-child(7n + 5):nth-last-child(2) {
    margin-right: calc(50% - #{$hexagon-width*1.5 + $hexagon-margin});
  }

  .honeycomb__placeholder:nth-child(7n + 7), .honeycomb__placeholder:nth-child(7n + 9), .honeycomb__placeholder:nth-child(7n + 11) {
    display: block;
  }
}
</style>
