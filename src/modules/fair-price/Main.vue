<template>
  <div>
    <div>
      <b-modal
          id="addFiles"
          v-model="informationModal"
          centered
          size="lg"
          :title="$t('actions.product_info')"
      >
        <b-col cols="12">
          <b-row>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('actions.product_type') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <span v-if="infoModalValue == 'max'">
                    <span>{{ returnSearch?.all?.maxMarket?.priceProductDto?.code == 'FOODS' ? $t('productPrice.customProduct') : $t('productPrice.otherProduct') }}</span>
                  </span>
                  <span v-if="infoModalValue == 'min'">
                    <span>{{ returnSearch?.all?.minMarket?.priceProductDto?.code == 'FOODS' ? $t('productPrice.customProduct') : $t('productPrice.otherProduct') }}</span>
                  </span>
                </b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('product_info.name') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <span v-if="infoModalValue == 'max'">
                      {{
                      getName({
                        nameLt: returnSearch?.all?.maxMarket?.priceProductDto?.nameLt ? returnSearch?.all?.maxMarket?.priceProductDto?.nameLt : '',
                        nameUz: returnSearch?.all?.maxMarket?.priceProductDto?.nameUz ? returnSearch?.all?.maxMarket?.priceProductDto?.nameUz : '',
                        nameRu: returnSearch?.all?.maxMarket?.priceProductDto?.nameRU ? returnSearch?.all?.maxMarket?.priceProductDto?.nameRU : '',
                      })
                    }}
                  </span>
                  <span v-if="infoModalValue == 'min'">
                       {{
                      getName({
                        nameLt: returnSearch?.all?.minMarket?.priceProductDto?.nameLt ? returnSearch?.all?.minMarket?.priceProductDto?.nameLt : '',
                        nameUz: returnSearch?.all?.minMarket?.priceProductDto?.nameUz ? returnSearch?.all?.minMarket?.priceProductDto?.nameUz : '',
                        nameRu: returnSearch?.all?.minMarket?.priceProductDto?.nameRu ? returnSearch?.all?.minMarket?.priceProductDto?.nameRu : '',
                      })
                    }}
                  </span></b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('actions.product_price') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <span v-if="infoModalValue == 'max'">{{ returnSearch?.all?.maxMarket?.maxPrice ? formatNumber(returnSearch?.all?.maxMarket?.maxPrice) : '' }} {{ $t('productPrice.som') }}</span>
                  <span v-if="infoModalValue == 'min'">{{ returnSearch?.all?.minMarket?.minPrice ? formatNumber(returnSearch?.all?.minMarket?.minPrice) : '' }} {{ $t('productPrice.som') }}</span>

                </b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('activity.rateInfo.monopoly.foods.lastDate1') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <span v-if="infoModalValue == 'max'">{{ returnSearch?.all?.maxMarket?.date ? returnSearch?.all?.maxMarket?.date : '' }}</span>
                  <span v-if="infoModalValue == 'min'">{{ returnSearch?.all?.minMarket?.date ? returnSearch?.all?.minMarket?.date : '' }}</span>
                </b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('activity.rateInfo.control.placeName') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                   <span v-if="infoModalValue == 'max'">
                    {{
                       getName({
                         nameLt: returnSearch?.all?.maxMarket?.marketDto?.regionDto?.nameLt ? returnSearch?.all?.maxMarket?.marketDto?.regionDto?.nameLt : '',
                         nameUz: returnSearch?.all?.maxMarket?.marketDto?.regionDto?.nameUz ? returnSearch?.all?.maxMarket?.marketDto?.regionDto?.nameUz : '',
                         nameRu: returnSearch?.all?.maxMarket?.marketDto?.regionDto?.nameRU ? returnSearch?.all?.maxMarket?.priceProductDto?.nameRU : '',
                       })
                     }}
                  </span>
                  <span v-if="infoModalValue == 'min'">
                       {{
                      getName({
                        nameLt: returnSearch?.all?.minMarket?.marketDto?.regionDto?.nameLt ? returnSearch?.all?.minMarket?.marketDto?.regionDto?.nameLt : '',
                        nameUz: returnSearch?.all?.minMarket?.marketDto?.regionDto?.nameUz ? returnSearch?.all?.minMarket?.marketDto?.regionDto?.nameUz : '',
                        nameRu: returnSearch?.all?.minMarket?.marketDto?.regionDto?.nameRu ? returnSearch?.all?.minMarket?.marketDto?.regionDto?.nameRu : '',
                      })
                    }}
                  </span>
                </b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('column.savdoObj') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <span v-if="infoModalValue == 'max'">{{ returnSearch?.all?.maxMarket?.marketDto?.marketName ? returnSearch?.all?.maxMarket?.marketDto?.marketName : '' }}</span>
                  <span v-if="infoModalValue == 'min'">{{ returnSearch?.all?.minMarket?.marketDto?.marketName ? returnSearch?.all?.minMarket?.marketDto?.marketName : '' }}</span>
                </b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('actions.market_place') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <span v-if="infoModalValue == 'max'">{{ returnSearch?.all?.maxMarket?.marketDto?.address ? returnSearch?.all?.maxMarket?.marketDto?.address : '' }}</span>
                  <span v-if="infoModalValue == 'min'">{{ returnSearch?.all?.minMarket?.marketDto?.address ? returnSearch?.all?.minMarket?.marketDto?.address : '' }}</span>
                </b></p>
              </div>
            </b-col>
            <b-col cols="12" md="4" class="px-3 mb-4">
              <div>
                <p class="mb-0" style="color:#839690; font-size: 14px;">{{ $t('actions.market_location') }}</p>
                <p class="mb-0"><b class="detailText" style="color: #246256">
                  <div class="d-flex justify-content-start align-items-center">
                    <div style="width:70%;" v-if="infoModalValue == 'max' && (returnSearch?.all?.maxMarket?.marketDto?.lang || returnSearch?.all?.maxMarket?.marketDto?.link)">
                      <p style="color: #2b675b; font-weight: bold; text-align: center; font-size: 13px; border: 2px solid #2b675b; padding: 5px; border-radius: 5px">
                        <span v-if="infoModalValue == 'max'">
                          {{ returnSearch?.all?.maxMarket?.marketDto?.lang ? returnSearch?.all?.maxMarket?.marketDto?.lang + ' , ' + returnSearch?.all?.maxMarket?.marketDto?.lat:
                            returnSearch?.all?.maxMarket?.marketDto?.link ? (returnSearch?.all?.maxMarket?.marketDto?.link.slice(0, 17)) + '...' : '' }}
                        </span>
                      </p>
                    </div>
                    <div style="width:70%;" v-if="infoModalValue == 'min' && (returnSearch?.all?.minMarket?.marketDto?.lang || returnSearch?.all?.minMarket?.marketDto?.link)">
                      <p style="color: #2b675b; font-weight: bold; text-align: center; font-size: 13px; border: 2px solid #2b675b; padding: 5px; border-radius: 5px">
                        <span v-if="infoModalValue == 'min'">
                          {{ returnSearch?.all?.minMarket?.marketDto?.lang ? returnSearch?.all?.minMarket?.marketDto?.lang + ' , ' + returnSearch?.all?.minMarket?.marketDto?.lat  :
                            returnSearch?.all?.minMarket?.marketDto?.link ? (returnSearch?.all?.minMarket?.marketDto?.link.slice(0, 17)) + '...' : '' }}
                        </span>
                      </p>
                    </div>
                    <div v-if="infoModalValue == 'max' && (returnSearch?.all?.maxMarket?.marketDto?.lat || returnSearch?.all?.maxMarket?.marketDto?.link)" class="px-2">
                      <a v-if="returnSearch?.all?.maxMarket?.marketDto?.lat" :href="`https://maps.google.com/maps?q=${returnSearch?.all?.maxMarket?.marketDto?.lat},${returnSearch?.all?.maxMarket?.marketDto?.lang}&ll=${returnSearch?.all?.maxMarket?.marketDto?.lat},${returnSearch?.all?.maxMarket?.marketDto?.lang}&z=16`" target="_blank">
                        <img src="@/assets/link.png" alt="">
                      </a>
                      <a v-else-if="returnSearch?.all?.maxMarket?.marketDto?.link" :href="returnSearch?.all?.maxMarket?.marketDto?.link" target="_blank">
                        <img src="@/assets/link.png" alt="">
                      </a>
                      <a v-else href="#"><img src="@/assets/link.png" alt=""></a>
                    </div>
                    <div v-if="infoModalValue == 'max' && (returnSearch?.all?.maxMarket?.marketDto?.lat || returnSearch?.all?.maxMarket?.marketDto?.link)">
                      <label class="dropdown">

                        <div class="dd-button">
                          <img src="@/assets/share.png" alt="">
                        </div>

                        <input type="checkbox" class="dd-input" id="test">

                        <ul class="dd-menu">
                          <li v-if="returnSearch?.all?.maxMarket?.marketDto?.lat" @click="sendToTelegramLatLang(returnSearch?.all?.maxMarket?.marketDto?.lat, returnSearch?.all?.maxMarket?.marketDto?.lat)">
                            <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                          </li>
                          <li v-else @click="sendToTelegramLink(returnSearch?.all?.maxMarket?.marketDto?.link)">
                            <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                          </li>


                          <li v-if="returnSearch?.all?.maxMarket?.marketDto?.lat" @click="copyLatLangLink(returnSearch?.all?.maxMarket?.marketDto?.lat, returnSearch?.all?.maxMarket?.marketDto?.lang)">
                            <i class="mdi mdi-content-copy"></i> Nusxalash
                          </li>
                          <li v-else  @click="copyLink(returnSearch?.all?.maxMarket?.marketDto?.link)">
                            <i class="mdi mdi-content-copy"></i> Nusxalash
                          </li>
                        </ul>

                      </label>
                    </div>

                    <div v-if="infoModalValue == 'min' && (returnSearch?.all?.minMarket?.marketDto?.lat || returnSearch?.all?.minMarket?.marketDto?.link)" class="px-2">
                      <a v-if="returnSearch?.all?.minMarket?.marketDto?.lat" :href="`https://maps.google.com/maps?q=${returnSearch?.all?.minMarket?.marketDto?.lat},${returnSearch?.all?.minMarket?.marketDto?.lang}&ll=${returnSearch?.all?.minMarket?.marketDto?.lat},${returnSearch?.all?.minMarket?.marketDto?.lang}&z=16`" target="_blank">
                        <img src="@/assets/link.png" alt="">
                      </a>
                      <a v-else-if="returnSearch?.all?.minMarket?.marketDto?.link" :href="returnSearch?.all?.minMarket?.marketDto?.link" target="_blank">
                        <img src="@/assets/link.png" alt="">
                      </a>
                      <a v-else href="#"><img src="@/assets/link.png" alt=""></a>
                    </div>
                    <div v-if="infoModalValue == 'min' && (returnSearch?.all?.minMarket?.marketDto?.lat || returnSearch?.all?.minMarket?.marketDto?.link)">
                      <label class="dropdown">

                        <div class="dd-button">
                          <img src="@/assets/share.png" alt="">
                        </div>

                        <input type="checkbox" class="dd-input" id="test">

                        <ul class="dd-menu">
                          <li v-if="returnSearch?.all?.minMarket?.marketDto?.lat" @click="sendToTelegramLatLang(returnSearch?.all?.minMarket?.marketDto?.lat, returnSearch?.all?.minMarket?.marketDto?.lang)">
                            <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                          </li>
                          <li v-else @click="sendToTelegramLink(returnSearch?.all?.minMarket?.marketDto?.link)">
                            <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                          </li>


                          <li v-if="returnSearch?.all?.minMarket?.marketDto?.lat" @click="copyLatLangLink(returnSearch?.all?.minMarket?.marketDto?.lat, returnSearch?.all?.minMarket?.marketDto?.lang)">
                            <i class="mdi mdi-content-copy"></i> Nusxalash
                          </li>
                          <li v-else  @click="copyLink(returnSearch?.all?.minMarket?.marketDto?.link)">
                            <i class="mdi mdi-content-copy"></i> Nusxalash
                          </li>
                        </ul>

                      </label>
                    </div>
                  </div>
                </b></p>
              </div>
            </b-col>

          </b-row>
        </b-col>

        <template v-slot:modal-footer>
          <b-button
              style="background-color:#2b675b; color:white; padding:3px 25px; border:none; font-size: 14px;"
              @click="informationModal = false"> OK </b-button>

        </template>
      </b-modal>
    </div>
    <div v-if="loading" style="width: 100%; z-index: 11; position: sticky; top: 50%;">
      <b-overlay :show="loading" opacity="0.9">
      </b-overlay>
    </div>
    <b-container v-show="!allInformation" fluid="100%" class="px-md-5 px-2 mt-5 mb-md-0 mb-4">
      <b-row>
