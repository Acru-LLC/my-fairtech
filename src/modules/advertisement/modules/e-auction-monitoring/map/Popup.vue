<template>
  <div class="popup-container">
    <template v-if="Object.keys(currentAdDetails).length === 0">
      <div class="ad-details-wrapper">
        <b-row>
          <b-col cols="12" lg="4">
            <b-row>
              <b-col class="p-0 pb-1" cols="12" md="5" lg="12">
                <b-skeleton-img no-aspect height="165px"></b-skeleton-img>
              </b-col>
              <b-col class="pe-0" cols="12" md="7" lg="12">
                <b-skeleton width="85%"></b-skeleton>
                <b-skeleton width="55%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="8" class="p-0 d-none d-md-block">
            <b-skeleton-table :rows="8" :columns="4" :table-props="{ bordered: true }"></b-skeleton-table>
          </b-col>
        </b-row>
      </div>
    </template>
    <template v-else>
      <div class="ad-details-wrapper">
        <b-row>
          <b-col cols="12" lg="4">
            <b-row class="pr-md-0 pr-lg-2">
              <b-col class="p-0" cols="12" md="5" lg="12">
                <template v-if="currentAdDetails.images && currentAdDetails.images.length">
                  <b-carousel
                      id="carousel-1"
                      controls
                      indicators
                      no-animation
                      :interval="0"
                      background="#ababab"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                  >
                    <b-carousel-slide
                        class="ad-details-img-slide"
                        v-for="(imgFile, imgIndex) in currentAdDetails.images"
                        :key="`currentAdImg-${imgIndex}`"
                        :img-src="publicPath + imgFile.url"
                    />
                  </b-carousel>
                </template>
                <template v-else>
                  <div class="pe-0 mb-1">
                    <img class="ad-details-img" alt="images" :src="require('@/assets/images/photo-placeholder.png')">
                  </div>
                </template>
              </b-col>
              <b-col class="pe-0" cols="12" md="7" lg="12">
                <p class="p-0 m-0"><strong>{{ $t('column.created_by') }}:</strong>
                  {{
                    currentAdDetails.createdByEmployeeFullName ?  (
                      currentAdDetails.createdByEmployeeFullName + ' ' + (
                        currentAdDetails.createdByDirectoryPositionNameUz ? (
                          '(' + currentAdDetails.createdByDirectoryPositionNameUz + ', ' + $t('auth.username') + ' - ' + currentAdDetails.createdByUserName + ')'
                        ) : ''
                      )
                    ) : $t('auth.username') + ' - ' + currentAdDetails.createdByUserName
                  }}
                  <br><i>{{ currentAdDetails.createdDate }}</i>
                </p>
                <p class="p-0 m-0"><strong>{{ $t('column.last_modified_by') }}:</strong><br>
                  {{
                    currentAdDetails.updatedByEmployeeFullName ? (
                      currentAdDetails.updatedByEmployeeFullName + ' ' + (
                        currentAdDetails.updatedByDirectoryPositionNameUz ? (
                          "(" + currentAdDetails.updatedByDirectoryPositionNameUz + ", " + $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName + ')'
                        ) : ''
                      )
                    ) : $t('auth.username') + ' - ' + currentAdDetails.updatedByUserName
                  }} <i>{{ currentAdDetails.updatedDate }}</i>
                  <br>
                  <router-link :to="{name: 'AdvertisementEAuctionDetails', params: {id: currentAdDetails.id}}" class="btn btn-light">
                    {{ $t('actions.details') }}...
                  </router-link>
                </p>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" lg="8" class="p-0 d-none d-md-block">
            <table class="ad-details">
              <tbody>
              <tr>
                <th rowspan="5" width="25%">{{ $t('column.construction.ad_construction') }}</th>
              </tr>
              <tr>
                <th scope="row" width="25%">{{ $t('column.construction.owner') }}</th>
                <td>{{ currentAdDetails.contractorName }}</td>
              </tr>
              <tr>
                <th scope="row" width="25%">{{ $t('column.construction.owner_inn') }}</th>
                <td>{{ currentAdDetails.inn }}</td>
              </tr>
              <tr>
                <th scope="row" width="25%">{{ $t('column.construction.owner_address') }}</th>
                <td>
                  {{ currentAdDetails.contractorAddressRegionNameUz }},
                  {{ currentAdDetails.contractorAddressDistrictNameUz }}
                  {{ currentAdDetails.contractorAdditionalAddress ? ' ,' + currentAdDetails.contractorAdditionalAddress : '' }}
                </td>
              </tr>
              <tr>
                <th scope="row" width="25%">{{ $t('column.construction.volume') }}</th>
                <td>{{ currentAdDetails.volume }} ({{ currentAdDetails.width }} x {{ currentAdDetails.length }})</td>
              </tr>
              <tr>
                <th colspan="5"></th>
              </tr>
              <tr>
                <th scope="row" colspan="2">{{ $t('column.ad_construction_passport_expire_date') }}</th>
                <td>
                  {{ currentAdDetails.passportExpireDate ? currentAdDetails.passportExpireDate : '' }}
                </td>
              </tr>
              <tr>
                <th scope="row" colspan="2">{{ $t('column.monthly_income') }}</th>
                <td>
                  {{
                    currentAdDetails.monthlyPayment ? getNumberFormat(currentAdDetails.monthlyPayment) : ''
                  }}
                </td>
              </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: "popup",
  components: {
  },
  props: {
    publicPath: {
      type: String,
      default: () => {
        return '/'
      }
    },
    currentAdDetails: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      asdfsadf: {
        "id": 8037,
        "lot": 428072,
        "image": "https://files.e-auksion.uz/files-worker/api/v1/images?&file_hash=edb93557cb4c2e4163432d9dc30f599a766e4d2b&width=340&height=300",
        "propertyGroupName": null,
        "propertyGroup": null,
        "property": "Ташқи реклама объекти. Билборд № 60.",
        "region": "Самарқанд вилояти",
        "regionSoato": "1718",
        "area": "Оқдарё тумани",
        "areaSoato": "1718203",
        "address": "Лойиш шаҳарчаси, А.Темур кўчаси 4р58а йўли, Узтелеком биноси рўпараси",
        "overTime": "01.02.2021 18:00:00",
        "orderEndTime": "01.02.2021 08:59:00",
        "auctionTime": "01.02.2021 09:00:00",
        "price": 380363,
        "winner": "МУРОДОВ АСҚАР УЛАШОВИЧ",
        "winnerInn": null,
        "winnerPinfl": null,
        "winAmount": 380363,
        "isFilled": true,
        "statusId": 16,
        "statusNameUz": "Фаол",
        "statusNameLt": "Faol",
        "statusNameRu": "Актив",
        "auctionDate": "01.02.2021",
        "lotStatus": "Лот якунланди",
        "zakladSumma": "76072.6",
        "zakladPercent": "20.0",
        "additionalInfo": null,
        "lat": "41.23756732009006",
        "lng": "69.25644854557716",
        "winnerType": "Жисмоний шахс",
        "winnerTypeId": "1",
        "viewCount": "9",
        "customerName": "Oqdaryo tuman hokimligi",
        "customerType": "Юридик шахс",
        "customerAddress": "Самарқанд вилояти, Оқдарё тумани, Loyish shaharchasi Amir Temur ko'chasi 39-uy",
        "customerPhone": "981309700",
        "customerEmail": "oqdaryo@samarkand.uz",
        "customerAdditionalPhones": null,
        "passportNumber": "123",
        "passportGivenDate": "12-2022",
        "passportExpireDate": "12-2027",
        "monthlyPayment": 380363,
        "addressDto": {
          "id": 11131,
          "additional": "Лойиш шаҳарчаси, А.Темур кўчаси 4р58а йўли, Узтелеком биноси рўпараси",
          "comment": null,
          "countryId": 211,
          "countryNameUz": "УЗБЕКИСТАН",
          "countryNameLt": null,
          "countryNameRu": null,
          "countryNameEn": null,
          "regionId": 254,
          "regionNameUz": "САМАРҚАНД ВИЛОЯТИ",
          "regionNameLt": null,
          "regionNameRu": null,
          "regionNameEn": null,
          "districtId": 343,
          "districtNameUz": "ОҚДАРЁ ТУМАНИ",
          "districtNameLt": null,
          "districtNameRu": null,
          "districtNameEn": null,
          "quarterId": null,
          "quarterNameUz": null,
          "quarterNameLt": null,
          "quarterNameRu": null,
          "quarterNameEn": null,
          "streetId": null,
          "streetNameUz": null,
          "streetNameLt": null,
          "streetNameRu": null,
          "streetNameEn": null
        },
        "createdByUserName": "v.mustafina",
        "createdDate": "26.12.2022 18:14:52",
        "createdByEmployeeFullName": "MUSTAFINA VIKTORIYA VALEREVNA",
        "departmentId": 23,
        "departmentNameUz": "Samarqand viloyati xududiy boshqarmasi",
        "departmentNameRu": null,
        "departmentNameLt": null,
        "departmentNameEn": null,
        "createdByDirectoryPositionNameUz": "Бошқарма бошлиғи",
        "createdByDirectoryPositionNameLt": "Boshqarma boshlig‘i",
        "createdByDirectoryPositionNameRu": null,
        "createdByDirectoryPositionNameEn": null,
        "updatedByUserName": "v.mustafina",
        "updatedDate": "26.12.2022 18:14:52",
        "updatedByEmployeeFullName": "MUSTAFINA VIKTORIYA VALEREVNA",
        "updatedByDirectoryPositionNameUz": "Бошқарма бошлиғи",
        "updatedByDirectoryPositionNameLt": "Boshqarma boshlig‘i",
        "updatedByDirectoryPositionNameRu": null,
        "updatedByDirectoryPositionNameEn": null,
        "contractorId": 42,
        "inn": "303441454",
        "contractorPhoneNumber": null,
        "contractorName": "\"UNISON BUSINESS\" MAS‘ULIYATI CHEKLANGAN JAMIYATI",
        "contractorAddressRegionNameUz": "ТОШКЕНТ ШАҲАР",
        "contractorAddressRegionNameLt": null,
        "contractorAddressRegionNameRu": null,
        "contractorAddressRegionNameEn": null,
        "contractorAddressDistrictNameUz": "ЯККАСАРОЙ ТУМАНИ",
        "contractorAddressDistrictNameLt": null,
        "contractorAddressDistrictNameRu": null,
        "contractorAddressDistrictNameEn": null,
        "contractorAdditionalAddress": "ABDULLA KAXXOR KO`CHASI,49A-UY, ,",
        "images": [
          {
            "id": 402,
            "image": "https://files.e-auksion.uz/files-worker/api/v1/images?&file_hash=edb93557cb4c2e4163432d9dc30f599a766e4d2b",
            "imagePosition": "Umumiy ko`rinishi",
            "isMain": "1",
            "fileExtension": "jpg",
            "description": null,
            "infoId": 24,
            "fileEntityId": 7322,
            "name": "Umumiy ko`rinishi",
            "modifiedName": null,
            "extension": "jpg",
            "contentType": "",
            "absolutePath": "/var/www/tacru/public/images/2022.12.24/e-auction/nfdkkjdymtrvspnglfzyqpdvbygmcqrwbyqlqbmprdfpdzzlvbpdwocxxoezermgwibjfhajkoelyesexudyytihnixrhxlukqgk1671864748663.jpg",
            "size": 73876,
            "url": "images/2022.12.24/e-auction/nfdkkjdymtrvspnglfzyqpdvbygmcqrwbyqlqbmprdfpdzzlvbpdwocxxoezermgwibjfhajkoelyesexudyytihnixrhxlukqgk1671864748663.jpg",
            "createdDate": null
          },
          {
            "id": 403,
            "image": "https://files.e-auksion.uz/files-worker/api/v1/images?&file_hash=12c1b668778d372e7e033276d66ef2f5f7a81bf3",
            "imagePosition": "Орка кисми",
            "isMain": "0",
            "fileExtension": "jpg",
            "description": null,
            "infoId": 24,
            "fileEntityId": 7323,
            "name": "Орка кисми",
            "modifiedName": null,
            "extension": "jpg",
            "contentType": "",
            "absolutePath": "/var/www/tacru/public/images/2022.12.24/e-auction/gzcgauwsrlhhynuajjcpuqiufxfpjhwztdkhkqeglrcwuosvvbfqytanvdvghvtpfftvtczowrudiesipgszymjhjjgaroawqdvz1671864748678.jpg",
            "size": 11303,
            "url": "images/2022.12.24/e-auction/gzcgauwsrlhhynuajjcpuqiufxfpjhwztdkhkqeglrcwuosvvbfqytanvdvghvtpfftvtczowrudiesipgszymjhjjgaroawqdvz1671864748678.jpg",
            "createdDate": null
          },
          {
            "id": 404,
            "image": "https://files.e-auksion.uz/files-worker/api/v1/images?&file_hash=a531416b5ce2d2cbb938aac66ea5ce7c58da11b7",
            "imagePosition": "Олд кисми",
            "isMain": "0",
            "fileExtension": "png",
            "description": null,
            "infoId": 24,
            "fileEntityId": 7324,
            "name": "Олд кисми",
            "modifiedName": null,
            "extension": "png",
            "contentType": "",
            "absolutePath": "/var/www/tacru/public/images/2022.12.24/e-auction/zlgebfqbdhiyigsjnzhgwelbkaabeccghokkbqmwocttgrlhhhwuqpjdbscltuzlmspjhtodnwlpnoeeuspkmmuzymdibenwwsnh1671864748907.png",
            "size": 739824,
            "url": "images/2022.12.24/e-auction/zlgebfqbdhiyigsjnzhgwelbkaabeccghokkbqmwocttgrlhhhwuqpjdbscltuzlmspjhtodnwlpnoeeuspkmmuzymdibenwwsnh1671864748907.png",
            "createdDate": null
          }
        ],
        "details": null,
        "documents": null
      }
    }
  },
  methods: {
    onSlideStart(slide) {
      this.$emit('onSlideStart')
    },
    onSlideEnd(slide) {
      this.$emit('onSlideEnd')
    },
  }
}

</script>

<style scoped lang="scss">
.popup-container {
  padding: 15px;
}

table.ad-details {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 0.5rem;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 5px;
  }
}

.ad-details-img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 12rem;
  min-height: 10rem;
}

.carousel {
  @media (min-width: 568px) {
    max-width: 60%;
    width: 60%;
  }
  @media (min-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
}

.ad-details-img-slide {
  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    max-height: 12rem;
    min-height: 10rem;
  }
}
</style>