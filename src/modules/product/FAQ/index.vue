<template>
  <div class="container mx-auto">
    <div v-if="loading" style="width: 100%; z-index: 11; position: sticky; top: 50%;">
      <b-overlay :show="loading" opacity="0.9">
      </b-overlay>
    </div>
    <b-container fluid="100%" class="px-3 mt-2">
      <b-row>
        <b-col cols="12">
          <b-row>
            <b-col cols="12" class="mb-3">
              <div style="color: #2b675b;">
                <p style="font-weight: bold; font-size: 24px" class="mb-3">{{ $t('faq.sideNav') }}</p>
              </div>
            </b-col>

            <b-col cols="12" class="mb-3">
              <div class="d-flex justify-content-start align-items-center">
                <div
                    @click="activeQuestions = 'social'"
                    class="tabStyle"
                    :style="activeQuestions == 'social' ? `background-color:#2b675b; color: white`:`background-color:#eff2f7; color: #212529`"
                >
                  {{ $t('faq.social.tabTitle') }}</div>
                <div
                    @click="activeQuestions = 'reklama'"
                    class="tabStyle"
                    :style="activeQuestions == 'reklama' ? `background-color:#2b675b; color: white`:`background-color:#eff2f7; color: #212529`"
                >
                  {{ $t('faq.reklama.tabTitle') }}</div>
                <div
                    @click="activeQuestions = 'turizm'"
                    class="tabStyle"
                    :style="activeQuestions == 'turizm' ? `background-color:#2b675b; color: white`:`background-color:#eff2f7; color: #212529`"
                >
                  {{ $t('faq.turizm.tabTitle') }}</div>
                <div
                    @click="activeQuestions = 'house'"
                    class="tabStyle"
                    :style="activeQuestions == 'house' ? `background-color:#2b675b; color: white`:`background-color:#eff2f7; color: #212529`"
                >
                  {{ $t('faq.house.tabTitle') }}</div>
              </div>
            </b-col>
            <b-col cols="12" v-if="activeQuestions == 'social'">
              <b-row>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-1 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz1') }}
                  </b-button>
                  <b-collapse id="collapse-1" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans11') }} <br>

                        {{ $t('faq.social.ans12') }}<br>

                        {{ $t('faq.social.ans13') }}<br>

                        {{ $t('faq.social.ans14') }}<br>

                        {{ $t('faq.social.ans15') }}<br>

                        {{ $t('faq.social.ans16') }}<br>

                        {{ $t('faq.social.ans17') }}<br>

                        {{ $t('faq.social.ans18') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-2 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz2') }}
                    </b-button>
                  <b-collapse id="collapse-2" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans21') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-3 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz3') }}
                   </b-button>
                  <b-collapse id="collapse-3" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans31') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-4 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz4') }}
                  </b-button>
                  <b-collapse id="collapse-4" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans41') }}
                        <br>
                        {{ $t('faq.social.ans42') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-5 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz5') }}
                  </b-button>
                  <b-collapse id="collapse-5" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans51') }}
                        <br>
                        {{ $t('faq.social.ans52') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-6 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz6') }}
                  </b-button>
                  <b-collapse id="collapse-6" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans61') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-7 variant="light" class="quesBtn">
                    {{ $t('faq.social.quiz7') }}
                  </b-button>
                  <b-collapse id="collapse-7" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.social.ans71') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" v-if="activeQuestions == 'reklama'">
              <b-row>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-8 variant="light" class="quesBtn">
                    {{ $t('faq.reklama.quiz1') }}
                  </b-button>
                  <b-collapse id="collapse-8" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.reklama.ans11') }}<br>

                        {{ $t('faq.reklama.ans12') }}<br>

                        {{ $t('faq.reklama.ans13') }}<br>
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-9 variant="light" class="quesBtn">
                    {{ $t('faq.reklama.quiz2') }}
                  </b-button>
                  <b-collapse id="collapse-9" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.reklama.ans21') }}<br>
                        {{ $t('faq.reklama.ans22') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-10 variant="light" class="quesBtn">
                    {{ $t('faq.reklama.quiz3') }}
                  </b-button>
                  <b-collapse id="collapse-10" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.reklama.ans31') }}<br>
                        {{ $t('faq.reklama.ans32') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-11 variant="light" class="quesBtn">
                    {{ $t('faq.reklama.quiz4') }}
                  </b-button>
                  <b-collapse id="collapse-11" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.reklama.ans41') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-12 variant="light" class="quesBtn">
                    {{ $t('faq.reklama.quiz5') }}
                  </b-button>
                  <b-collapse id="collapse-12" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.reklama.ans51') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-13 variant="light" class="quesBtn">
                    {{ $t('faq.reklama.quiz6') }}
                  </b-button>
                  <b-collapse id="collapse-13" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.reklama.ans61') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" v-if="activeQuestions == 'turizm'">
              <b-row>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-14 variant="light" class="quesBtn">
                    {{ $t('faq.turizm.quiz1') }}
                  </b-button>
                  <b-collapse id="collapse-14" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.turizm.ans11') }}<br>
                        {{ $t('faq.turizm.ans12') }}<br>
                        {{ $t('faq.turizm.ans13') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-15 variant="light" class="quesBtn">
                    {{ $t('faq.turizm.quiz2') }}
                  </b-button>
                  <b-collapse id="collapse-15" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.turizm.ans21') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-19 variant="light" class="quesBtn">
                    {{ $t('faq.turizm.quiz3') }}
                  </b-button>
                  <b-collapse id="collapse-19" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.turizm.ans31') }}<br>
                        {{ $t('faq.turizm.ans32') }}<br>
                        {{ $t('faq.turizm.ans33') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-16 variant="light" class="quesBtn">
                    {{ $t('faq.turizm.quiz4') }}
                  </b-button>
                  <b-collapse id="collapse-16" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.turizm.ans41') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-17 variant="light" class="quesBtn">
                    {{ $t('faq.turizm.quiz5') }}
                  </b-button>
                  <b-collapse id="collapse-17" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.turizm.ans51') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-18 variant="light" class="quesBtn">
                    {{ $t('faq.turizm.quiz6') }}
                  </b-button>
                  <b-collapse id="collapse-18" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.turizm.ans61') }}<br>
                        {{ $t('faq.turizm.ans62') }}<br>
                        {{ $t('faq.turizm.ans63') }}<br>
                        {{ $t('faq.turizm.ans64') }}<br>
                        {{ $t('faq.turizm.ans65') }}<br>
                        {{ $t('faq.turizm.ans66') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" v-if="activeQuestions == 'house'">
              <b-row>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-20 variant="light" class="quesBtn">
                    {{ $t('faq.house.quiz1') }}
                  </b-button>
                  <b-collapse id="collapse-20" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.house.ans11') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-21 variant="light" class="quesBtn">
                    {{ $t('faq.house.quiz2') }}
                  </b-button>
                  <b-collapse id="collapse-21" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.house.ans21') }}
                        </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-22 variant="light" class="quesBtn">
                    {{ $t('faq.house.quiz3') }}
                  </b-button>
                  <b-collapse id="collapse-22" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.house.ans31') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-23 variant="light" class="quesBtn">
                    {{ $t('faq.house.quiz4') }}
                  </b-button>
                  <b-collapse id="collapse-23" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.house.ans41') }}<br>
                        {{ $t('faq.house.ans42') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-24 variant="light" class="quesBtn">
                    {{ $t('faq.house.quiz5') }}
                  </b-button>
                  <b-collapse id="collapse-24" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.house.ans51') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
                <b-col cols="12" class="mb-1">
                  <b-button v-b-toggle.collapse-25 variant="light" class="quesBtn">
                    {{ $t('faq.house.quiz6') }}
                  </b-button>
                  <b-collapse id="collapse-25" class="mt-1">
                    <b-card>
                      <p class="card-text px-4 py-4">
                        {{ $t('faq.house.ans61') }}
                      </p>
                    </b-card>
                  </b-collapse>
                </b-col>
              </b-row>
            </b-col>

          </b-row>
        </b-col>
      </b-row>
      <b-col class="ml-0 mt-3">
        <b-button style="background: #F39138; width: 75px; height: 36px; border: none" size="md" @click="$router.go(-1)">
          {{ $t("actions.back") }}
        </b-button>
      </b-col>
    </b-container>

  </div>
</template>

<script>
export default {
  name: "Main",


  data() {
    return {
      activeQuestions: 'social',
    }
  }
}
</script>
<script setup>
import BaseSelectWithValidation from "@/components/base/BaseSelectWithValidation.vue";
</script>
<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.tabStyle{
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 3px;
}
.quesBtn{
  width: 100%;
  text-align: start;
  border: none;
  padding:15px 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown-content li {
  padding: 10px;
}
.dropdown:hover .dropdown-content {
  display: block;
}

.sumStyle{
  font-size: 8px;
}
.siteColor{
  color: #2b675b;
  font-weight: bold;
}
::v-deep .base-form-component__label{
  color: #2b675b;
  margin-bottom: 10px;
  font-size: 14px;
}

::v-deep .custom-select.is-valid{
  background:url("../../../assets/down.png") no-repeat 99% 50%;
}

::v-deep .custom-select{
  width: 90%;
  border: 1px solid #2b675b;
}

::v-deep .custom-select option{
  color: #2b675b;
  font-size: 14px;
}
::v-deep .custom-select option:hover{
  background-color: #2b675b !important;
  color: white;

}
::v-deep .VueCarousel-navigation-button::before {
  content: "";
  position: absolute;
  top: 0px;
  height: 35px;
  width: 35px;
}

::v-deep .VueCarousel-navigation-next::before {
  background-color: #FFFFFF;
  background-image: url('../../../assets/next.png');
  background-size: contain;
  background-repeat: no-repeat;
  top: -10px;
  right: -4px;
}

::v-deep .VueCarousel-navigation-prev::before {
  background-color: #FFFFFF;
  background-image: url('../../../assets/prev.png');
  background-size: contain;
  background-repeat: no-repeat;
  top: -10px;
  left: -4px;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}

/* === util styles === */
.v-hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}
/* === aside styles === */
.aside {
  display: flex;
  width: 100%;
}

/* === list styles === */
.list {
  width: 90%;
  padding-left: 0px;
  font-size: 15px;
  color: #111;

  &-item {
    width: 100%;
    cursor: pointer;
    border: 1px solid #2b675b;
    border-radius: 5px;
    padding:0px 8px;

    &:first-child {
    }
    &:last-child {
      border-bottom: 1px solid #2b675b;
    }
  }
}

/* === drop styles === */
.drop {

  padding: 6px 0;
  line-height: 1.5;
  white-space: nowrap;
  transition: color 0.2s;


  &:hover {
    font-weight: bold;
    color: black;
  }
  &.show::after {
    transform: rotate(180deg);
  }
  &list {
    font-size: 0.9em;
    width: 100%;
    /** max-height: 200px; **/
    transition: max-height 0.2s ease-out;
    overflow: hidden;

    li {
      padding: 5px 3px 5px 10px;
      transition: background-color 0.2s ease-out;
    }
    li:hover {

      /** background-color: rgba(43, 103, 91, 0.2);**/
    }
  }
}
/**::v-deep .VueCarousel-navigation .VueCarousel-navigation-button .VueCarousel-navigation-prev{
  background-color: red !important;
}**/
</style>