<!--        <b-col cols="12" class="mb-2 mt-3">-->
<!--          <b-button style="background: #F39138" class="btn btn-warning px-3 py-1" size="md" @click="$router.go(-1)">-->
<!--            {{ $t("actions.back") }}-->
<!--          </b-button>-->
<!--        </b-col>-->
        <b-col cols="12">
          <b-row>
            <b-col cols="3" lg="1" class="text-center">
              <img style="width: 100%; max-width: 80px;" src="../../assets/fairPrice1.png" alt="">
            </b-col>
            <b-col cols="9" lg="1" class="d-lg-none d-flex justify-content-center align-items-center">
              <p style="font-weight: bold; font-size: 16px">{{ $t('productPrice.fairTech') }}</p>
            </b-col>
            <b-col cols="12" lg="11">
              <div style="color: #2b675b;">
                <p style="font-weight: bold; font-size: 16px" class="mb-1 d-lg-block d-none">{{ $t('productPrice.fairTech') }}</p>
                <div class="d-lg-flex d-block">
                  <div class="pr-lg-3">
                    <p class="mb-1" style="font-size: 13px;">
                      {{ $t('productPrice.text1') }}
                      <br>
                      {{ $t('productPrice.text2') }}
                      <br>
                      {{ $t('productPrice.text3') }}
                    </p>
                  </div>
                  <div class="pl-lg-3">
                    <p style="font-weight: bolder;" class="mb-1">{{ $t('productPrice.measure') }}</p>
                    <p class="mb-1">
                      {{ $t('productPrice.text4') }}
                      <br>
                      {{ $t('productPrice.text5') }}
                    </p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" class="d-flex justify-content-start my-lg-3 mb-4 mt-3 pl-0">
          <div>
            <b-btn
                @click="foodsPrice()"
                :style="tabProduct == 'customProduct' ? 'background-image: linear-gradient(to bottom, #246256, #1A8F79); color:white !important;' : 'background-color: white; color:#2b675b !important; border:1px solid #2b675b;'"
                style=" font-size: 15px; border-radius:5px; padding:3px 15px; margin-right:10px;">
              {{ $t('productPrice.customProduct') }}
            </b-btn>
          </div>
          <div>
            <b-btn
                @click="otherPrice()"
                :style="tabProduct == 'otherProduct' ? 'background-image: linear-gradient(to bottom, #246256, #1A8F79); color:white !important;' : 'background-color: white; color:#2b675b !important; border:1px solid #2b675b;'"
                style="font-size: 15px; border-radius:5px; padding:3px 20px; margin-left:10px;">
              {{ $t('productPrice.otherProduct') }}
            </b-btn>
          </div>
        </b-col>
        <b-col cols="12" class="d-lg-block d-none">
          <b-row class="d-flex justify-content-center">
            <b-col v-for="(item,index) in productData.slice(0, 8)" :key="index" class="mb-3">
              <div v-if="item.id != 56 && item.id != 57 && item.id != 58" @click="showDetailInfo(item.id)"
                   style="width: 100%; max-width: 170px; cursor: pointer; border: 1px solid rgb(43, 103, 91, 0.2); border-radius: 3px; box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px;">
                <div style="padding: 5px 5px 2px 5px; text-align: center;">
                  <img v-if="item.photoSvg && item.photoSvg.uploadPath" :src="`${routeName}/${item.photoSvg.uploadPath}`" style="width: 100%;max-width: 55px;" alt="">
                  <img v-else src="../../assets/default.svg" style="width: 100%;max-width: 55px;" alt="">
                </div>
                <div class="text-center" style="height: 30px; display:flex; justify-content: center; align-items: center; color:#2b675b">
                  <p style="font-weight: bold; font-size: 15px; line-height: 1;" class="mb-0">
                    {{
                      getName({
                        nameLt: item?.nameLt,
                        nameUz: item?.nameUz,
                        nameRu: item?.nameRu,
                      })
                    }}
                  </p>
                </div>
                <div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: start;">{{ $t('productPrice.minSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #247100; text-align: center">{{ formatNumber(item?.minSum ? item?.minSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: start;">{{ $t('productPrice.maxSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #AF0000; text-align: center">{{ formatNumber(item?.maxSum ? item?.maxSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px; border: 1px solid #246256; border-radius: 3px; margin: 4px 4px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: start;">{{ $t('productPrice.middleSum1') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #D4B513; text-align: center">{{ formatNumber(item?.middleSum ? item?.middleSum : '') }}</p>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col
                v-for="i in (tabProduct == 'otherProduct' && productData.length == 1 ) ? 7 :
                   (tabProduct == 'otherProduct' && productData.length == 2 ) ? 6 :
                    (tabProduct == 'otherProduct' && productData.length == 3 ) ? 5 :
                    (tabProduct == 'otherProduct' && productData.length == 4 ) ? 4 :
                    (tabProduct == 'otherProduct' && productData.length == 5 ) ? 3 :
                    (tabProduct == 'otherProduct' && productData.length == 6 ) ? 2 :
                     (tabProduct == 'otherProduct' && productData.length == 7 ) ? 1 : 0" :key="i" class="mb-3 text-center">
              <div style="width: 100%; max-width: 170px;">
              </div>
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-center">
            <b-col v-for="(item,index) in productData.slice(8, 16)" :key="index" class="mb-3">
              <div @click="showDetailInfo(item.id)" style="width: 100%; max-width: 170px; cursor: pointer; border: 1px solid rgb(43, 103, 91, 0.2); border-radius: 3px; box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px;">
                <div style="padding: 5px 5px 2px 5px; text-align: center;">
                  <img v-if="item.photoSvg && item.photoSvg.uploadPath" :src="`${routeName}/${item.photoSvg.uploadPath}`" style="width: 100%;max-width: 55px;" alt="">
                  <!--                    <img v-if="item.photoSvg" :src="item.photoSvg" style="width: 100%;max-width: 55px;" alt="">-->
                  <img v-else src="@/assets/default.svg" style="width: 100%;max-width: 55px;" alt="">
                </div>
                <div class="text-center" style="height: 30px; display:flex; justify-content: center; align-items: center; color:#2b675b">
                  <p style="font-weight: bold; font-size: 15px; line-height: 1;" class="mb-0">
                    {{
                      getName({
                        nameLt: item?.nameLt,
                        nameUz: item?.nameUz,
                        nameRu: item?.nameRu,
                      })
                    }}
                  </p>
                </div>
                <div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: center;">{{ $t('productPrice.minSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #247100; text-align: center">{{ formatNumber(item?.minSum ? item?.minSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: center;">{{ $t('productPrice.maxSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #AF0000; text-align: center">{{ formatNumber(item?.maxSum ? item?.maxSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px; border: 1px solid #246256; border-radius: 3px; margin: 4px 4px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: center;">{{ $t('productPrice.middleSum1') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #D4B513; text-align: center">{{ formatNumber(item?.middleSum ? item?.middleSum : '') }}</p>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col
                v-for="i in (tabProduct != 'otherProduct' && productData.length == 9 ) ? 7 :
                   (tabProduct != 'otherProduct' && productData.length == 10 ) ? 6 :
                    (tabProduct != 'otherProduct' && productData.length == 11 ) ? 5 :
                    (tabProduct != 'otherProduct' && productData.length == 12 ) ? 4 :
                    (tabProduct != 'otherProduct' && productData.length == 13 ) ? 3 :
                    (tabProduct != 'otherProduct' && productData.length == 14 ) ? 2 :
                     (tabProduct != 'otherProduct' && productData.length == 15 ) ? 1 : 0" :key="i" class="mb-3 text-center">
              <div style="width: 100%; max-width: 170px;">
              </div>
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-center">
            <b-col v-for="(item,index) in productData.slice(16)" :key="index" class="mb-3 text-center">
              <div @click="showDetailInfo(item.id)"
                   style="width: 100%; max-width: 170px; cursor: pointer; border: 1px solid rgb(43, 103, 91, 0.2); border-radius: 3px; box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px;">
                <div style="padding: 5px 5px 2px 5px; text-align: center;">
                  <img v-if="item.photoSvg && item.photoSvg.uploadPath" :src="`${routeName}/${item.photoSvg.uploadPath}`" style="width: 100%;max-width: 55px;" alt="">
                  <img v-else src="@/assets/default.svg" style="width: 100%;max-width: 55px;" alt="">
                </div>
                <div class="text-center" style="height: 30px; display:flex; justify-content: center; align-items: center; color:#2b675b">
                  <p style="font-weight: bold; font-size: 15px; line-height: 1;" class="mb-0">
                    {{
                      getName({
                        nameLt: item?.nameLt,
                        nameUz: item?.nameUz,
                        nameRu: item?.nameRu,
                      })
                    }}
                  </p>
                </div>
                <div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: center;">{{ $t('productPrice.minSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #247100; text-align: center">{{ formatNumber(item?.minSum ? item?.minSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: center;">{{ $t('productPrice.maxSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #AF0000; text-align: center">{{ formatNumber(item?.maxSum ? item?.maxSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px; border: 1px solid #246256; border-radius: 3px; margin: 4px 4px;">
                    <p class="mb-0" style="font-size: 12px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: center;">{{ $t('productPrice.middleSum1') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #D4B513; text-align: center">{{ formatNumber(item?.middleSum ? item?.middleSum : '') }}</p>
                  </div>
                </div>
              </div>

            </b-col>
            <b-col v-for="i in 4" :key="i" class="mb-3 text-center">
              <div style="width: 100%; max-width: 170px;">
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" class="d-lg-none d-block">
          <b-row class="d-flex justify-content-center">
            <b-col cols="12" v-for="(item,index) in productData" :key="index" class="mb-4 px-4">
              <div @click="showDetailInfo(item.id)" style="width: 100%;  cursor: pointer; border: 1px solid rgb(43, 103, 91, 0.2); border-radius: 5px;">
                <div style="padding: 5px 5px 2px 5px; text-align: center;">
                  <img v-if="item.photoSvg && item.photoSvg.uploadPath" :src="`${routeName}/${item.photoSvg.uploadPath}`" style="width: 100%; max-width: 80px;" alt="">
                  <img v-else src="../../assets/default.svg" style="width: 100%; max-width: 80px;" alt="">
                </div>
                <div class="text-center mb-2" style="height: 30px; display:flex; justify-content: center; align-items: center; color:#2b675b">
                  <p style="font-weight: bold; font-size: 20px; line-height: 1;" class="mb-0">
                    {{
                      getName({
                        nameLt: item?.nameLt,
                        nameUz: item?.nameUz,
                        nameRu: item?.nameRu,
                      })
                    }}
                  </p>
                </div>
                <div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px;">
                    <p class="mb-0" style="font-size: 16px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: start;">{{ $t('productPrice.minSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 20px; font-weight: bold; color: #247100; text-align: center">{{ formatNumber(item?.minSum ? item?.minSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center my-2" style="padding:0px;">
                    <p class="mb-0" style="font-size: 16px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: start;">{{ $t('productPrice.maxSum2') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 20px; font-weight: bold; color: #AF0000; text-align: center">{{ formatNumber(item?.maxSum ? item?.maxSum : '') }}</p>
                  </div>
                  <div class="d-flex justify-content-around align-items-center" style="padding:0px; border: 1px solid #246256; border-radius: 3px; margin: 8px 8px;">
                    <p class="mb-0" style="font-size: 16px; color: #246256; font-weight: lighter; line-height: 1.4; text-align: start;">{{ $t('productPrice.middleSum1') }} <br> {{ $t('productPrice.sum') }}</p>
                    <p class="mb-0" style="font-size: 20px; font-weight: bold; color: #D4B513; text-align: center">{{ formatNumber(item?.middleSum ? item?.middleSum : '') }}</p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" class="mb-2 mt-3">
          <b-button style="background: #f1b44c; padding: 5px 20px;" class="btn btn-warning" size="md" @click="$router.go(-1)">
            {{ $t("actions.back") }}
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-show="allInformation" fluid="100%" class="px-md-5 px-2 mt-5 mb-md-0 mb-4">
      <b-row v-if="detailInfo">
        <b-col cols="12">
          <div style="color: #2b675b; text-align: center;">
            <p v-if="tabProduct == 'customProduct'" style="font-weight: bold; font-size: 18px; text-transform: uppercase;">{{ $t('productPrice.customProduct') }}</p>
            <p v-else style="font-weight: bold; font-size: 18px; text-transform: uppercase;">{{ $t('productPrice.otherProduct') }}</p>
          </div>
        </b-col>
        <b-col cols="12" class="my-4 pl-0">
          <b-row class="d-flex justify-content-between align-items-start">
            <b-col cols="12" lg="4" class="px-3">
              <div>

                <div style="width:100%; max-width: 440px; height: 260px; display: flex; justify-content: center; align-items: center; border: 1px solid rgb(43, 103, 91, 0.1); box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px; border-radius: 10px; padding: 5px 5px; text-align: center;">
                  <img class="d-lg-block d-none" v-if="detailInfo.photoPng && detailInfo.photoPng.uploadPath" :src="`${routeName}/${detailInfo.photoPng.uploadPath}`" width="415" height="240"
                       style="border-radius: 7px;" alt="">
                  <img class="d-lg-none d-block" v-if="detailInfo.photoPng && detailInfo.photoPng.uploadPath" :src="`${routeName}/${detailInfo.photoPng.uploadPath}`" width="340" height="230"
                       style="border-radius: 7px;" alt="">
                  <img v-else width="170" style="border-radius: 10px;" src="../../assets/default.svg" alt="">
                </div>
                <div class="d-flex justify-content-start align-items-center my-3">
                  <img src="@/assets/Mark.png" alt="">
                  <p style="font-size: 20px;" class="mb-0 ml-2 siteColor">{{ $t('column.savdoTarmoq') }}</p>
                </div>
                <b-row>
                  <b-col cols="12" v-if="tabProduct == 'customProduct'">
                    <BaseTreeselectWithValidation
                        :disable-branch-nodes="true"
                        :searchable="true"
                        :clearable="true"
                        open-direction="bottom"
                        vee-name="parentDepVeeName"
                        rules="required"
                        class="required"
                        :placeholder="$t('')"
                        ref="parentDep1"
                        only-form-element
                        form-label="__none"
                        v-model="marketId"
                        :options="collectSavdo"
                        :default-expand-level="1"
                        :normalizer="normalizer1"
                        name="parentDep1"
                        custom-styles="width: 90%; border: 1px solid #2b675b;"
                        @close="treeClosed('parentDepVeeName')"
                    ></BaseTreeselectWithValidation>
                  </b-col>
                  <b-col cols="12" v-if="tabProduct == 'otherProduct' && ((productChildId == 61) || (productChildId == 123) || (productChildId == 125))">
                    <BaseTreeselectWithValidation
                        :disable-branch-nodes="true"
                        :searchable="true"
                        :clearable="true"
                        open-direction="bottom"
                        vee-name="parentDepVeeName"
                        rules="required"
                        class="required"
                        :placeholder="$t('')"
                        ref="parentDep1"
                        only-form-element
                        form-label="__none"
                        v-model="marketId"
                        :options="collectSavdoGaz"
                        :default-expand-level="1"
                        :normalizer="normalizer1"
                        name="parentDep1"
                        custom-styles="width: 90%; border: 1px solid #2b675b;"
                        @close="treeClosed('parentDepVeeName')"
                    ></BaseTreeselectWithValidation>
                  </b-col>
                  <b-col cols="12" v-if="tabProduct == 'otherProduct' && ((productChildId == 60) || (productChildId == 148) || (productChildId == 131) || (productChildId == 129) || (productChildId == 127))">
                    <BaseTreeselectWithValidation
                        :disable-branch-nodes="true"
                        :searchable="true"
                        :clearable="true"
                        open-direction="bottom"
                        vee-name="parentDepVeeName"
                        rules="required"
                        class="required"
                        :placeholder="$t('')"
                        ref="parentDep1"
                        only-form-element
                        form-label="__none"
                        v-model="marketId"
                        :options="collectSavdoBenzin"
                        :default-expand-level="1"
                        :normalizer="normalizer1"
                        name="parentDep1"
                        custom-styles="width: 90%; border: 1px solid #2b675b;"
                        @close="treeClosed('parentDepVeeName')"
                    ></BaseTreeselectWithValidation>
                  </b-col>
                  <b-col cols="12" v-if="tabProduct == 'otherProduct' && ((productChildId == 56) || (productChildId == 57) || (productChildId == 58))">
                    <BaseTreeselectWithValidation
                        :disable-branch-nodes="true"
                        :searchable="true"
                        :clearable="true"
                        open-direction="bottom"
                        vee-name="parentDepVeeName"
                        rules="required"
                        class="required"
                        :placeholder="$t('')"
                        ref="parentDep1"
                        only-form-element
                        form-label="__none"
                        v-model="marketId"
                        :options="collectSavdoPaxta"
                        :default-expand-level="1"
                        :normalizer="normalizer1"
                        name="parentDep1"
                        custom-styles="width: 90%; border: 1px solid #2b675b;"
                        @close="treeClosed('parentDepVeeName')"
                    ></BaseTreeselectWithValidation>
                  </b-col>
                </b-row>
                <b-row style="margin-top: 26px" v-if="tabProduct == 'customProduct' && marketId">
                  <b-col cols="4" class="px-lg-2 px-1 text-md-left text-center">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('productPrice.middleSum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #289202">{{ formatNumber(returnSearch?.market1?.middleSum ? returnSearch?.market1?.middleSum : $t('productPrice.notFound')) }}
                      <span v-if="returnSearch?.market1?.middleSum">{{ $t('productPrice.som') }}</span>
                    </p>
                  </b-col>
                  <b-col cols="4" class="px-lg-2 px-1 text-md-left text-center">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('productPrice.maxSum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #D3AB1D">{{ formatNumber(returnSearch?.market1?.maxSum ? returnSearch?.market1?.maxSum : $t('productPrice.notFound')) }}
                      <span v-if="returnSearch?.market1?.maxSum">{{ $t('productPrice.som') }}</span>
                    </p>
                  </b-col>
                  <b-col cols="4" class="px-lg-2 px-1 text-md-left text-center">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('productPrice.minSum') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #2b675b">{{ formatNumber(returnSearch?.market1?.minSum ? returnSearch?.market1?.minSum : $t('productPrice.notFound')) }}
                      <span v-if="returnSearch?.market1?.minSum">{{ $t('productPrice.som') }}</span>
                    </p>
                  </b-col>
                </b-row>

                <b-row v-else-if="tabProduct == 'otherProduct' && marketId" class="mt-4">
                  <b-col cols="12" lg="6" class="px-lg-2 my-lg-0 my-3">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('productPrice.sum1') }}</p>
                    <p class="mb-0" style="font-size: 16px; font-weight: bold; color: #2b675b">{{ formatNumber(returnSearch?.market1?.maxSum ? returnSearch?.market1?.maxSum : $t('productPrice.notFound')) }}
                      <span v-if="returnSearch?.market1?.maxSum">{{ $t('productPrice.som') }}</span>
                    </p>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col cols="12" lg="4" class="px-3 mt-lg-0 mt-4">
              <div>
                <div>
                  <p style="font-size: 24px; font-weight: bold; color: #2b675b;"> {{
                      getName({
                        nameLt: detailInfo?.nameLt,
                        nameUz: detailInfo?.nameUz,
                        nameRu: detailInfo?.nameRu,
                      })
                    }} {{ $t('productPrice.narxlari') }}</p>
                </div>
                <div class="mt-3">
                  <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">Худуд буйича</p>
                  <select
                      class="form-control form-control-md d-lg-block d-none"
                      style="width: 90%; border: 1px solid #2b675b;"
                      v-model="regionSoato"
                  >
                    <option value="17">{{ $t('rais.department.republic') }}</option>
                    <option value="1703"> {{ $t('rais.region.andijon') }}</option>
                    <option value="1706"> {{ $t('rais.region.buxoro') }}</option>
                    <option value="1708"> {{ $t('rais.region.jizzax') }}</option>
                    <option value="1712"> {{ $t('rais.region.navoi') }}</option>
                    <option value="1714"> {{ $t('rais.region.namangan') }}</option>
                    <option value="1718"> {{ $t('rais.region.samarqand') }}</option>
                    <option value="1724"> {{ $t('rais.region.sirdaryo') }}</option>
                    <option value="1722"> {{ $t('rais.region.surxandaryo') }}</option>
                    <option value="1730"> {{ $t('rais.region.fargona') }}</option>
                    <option value="1727"> {{ $t('rais.region.toshkentV') }}</option>
                    <option value="1726"> {{ $t('rais.region.toshkentSh') }}</option>
                    <option value="1710"> {{ $t('rais.region.qashqadaryo') }}</option>
                    <option value="1733"> {{ $t('rais.region.xorazm') }}</option>
                    <option value="1735"> {{ $t('rais.region.qoraqalpoq') }}</option>
                  </select>

                  <select
                      class="form-control form-control-md d-lg-none d-block"
                      style="width: 100%; border: 1px solid #2b675b;"
                      v-model="regionSoato"
                  >
                    <option value="17">{{ $t('rais.department.republic') }}</option>
                    <option value="1703"> {{ $t('rais.region.andijon') }}</option>
                    <option value="1706"> {{ $t('rais.region.buxoro') }}</option>
                    <option value="1708"> {{ $t('rais.region.jizzax') }}</option>
                    <option value="1712"> {{ $t('rais.region.navoi') }}</option>
                    <option value="1714"> {{ $t('rais.region.namangan') }}</option>
                    <option value="1718"> {{ $t('rais.region.samarqand') }}</option>
                    <option value="1724"> {{ $t('rais.region.sirdaryo') }}</option>
                    <option value="1722"> {{ $t('rais.region.surxandaryo') }}</option>
                    <option value="1730"> {{ $t('rais.region.fargona') }}</option>
                    <option value="1727"> {{ $t('rais.region.toshkentV') }}</option>
                    <option value="1726"> {{ $t('rais.region.toshkentSh') }}</option>
                    <option value="1710"> {{ $t('rais.region.qashqadaryo') }}</option>
                    <option value="1733"> {{ $t('rais.region.xorazm') }}</option>
                    <option value="1735"> {{ $t('rais.region.qoraqalpoq') }}</option>
                  </select>
                </div>

                <div class="mt-4 d-lg-block d-none" style="margin-bottom: 70px;" v-if="childerByID && childerByID.length">
                  <div><p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">Маҳсулот тури буйича</p></div>
                  <BaseTreeselectWithValidation
                      :searchable="true"
                      :clearable="true"
                      open-direction="bottom"
                      vee-name="parentDepVeeName"
                      rules="required"
                      class="required"
                      :placeholder="$t('')"
                      ref="parentDep"
                      only-form-element
                      form-label="__none"
                      v-model="productChildId"
                      :options="childerByID"
                      :default-expand-level="1"
                      :normalizer="normalizer"
                      name="parentDep"
                      custom-styles="width: 90%; border: 1px solid #2b675b;"
                      @close="treeClosed('parentDepVeeName')"
                  ></BaseTreeselectWithValidation>


                  <div class="d-none aside">
                    <ul class="list">
                      <li class="list-item">
                        <div class="drop d-flex justify-content-between align-items-center">
                          <div @click="getByChild(detailInfo.id)"> {{
                              getName({
                                nameLt: detailInfo?.nameLt,
                                nameUz: detailInfo?.nameUz,
                                nameRu: detailInfo?.nameRu,
                              })
                            }}</div>
                          <div class="text-end" @click="openProductType1()" v-if="childerByID.children && childerByID.children.length">
                            <img v-if="dropdownOpen1" width="9" src="@/assets/up.png" alt="">
                            <img v-if="!dropdownOpen1" src="@/assets/down.png" alt="">
                          </div>
                        </div>
                        <ul class="droplist" v-show="dropdownOpen1">
                          <li>
                            <div class="drop" v-for="(vm, index) in childerByID.children" :key="index">
                              <div class="d-flex justify-content-between align-items-center">
                                <div @click="getByChild(vm.id)"> {{
                                    getName({
                                      nameLt: vm?.nameLt,
                                      nameUz: vm?.nameUz,
                                      nameRu: vm?.nameRu,
                                    })
                                  }}</div>
                                <div class="text-end" v-if="vm.children && vm.children.length" @click="openProductType(vm.id)">
                                  <img v-if="dropdownOpen2" width="9" src="@/assets/up.png" alt="">
                                  <img v-if="!dropdownOpen2" src="@/assets/down.png" alt="">
                                </div>
                              </div>

                              <ul class="droplist" v-show="dropdownOpen2">
                                <li>
                                  <div class="drop" v-for="(dm, index1) in vm.children" :key="index1">
                                    <div @click="getByChild(dm.id)"> {{
                                        getName({
                                          nameLt: dm?.nameLt,
                                          nameUz: dm?.nameUz,
                                          nameRu: dm?.nameRu,
                                        })
                                      }}</div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4 d-lg-none d-block" style="margin-bottom: 15px;" v-if="childerByID && childerByID.length">
                  <div><p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">Маҳсулот тури буйича</p></div>
                  <BaseTreeselectWithValidation
                      :searchable="true"
                      :clearable="true"
                      open-direction="bottom"
                      vee-name="parentDepVeeName"
                      rules="required"
                      class="required"
                      :placeholder="$t('')"
                      ref="parentDep"
                      only-form-element
                      form-label="__none"
                      v-model="productChildId"
                      :options="childerByID"
                      :default-expand-level="1"
                      :normalizer="normalizer"
                      name="parentDep"
                      custom-styles="width: 90%; border: 1px solid #2b675b;"
                      @close="treeClosed('parentDepVeeName')"
                  ></BaseTreeselectWithValidation>
                </div>

                <div v-else class="bestAcru"><p style="color: white">acru developers are best</p></div>

                <div class="d-flex justify-content-start align-items-center my-3">
                  <img src="@/assets/Mark.png" alt="">
                  <p style="font-size: 20px;" class="mb-0 ml-2 siteColor">{{ $t('column.selectIjro') }}</p>
                </div>

                <b-row v-if="returnSearch.market1 && marketId">
                  <b-col cols="12">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('activity.rateInfo.monopoly.foods.lastDate1') }}</p>
                    <p style="font-size: 16px; font-weight: bold; color: #2b675b">
                      <span v-if="returnSearch?.market1?.lastDate">
                        {{ returnSearch?.market1?.lastDate }}
                      </span>
                      <span v-else>
                        <b style="color: white;">.</b>
                      </span>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="mt-2" v-if="returnSearch.market1 && marketId">
                  <b-col cols="12">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('column.savdoObj2') }}</p>
                    <p style="font-size: 16px; font-weight: bold; color: #2b675b">
                      {{
                        getName({
                          nameLt: returnSearch?.market1?.market?.priceMarketTypeDto.nameLt ? returnSearch?.market1?.market?.priceMarketTypeDto.nameLt : '',
                          nameUz: returnSearch?.market1?.market?.priceMarketTypeDto.nameUz ? returnSearch?.market1?.market?.priceMarketTypeDto.nameUz : '',
                          nameRu: returnSearch?.market1?.market?.priceMarketTypeDto.nameRu ? returnSearch?.market1?.market?.priceMarketTypeDto.nameRu : '',
                        })
                      }}
                    </p>
                  </b-col>
                </b-row>
                <b-row class="mt-3 d-lg-none d-block" v-if="returnSearch.market1 && marketId">
                  <b-col cols="12" class="px-lg-2">
                    <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('reporting.main.form1.name5') }}</p>
                    <p style="font-size: 16px; font-weight: bold; color: #2b675b">{{ returnSearch?.market1?.market?.address ? returnSearch?.market1?.market?.address : '' }} </p>
                  </b-col>

                </b-row>

                <b-row class="mt-3 d-lg-none d-block" v-if="returnSearch.market1 && marketId">
                  <b-col cols="12" class="px-lg-2 my-lg-0 my-3">
                    <p v-if="returnSearch?.market1?.market?.lang || returnSearch.market1.market.link" style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('column.location1') }}</p>
                    <div class="d-flex justify-content-start align-items-center">
                      <div style="width:70%;" v-if="(returnSearch?.market1?.market?.lang || returnSearch?.market1?.market?.link)">
                        <p style="color: #2b675b; font-weight: bold; text-align: center; font-size: 13px; border: 2px solid #2b675b; padding: 5px; border-radius: 5px">
                        <span>
                          {{ returnSearch?.market1?.market?.lang ? (returnSearch?.market1?.market?.lang + ' , ' + returnSearch?.market1?.market?.lat) :
                            returnSearch?.market1?.market?.link ? (returnSearch?.market1?.market?.link.slice(0, 35)) + '...' : '' }}
                        </span>
                        </p>
                      </div>
                      <div v-if="returnSearch.market1.market.lat || returnSearch.market1.market.link" class="px-2">
                        <a v-if="returnSearch.market1.market.lat" :href="`https://maps.google.com/maps?q=${returnSearch.market1.market.lat},${returnSearch.market1.market.lang}&ll=${returnSearch.market1.market.lat},${returnSearch.market1.market.lang}&z=16`" target="_blank">
                          <img src="@/assets/link.png" alt="">
                        </a>
                        <a v-else-if="returnSearch.market1.market.link" :href="returnSearch?.market1?.market?.link" target="_blank">
                          <img src="@/assets/link.png" alt="">
                        </a>
                        <a v-else href="#"><img src="@/assets/link.png" alt=""></a>
                      </div>
                      <div v-if="returnSearch.market1.market.lat || returnSearch.market1.market.link">
                        <label class="dropdown">

                          <div class="dd-button">
                            <img src="@/assets/share.png" alt="">
                          </div>

                          <input type="checkbox" class="dd-input" id="test">

                          <ul class="dd-menu">
                            <li v-if="returnSearch.market1.market.lat" @click="sendToTelegramLatLang(returnSearch.market1.market.lat, returnSearch.market1.market.lang)">
                              <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                            </li>
                            <li v-else @click="sendToTelegramLink(returnSearch.market1.market.link)">
                              <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                            </li>


                            <li v-if="returnSearch.market1.market.lat" @click="copyLatLangLink(returnSearch.market1.market.lat, returnSearch.market1.market.lang)">
                              <i class="mdi mdi-content-copy"></i> Nusxalash
                            </li>
                            <li v-else  @click="copyLink(returnSearch.market1.market.link)">
                              <i class="mdi mdi-content-copy"></i> Nusxalash
                            </li>
                          </ul>

                        </label>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>
            <b-col cols="12" lg="4" class="px-3 mt-lg-0 mt-4">
              <div>
                <div class="mt-2">
                  <div class="d-flex justify-content-start align-items-center mt-1" style="margin-bottom: 20px;">
                    <img src="@/assets/Mark.png" alt="">
                    <p style="font-size: 20px;" class="mb-0 ml-2 siteColor">{{ $t('column.mainData') }}</p>
                  </div>
                  <div v-if="returnSearch?.all?.maxMarket || returnSearch?.all?.minMarket" class="mt-2" >
                    <div>
                      <b-row class="d-flex">
                        <b-col cols="6">
                          <div><p class="mb-0" style="color: #2b675b; font-size: 15px; margin-bottom: 8px;">{{ $t('productPrice.minSum') }}</p></div>
                          <div>
                            <p style="font-size: 19px; font-weight: bold; color: #2b675b">{{ formatNumber(returnSearch?.all?.minMarket?.minPrice ? returnSearch?.all?.minMarket?.minPrice : $t('productPrice.notFound')) }}
                              <span v-if="returnSearch?.all?.minMarket?.minPrice">{{ $t('productPrice.som') }}</span>
                            </p>
                          </div>
                          <div><p class="mt-1" style="color: #2b675b; font-size: 13px; margin-bottom: 8px;">
                            {{ returnSearch?.all?.minMarket?.date ? returnSearch?.all?.minMarket?.date : '' }} {{ $t('footerTitle') }}
                          </p></div>
                        </b-col>
                        <b-col cols="5">
                          <div><p class="mb-0" style="color: #2b675b; font-size: 15px; margin-bottom: 8px;">{{ $t('column.savdoObj1') }}</p></div>
                          <div>
                            <p style="font-size: 15px; font-weight: bold; color: #2b675b">
                              {{ returnSearch?.all?.minMarket?.marketDto?.marketName ? returnSearch?.all?.minMarket?.marketDto?.marketName : '' }}
                            </p>
                          </div>
                        </b-col>
                        <b-col cols="1" style="text-align: end; margin-top:15px;">
                          <div>
                            <div>
                              <img @click="openIntoData('min')" style="cursor:pointer;" width="35" src="@/assets/showDetail.gif" alt="Your GIF">
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>

                  <div v-if="returnSearch?.all?.maxMarket || returnSearch?.all?.minMarket" style="margin:13px 0;">
                    <div>
                      <b-row class="d-flex">
                        <b-col cols="6">
                          <div><p class="mb-0" style="color: #2b675b; font-size: 15px; margin-bottom: 8px;">{{ $t('productPrice.maxSum') }}</p></div>
                          <div>
                            <p style="font-size: 19px; font-weight: bold; color: #2b675b">{{ formatNumber(returnSearch?.all?.maxMarket?.maxPrice ? returnSearch?.all?.maxMarket?.maxPrice : $t('productPrice.notFound')) }}
                              <span v-if="returnSearch?.all?.maxMarket?.maxPrice">{{ $t('productPrice.som') }}</span>
                            </p>
                          </div>
                          <div><p class="mt-1" style="color: #2b675b; font-size: 13px; margin-bottom: 8px;">
                            {{ returnSearch?.all?.maxMarket?.date ? returnSearch?.all?.maxMarket?.date : '' }} {{ $t('footerTitle') }}
                          </p></div>
                        </b-col>
                        <b-col cols="5">
                          <div><p class="mb-0" style="color: #2b675b; font-size: 15px; margin-bottom: 8px;">{{ $t('column.savdoObj1') }}</p></div>
                          <div>
                            <p style="font-size: 15px; font-weight: bold; color: #2b675b">
                              {{ returnSearch?.all?.maxMarket?.marketDto?.marketName ? returnSearch?.all?.maxMarket?.marketDto?.marketName : '' }}
                            </p>
                          </div>
                        </b-col>
                        <b-col cols="1" style="text-align: end; margin-top:15px;">
                          <div>
                            <div>
                              <img @click="openIntoData('max')" style="cursor:pointer;" width="35" src="@/assets/showDetail.gif" alt="Your GIF">
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>

                  <div v-if="returnSearch?.all?.maxMarket || returnSearch?.all?.minMarket" style="margin-bottom: 45px;">
                    <b-row class="d-flex">
                      <b-col cols="6">
                        <p style="font-size: 19px; font-weight: bold; color: #289202">{{ $t('productPrice.middleSum') }} </p>
                      </b-col>
                      <b-col cols="6">
                        <p class="mb-0 mr-lg-3" style="font-size: 20px; font-weight: bold; color: #289202">{{ formatNumber(returnSearch?.all?.middleSum ? returnSearch?.all?.middleSum : $t('productPrice.notFound')) }}
                          <span v-if="returnSearch?.all?.middleSum">{{ $t('productPrice.som') }}</span>
                        </p>
                      </b-col>
                    </b-row>
                  </div>


                  <b-row class="my-5 py-5" v-if="!returnSearch?.all?.maxMarket && !returnSearch?.all?.minMarket">
                    <b-col cols="12" class="mb-5" style="margin-top: 25px">
                      <p style="color: white;">.</p>
                    </b-col>
                  </b-row>

                  <b-row class="mt-3 d-lg-block d-none" v-if="returnSearch.market1 && marketId">
                    <b-col cols="12" class="px-lg-2">
                      <p style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('reporting.main.form1.name5') }}</p>
                      <p style="font-size: 16px; font-weight: bold; color: #2b675b">{{ returnSearch?.market1?.market?.address ? returnSearch?.market1?.market?.address : '' }} </p>
                    </b-col>

                  </b-row>

                  <b-row class="mt-2 d-lg-block d-none" v-if="returnSearch.market1 && marketId">
                    <b-col cols="12" class="px-lg-2 my-lg-0 my-3">
                      <p v-if="returnSearch?.market1?.market?.lang || returnSearch.market1.market.link" style="color: #2b675b; font-size: 14px; margin-bottom: 8px;">{{ $t('column.location1') }}</p>
                      <div class="d-flex justify-content-start align-items-center">
                        <div style="width:70%;" v-if="(returnSearch?.market1?.market?.lang || returnSearch?.market1?.market?.link)">
                          <p style="color: #2b675b; font-weight: bold; text-align: center; font-size: 13px; border: 2px solid #2b675b; padding: 5px; border-radius: 5px">
                        <span>
                          {{ returnSearch?.market1?.market?.lang ? (returnSearch?.market1?.market?.lang + ' , ' + returnSearch?.market1?.market?.lat) :
                            returnSearch?.market1?.market?.link ? (returnSearch?.market1?.market?.link.slice(0, 35)) + '...' : '' }}
                        </span>
                          </p>
                        </div>
                        <div v-if="returnSearch.market1.market.lat || returnSearch.market1.market.link" class="px-2">
                          <a v-if="returnSearch.market1.market.lat" :href="`https://maps.google.com/maps?q=${returnSearch.market1.market.lat},${returnSearch.market1.market.lang}&ll=${returnSearch.market1.market.lat},${returnSearch.market1.market.lang}&z=16`" target="_blank">
                            <img src="@/assets/link.png" alt="">
                          </a>
                          <a v-else-if="returnSearch.market1.market.link" :href="returnSearch?.market1?.market?.link" target="_blank">
                            <img src="@/assets/link.png" alt="">
                          </a>
                          <a v-else href="#"><img src="@/assets/link.png" alt=""></a>
                        </div>
                        <div v-if="returnSearch.market1.market.lat || returnSearch.market1.market.link">
                          <label class="dropdown">

                            <div class="dd-button">
                              <img src="@/assets/share.png" alt="">
                            </div>

                            <input type="checkbox" class="dd-input" id="test">

                            <ul class="dd-menu">
                              <li v-if="returnSearch.market1.market.lat" @click="sendToTelegramLatLang(returnSearch.market1.market.lat, returnSearch.market1.market.lang)">
                                <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                              </li>
                              <li v-else @click="sendToTelegramLink(returnSearch.market1.market.link)">
                                <i class="mdi mdi-send" style="color: #039be5;"></i> Telegram
                              </li>


                              <li v-if="returnSearch.market1.market.lat" @click="copyLatLangLink(returnSearch.market1.market.lat, returnSearch.market1.market.lang)">
                                <i class="mdi mdi-content-copy"></i> Nusxalash
                              </li>
                              <li v-else  @click="copyLink(returnSearch.market1.market.link)">
                                <i class="mdi mdi-content-copy"></i> Nusxalash
                              </li>
                            </ul>

                          </label>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" class="mt-2 d-lg-block d-none">
          <div class="text-center"><p style="color: #2b675b; font-size: 18px; font-weight: bold; text-transform: uppercase;">{{ $t('productPrice.otherProduct') }} </p></div>
          <carousel
              :per-page="6"
              :loop="true"
              :paginationEnabled="false"
              :mouse-drag="true"
              :scrollPerPage="true"
              :navigation-enabled="true"
          >
            <slide v-for="(vm, index) in productData" :key="index">
              <div v-if="vm.id != 56 && vm.id != 57 && vm.id != 58" @click="showDetailInfo(vm.id)" style="cursor: pointer;">
                <div class="text-center mb-2 pt-4">
                  <img
                      v-if="vm.photoPng && vm.photoPng.uploadPath" :src="`${routeName}/${vm.photoPng.uploadPath}`" width="270" height="160" style="border:1px solid rgb(43, 103, 91, 0.3); box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px; border-radius: 8px; padding: 5px;" alt="">
                  <img v-else width="270" height="160" src="../../assets/default.svg" style="border:3px solid #2b675b; border-radius: 8px; padding: 10px 20px;" alt="">
                </div>
                <div class="text-center"><p style="color: #2b675b; font-size: 15px; font-weight: bold;">
                  {{
                    getName({
                      nameLt: vm?.nameLt,
                      nameUz: vm?.nameUz,
                      nameRu: vm?.nameRu,
                    })
                  }}
                </p></div>
              </div>
            </slide>
          </carousel>
        </b-col>
        <b-col cols="12" class="mt-2 d-lg-none d-block">
          <div class="text-center"><p style="color: #2b675b; font-size: 18px; font-weight: bold; text-transform: uppercase;">{{ $t('productPrice.otherProduct') }} </p></div>
          <carousel
              :per-page="1"
              :loop="true"
              :paginationEnabled="false"
              :mouse-drag="true"
              :scrollPerPage="true"
              :navigation-enabled="true"
          >
            <slide v-for="(vm, index) in productData" :key="index">
              <div v-if="vm.id != 56 && vm.id != 57 && vm.id != 58" @click="showDetailInfo(vm.id)" style="cursor: pointer;">
                <div class="text-center mb-2 pt-4">
                  <img
                      v-if="vm.photoPng && vm.photoPng.uploadPath" :src="`${routeName}/${vm.photoPng.uploadPath}`" width="270" height="160" style="border:1px solid rgb(43, 103, 91, 0.3); box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px; border-radius: 8px; padding: 5px;" alt="">
                  <!--                  <img v-if="vm.photoPng" :src="vm.photoPng" width="165" height="135" style="border:3px solid #2b675b; border-radius: 8px; padding: 5px;" alt="">-->
                  <img v-else width="165" height="135" src="../../assets/default.svg" style="border:3px solid #2b675b; border-radius: 8px; padding: 10px 20px;" alt="">
                </div>
                <div class="text-center"><p style="color: #2b675b; font-size: 15px; font-weight: bold;">
                  {{
                    getName({
                      nameLt: vm?.nameLt,
                      nameUz: vm?.nameUz,
                      nameRu: vm?.nameRu,
                    })
                  }}
                </p></div>
              </div>
            </slide>
          </carousel>
        </b-col>

        <b-col cols="12" class="mt-lg-2 mt-3 ml-3">
          <div>
            <b-btn @click="goBack()" style="background-color: #f1b44c; border:none; padding:5px 20px; color:white;">{{ $t('actions.back') }}</b-btn>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import service from "@/shared/services/checkService";
export default {
  name: "Main",
  components: {
    Carousel,
    Slide
  },
  watch: {
    'marketId':{
      handler(vm){
        if(vm){
          this.getAllBySearch()
        }
      }
    },
    'productChildId':{
      handler(vm){
        if(vm){
          this.getDexqonInfos(vm);
          this.getYirikInfos(vm);
          this.getKichikInfos(vm);
          this.getBenzinInfos(vm);
          this.getGazInfos(vm);
          this.marketId= 0;
          this.returnSearch={};
          this.getAllBySearch()

        }
      }
    },
    'selectedDexqon':{
      handler(vm){
        if(vm){
          this.getAllBySearch();
        }
      }
    },
    'selectedYirik':{
      handler(vm){
        if(vm){
          this.getAllBySearch();
        }
      }
    },
    'selectedKichik':{
      handler(vm){
        if(vm){
          this.getAllBySearch();
        }
      }
    },
    'selectedBenzin':{
      handler(vm){
        if(vm){
          this.getAllBySearch();
        }
      }
    },
    'selectedGaz':{
      handler(vm){
        if(vm){
          this.getAllBySearch();
        }
      }
    },

    'regionSoato':{
      handler(vm){
        if(vm){
          this.getAllBySearch();
          this.getDexqonInfos(this.productChildId);
          this.getYirikInfos(this.productChildId);
          this.getKichikInfos(this.productChildId);
          this.getBenzinInfos(this.productChildId);
          this.getGazInfos(this.productChildId);
          this.marketId= 0;
          this.returnSearch={};
        }
      }
    },
  },
  data() {
    return {
      infoModalValue:'',
      marketId: 0,
      informationModal: false,
      routeName:'https://fairtech.uz',
      productChildId:null,
      loading: false,
      childerByID:{},
      allInformation: false,
      selectedDexqon: 0,
      selectedYirik: 0,
      selectedKichik: 0,
      selectedBenzin:0,
      selectedGaz:0,
      tabProduct:'customProduct',
      productData: [],
      regionSoato:17,
      dropdownOpen1: false,
      dropdownOpen2: false,
      detailInfo:{},
      dexqon:[],
      yirik:[],
      kichik:[],
      benzin:[],
      gaz:[],
      productIds:null,
      returnSearch:{}
    }
  },
  async created() {
    await this.foodsPrice();

  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
    collectSavdo(){
      let collectionSavdo = [
        {
          id:0,
          marketName:"Деҳқон бозорлари",
          children:[...this.dexqon]
        },
        {
          id:0,
          marketName:"Савдо шахобчалари",
          children:[...this.yirik]
        },
        {
          id:0,
          marketName:"Савдо мажмуалари",
          children:[...this.kichik]

        }
      ]
      return collectionSavdo
    },
    collectSavdoGaz(){
      let collectionSavdo = [
        {
          id:0,
          marketName:"Ёқилғи шаҳобчалари (Суюлтирилган газ)",
          children:[...this.gaz]
        }
      ]
      return collectionSavdo
    },
    collectSavdoBenzin(){
      let collectionSavdo = [
        {
          id:0,
          marketName:"Ёқилғи шаҳобчалари (Бензин)",
          children:[...this.benzin]
        }
      ]
      return collectionSavdo
    },
    collectSavdoPaxta(){
      let collectionSavdo = [
        {
          id:0,
          marketName:"Деҳқон бозорлари",
          children:[...this.dexqon]
        },
        {
          id:0,
          marketName:"Савдо мажмуалари",
          children:[...this.kichik]
        }
      ]
      return collectionSavdo
    },
  },
  methods: {

    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: this.getName({
            nameRu: node.nameRu,
            nameLt: node.nameLt,
            nameUz: node.nameUz,
          }),
        }
      }
      return {
        id: node.id,
        label: this.getName({
          nameRu: node.nameRu,
          nameLt: node.nameLt,
          nameUz: node.nameUz,
        }),
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    normalizer1(vm) {
      if (!vm.children || vm.children.length === 0) {
        delete vm.children
        return {
          id: vm.id,
          label: vm.marketName
        }
      }
      return {
        id: vm.id,
        label: vm.marketName,
        children: vm.children && vm.children.length > 0 ? vm.children : [],
      }
    },

    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },

    goBack(){
      this.selectedGaz = 0
      this.selectedBenzin = 0
      this.selectedDexqon = 0
      this.selectedYirik = 0
      this.selectedKichik = 0
      this.allInformation = false
      this.detailInfo = {}
    },
    getByChild(id){
      if(this.productIds != id){
        this.productIds = id;
        this.dropdownOpen1 = !this.dropdownOpen1
        this.getAllBySearch()
      }
    },

   showDetailInfo(id){
      this.loading = true
      this.productChildId = null
      this.productIds = null
      service.getProductById(id)
          .then((res)=>{
            this.childerByID = res.data.children;
            this.allInformation = true
            this.productIds = res.data.id;
            this.productChildId = (res.data.children && res.data.children.length) ? res.data.children[0].id : res.data.id;
            // this.getDexqonInfos(this.productChildId);
            // this.getYirikInfos(this.productChildId);
            // this.getKichikInfos(this.productChildId);
            // this.getBenzinInfos(this.productChildId);
            // this.getGazInfos(this.productChildId);
            this.detailInfo = this.productData.find(item => item.id == id)
            this.getAllBySearch();
            this.loading = false
          })
          .catch((err)=>{
            console.log(err);
            this.loading = false
          })
    },
    openProductType1(){
      this.dropdownOpen1 = !this.dropdownOpen1

    },
    openProductType(id){
      this.dropdownOpen2 = !this.dropdownOpen2
      console.log(id)
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    getAllBySearch(){
      let data = {
        productId: this.productChildId,
        marketId1: this.marketId ,
        marketId2: this.selectedYirik,
        marketId3: this.selectedKichik,
        soato: this.regionSoato
      }
      if(data.soato && data.productId){
        this.loading = true
        service.getAllBySearchs(data)
            .then((res) => {
              this.loading = false
              this.returnSearch = res.data
            })
            .catch((err)=>{
              console.log(err)
              this.loading = false
            })
      }
    },

    getDexqonInfos(vm){
      let data = {
        type:"DEXQON",
        soato: this.regionSoato,
        productId: vm
      }
      service.getDexqonInfo(data)
          .then((res) => {
            this.dexqon = res.data

            // if(res.data && res.data.length){
            //   this.selectedDexqon = res.data[0].id
            // }
            // else{ this.selectedDexqon = null }
            // console.log(this.selectedDexqon)
          })
          .catch((err) => {
            console.log(err);
          })
    },

    getYirikInfos(vm){
      let data = {
        type:"YIRIK",
        soato: this.regionSoato,
        productId: vm
      }
      service.getYirikInfo(data)
          .then((res) => {
            this.yirik = res.data
            // if(res.data && res.data.length){ this.selectedYirik = res.data[0].id }
            // else{ this.selectedYirik = null }
            // console.log(this.selectedYirik)
          })
          .catch((err) => {
            console.log(err);
          })
    },

    getKichikInfos(vm){
      let data = {
        type:"KICHIK",
        soato: this.regionSoato,
        productId: vm
      }
      service.getKichikInfo(data)
          .then((res) => {
            this.kichik = res.data
            // if(res.data && res.data.length){ this.selectedKichik = res.data[0].id }
            // else{ this.selectedKichik = null }
            // console.log(this.selectedKichik)
          })
          .catch((err) => {
            console.log(err);
          })
    },

    getBenzinInfos(vm){
      let data = {
        type:"BENZIN",
        soato: this.regionSoato,
        productId: vm
      }
      service.getKichikInfo(data)
          .then((res) => {
            this.benzin = res.data
            // if(res.data && res.data.length){ this.selectedBenzin = res.data[0].id }
            // else{ this.selectedBenzin = null }
          })
          .catch((err) => {
            console.log(err);
          })
    },

    getGazInfos(vm){
      let data = {
        type:"GAZ",
        soato: this.regionSoato,
        productId: vm
      }
      service.getKichikInfo(data)
          .then((res) => {
            this.gaz = res.data
            // if(res.data && res.data.length){ this.selectedGaz = res.data[0].id }
            // else{ this.selectedGaz = null }
          })
          .catch((err) => {
            console.log(err);
          })
    },

    foodsPrice(){
      this.loading = true;
      let data = {
        code:"FOODS"
      }
      service.getProductInfo(data)
          .then((res) => {
            this.loading = false;
            this.productData = res.data
            this.tabProduct = 'customProduct'
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          })
    },
    otherPrice(){
      this.loading = true;
      let data = {
        code:"OTHERS"
      }
      service.getProductInfo(data)
          .then((res) => {
            this.loading = false;
            this.productData = res.data;
            this.tabProduct = 'otherProduct';
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          })
    },
    openIntoData(vm){
      this.informationModal = true;
      this.infoModalValue = vm
    },
    async copyLink(vm){
      await navigator.clipboard.writeText(vm)
      await this.$toast(this.$t('actions.copy1'), {type: 'success'});
    },
    async copyLatLangLink(lat, lang){
      let data = `https://maps.google.com/maps?q=${lat},${lang}&ll=${lat},${lang}&z=16`
      await navigator.clipboard.writeText(data)
      await this.$toast(this.$t('actions.copy1'), {type: 'success'});

    },

    sendToTelegramLatLang(lat, lang){
      let data = `https://maps.google.com/maps?q=${lat},${lang}&ll=${lat},${lang}&z=16`
      window.open('https://t.me/share/url?url='+encodeURIComponent(data), '_blank')
    },
    sendToTelegramLink(vm){
      window.open('https://t.me/share/url?url='+encodeURIComponent(vm), '_blank')
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
.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
  display: inline-block;
  border-radius: 4px;
  padding: 10px;
  background-color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  top: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 0px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
  background-color: #ffffff;
  list-style-type: none;
  z-index: 99;
}

.dd-input + .dd-menu {
  display: none;
}

.dd-input:checked + .dd-menu {
  display: block;
}

.dd-menu li {
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
  cursor: pointer;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}

.dd-menu li.divider{
  padding: 0;
  border-bottom: 1px solid #cccccc;
}
.detailText{
  font-size: 17px;
  font-weight: bold;
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
/**::v-deep .vue-treeselect__control-arrow-container{
  background-image: url("../../../assets/down.png") !important;
  background-repeat: no-repeat;
  background-size: 90% 50%;
}

::v-deep .vue-treeselect__control-arrow{
  display: none;
}**/

::v-deep .modal-title {
  width: 97%;
  padding: 2px 0px 0px 10px;
  background-color: #2b675b;
  color: white;
}

::v-deep .custom-treeselect.valid .vue-treeselect__control{
  border: 1px solid #2b675b;
}

::v-deep .vue-treeselect__control{
  width: 90%;
  border: 1px solid #2b675b;
}


::v-deep .vue-treeselect__menu{
  width: 438px !important;
  border: 1px solid #2b675b !important;
}

::v-deep .base-form-component__label{
  color: #2b675b;
  margin-bottom: 10px;
  font-size: 14px;
}

::v-deep .custom-select.is-valid{
  background:url("../../assets/down.png") no-repeat 99% 50%;
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
  background-image: url('../../assets/next.png');
  background-size: contain;
  background-repeat: no-repeat;
  top: 0px;
  right: 0px;
}

::v-deep .VueCarousel-navigation-prev::before {
  background-color: #FFFFFF;
  background-image: url('../../assets/prev.png');
  background-size: contain;
  background-repeat: no-repeat;
  top: 0px;
  left: 0px;
}
.bestAcru{
  margin: 70px 0;
}

::v-deep .vue-treeselect__menu{
  width: 90% !important;
}

@media screen and (max-width:725px) {
  ::v-deep .vue-treeselect__control{
    width: 100% !important;
  }
  ::v-deep .custom-select{
    width: 100% !important;
  }
  .bestAcru{
    margin: 0;
  }
  ::v-deep .VueCarousel-navigation-next::before {
    background-color: #FFFFFF;
    /** background-image: url('../../assets'); **/
    background-image: url('../../assets/next.png');
    background-size: contain;
    background-repeat: no-repeat;
    top: 0;
    right: 25px;
  }

  ::v-deep .VueCarousel-navigation-prev::before {
    background-color: #FFFFFF;
   /** background-image: url('../../../assets/arrow-left.png'); **/
    background-image: url('../../assets/prev.png');

    background-size: contain;
    background-repeat: no-repeat;
    top: 0;
    left: 25px;
  }
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