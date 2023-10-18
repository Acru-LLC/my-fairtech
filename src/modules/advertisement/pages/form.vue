<template>
  <div class="container-main">
    <div class="container" id="element-to-print">
      <div class="card-header">
        <div class="line2"></div>
        <div class="line3"></div>
        <div class="line4"></div>
        <div class="line1"></div>
      </div>
      <div class="header">
        <!--                <img class="left-img" src="./images/Emblem_of_Uzbekistan.svg" alt="">-->
        <!--                <span style="font-size: 15px; margin-left: 20px; font-weight: bold; color: black">O‘ZBEKISTON RESPUBLIKASI-->
        <!--                RAQOBAT RIVOJLANTIRISH-->
        <!--                VA ISTE’MOLCHLAR-->
        <!--                HUQUQLARINI HIMOYA-->
        <!--                QILISH QO‘MITASI</span>-->
        <img class="center-img" src="../images/Emblem_of_Uzbekistan.svg" alt="">

        <!--                <img class="right-img" src="./images/Emblem_of_Uzbekistan.svg" alt="">-->
      </div>

      <div class="header">
        <h6 style="font-size: 15px;margin-top: 10px; font-weight: bold;color: black; text-align: center">
          O‘ZBEKISTON RESPUBLIKASI <br>
          RAQOBAT RIVOJLANTIRISH
          VA ISTE’MOLCHLAR <br>
          HUQUQLARINI HIMOYA
          QILISH QO‘MITASI
        </h6>
      </div>
      <div class="body">
        <b-row style="height: 0px !important; margin-top: -10px">
          <b-col cols="9"></b-col>
          <b-col cols="3">
            <div class="txt2" style=" text-align: left">
                            <span style="font-size: 13px; font-weight: bold;color: black;">
                                RAQOBAT QO‘MITASI <br>
                               <span style="text-transform: uppercase">
                                    {{ resDate.belongDepartmentName ? resDate.belongDepartmentName : '-' }}GA
                               </span>
                            </span>

            </div>
          </b-col>
        </b-row>
        <b-row style="height: 0px !important;" class="mt-2 mb-5">
          <b-col cols="1"></b-col>
          <b-col cols="10">
            <div class="txt3">
                          <span style="font-weight: bold; font-size: 18px; color: #2b6c58">
                                ARIZA
                          </span>
            </div>
            <div class="txt4">
                              <span style="font-weight: 500 !important; font-size: 13px; color: #2f7a63">
                             <i>
                                   (Dori vositalarini <b style="border-bottom: 1px solid black">chakana</b> referent narxdan oshirib sotganligi haqida)
                             </i>
                          </span>
            </div>
          </b-col>
          <b-col cols="1"></b-col>
        </b-row>


        <div class="bg-div" >
          <div class="txt-left">
            ISTE'MOLCHINING MA'LUMOTLARI
          </div>

        </div>

        <b-row style="font-size: 13px !important;">
          <b-col cols="1"></b-col>
          <b-col cols="5">
            <div>
              <p>Familiyasi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                {{ resDate.consumerLastName ? resDate.consumerLastName : '-' }}
                            </span>
              </p>
              <p>Ismi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                {{ resDate.consumerFirstName ? resDate.consumerFirstName : '-' }}
                            </span>
              </p>
              <p>Sharifi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                {{ resDate.consumerMiddleName ? resDate.consumerMiddleName : '-' }}
                            </span>
              </p>
            </div>
          </b-col>
          <b-col cols="1">

          </b-col>
          <b-col cols="5">
            <div>
              <p>JSHSHIR <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                     {{ resDate.consumerPinfl ? resDate.consumerPinfl : '-' }}
                            </span>
              </p>
              <p>Murojaat yuborilgan sana <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                     {{ resDate.createJson ? resDate.createJson : '-' }}
                            </span>
              </p>
              <p>Iste'molchi telefon raqami <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                {{ resDate.consumerPhone ? resDate.consumerPhone : '-' }}
                            </span>
              </p>
            </div>
          </b-col>
        </b-row>


        <div class="bg-div" style="margin-top: -20px">
          <div class="txt-left">
            DORIXONA MA'LUMOTLARI
          </div>

        </div>

        <b-row style="font-size: 13px !important;">
          <b-col cols="1"></b-col>
          <b-col cols="5">
            <div>
              <p>Dorixona nomi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                        {{ resDate.pharmacyName ? resDate.pharmacyName : '-' }}
                            </span>
              </p>
              <p>Dorixona STIRi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                       {{ resDate.pharmacyTin ? resDate.pharmacyTin : '-' }}
                            </span>
              </p>
            </div>
          </b-col>
          <b-col cols="1">

          </b-col>
          <b-col cols="5">
            <div>
              <p>Dorixona joylashgan viloyat <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                      {{ toLatin(resDate.pharmacyRegionName ? resDate.pharmacyRegionName : '-') }}
                            </span>
              </p>
              <p>Dorixona joylashgan shaxar yoki tuman <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                     {{ toLatin(resDate.pharmacyDistrictName ? resDate.pharmacyDistrictName : '-') }}
                            </span>
              </p>
              <p>Dorixona joylashgan manzil <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                {{ toLatin(resDate.pharmacyAddress ? resDate.pharmacyAddress : '-') }}
                            </span>
              </p>

            </div>
          </b-col>
        </b-row>

        <div class="bg-div" style="margin-top: -20px">
          <div class="txt-left">
            DORIXONA DIREKTORI MA'LUMOTLARI
          </div>
        </div>

        <b-row style="font-size: 13px !important;">
          <b-col cols="1"></b-col>
          <b-col cols="5">
            <div>
              <p>Familiyasi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                {{ resDate.medicationFounderLastName ? resDate.medicationFounderLastName : '-' }}
                            </span>
              </p>
              <p>Ismi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                 {{ resDate.medicationFounderFirstName ? resDate.medicationFounderFirstName : '-' }}
                            </span>
              </p>
              <p>Sharifi <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                   {{ resDate.medicationFounderMiddleName ? resDate.medicationFounderMiddleName : '-' }}
                            </span>
              </p>
            </div>
          </b-col>
          <b-col cols="1">

          </b-col>
          <b-col cols="5">
            <div>
              <p>Pasport seriyasi va raqami <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                      {{ resDate.medicationFounderPassport ? resDate.medicationFounderPassport : '-' }}
                            </span>
              </p>
              <p>Direktor telefon raqami <br>
                <span style="font-weight: bold !important; font-size: 13px; color: #2f7a63">
                                     {{ resDate.medicationFounderPhone ? resDate.medicationFounderPhone : '-' }}
                            </span>
              </p>

            </div>
          </b-col>
        </b-row>

        <div class="html2pdf__page-break"></div>

        <div class="bg-div mt-2" >
          <div class="txt-left">
            DORI VOSITASI MA'LUMOTLARI
          </div>

        </div>

        <div style="border: 2px solid #53a299;
    border-radius: 3px; margin-top: 10px">
          <b-row>
            <b-col cols="6">
              <div>
                       <span style="font-size: 13px; color: #53a299">
                        Chek raqami
                   </span>:
                <span class="ml-3" style="font-weight: bold; font-size: 13px; color: #53a299">
                      {{
                    resDate.medications[0] && resDate.medications[0].checkNumber ? resDate.medications[0].checkNumber : '-'
                  }}
                   </span>
              </div>
            </b-col>
            <b-col cols="6" class="text-right">
              <div>
                       <span style=" font-size: 13px; color: #53a299">
                        Sotilgan sanasi
                   </span>:
                <span class="ml-3" style="font-weight: bold; font-size: 13px; color: #53a299">
                      {{
                    resDate.medications[0] && resDate.medications[0].paymentDate ? resDate.medications[0].paymentDate : '-'
                  }}
                   </span>
              </div>
            </b-col>
          </b-row>


          <div style="border-radius: 3px; margin: 0px 15px 0px 15px">
            <table class="table">
              <thead>
              <tr>
                <th class="text-center" style="vertical-align: inherit !important;">#</th>
                <th class="text-center" style="vertical-align: inherit !important;">Dori vositasi nomi</th>
                <th class="text-center" style="vertical-align: inherit !important;">MXIK kodi</th>
                <th class="text-center" style="vertical-align: inherit !important;">Referent narx</th>
                <th class="text-center" style="vertical-align: inherit !important;">Sotilgan narx</th>
                <th class="text-center" style="vertical-align: inherit !important;">Oshirilgan narx</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data, index) in resDate.medications ? resDate.medications: []"
                  :key="index">
                <td class="text-center" style="color: #53a299">{{ index + 1 }}</td>
                <td class="text-center">{{ data.name ? data.name : '-' }}</td>
                <td class="text-center">{{ data.mxikCode ? data.mxikCode : '-' }}</td>
                <td class="text-center">{{
                    formatNumber(data.referentPrice ? data.referentPrice : '-')
                  }}
                </td>
                <td class="text-center">{{
                    formatNumber(data.paymentPrice ? data.paymentPrice : '-')
                  }}
                </td>
                <td class="text-center" style="color: #e84646">
                  {{
                    formatNumber(Math.round((data.paymentPrice - data.referentPrice + Number.EPSILON) * 100) / 100)
                  }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div>
            <b-row>
              <b-col cols="4"></b-col>
              <b-col cols="8" class="text-right">
                               <span class="ml-3" style="font-size: 13px; color: #e84646">
                        Jami oshirilgan narxlar miqdori
                   </span>:
                <span class="ml-3" style="font-weight: bold; font-size: 13px; color: #ff0606">
                      {{
                    formatNumber(Math.round((getTotal(resDate.medications ? resDate.medications : [])) * 100) / 100)
                  }} so'm
                   </span>
              </b-col>
            </b-row>
          </div>
        </div>


        <b-row class="footer-row mt-5   ">
          <b-col cols="9">
            <div class="footer-text" style=" text-align: justify;">
              O‘zbekiston Respublikasi Prezidentining 2022-yil 26-oktyabrdagi "Aholini sifatli dori
              vositalari va tibbiy buyumlar bilan taʼminlash yuzasidan qo‘shimcha chora-tadbirlar
              to‘g‘risida" PQ-411-son Qarorining 5-bandiga asosan, matritsali shtrix kod (QR-kod)
              yordamida skanerlash natijasida dori vositalarining <span style="font-weight: 800 !important;">chakana narxlariga</span> belgilangan ustamalar
              oshirib qo‘llanilganligi sababli tegishli chora ko‘rish uchun bu haqida Raqobat qo‘mitasi va
              uning hududiy organlariga <span style="font-weight: 800 !important;">soliq organlarining maxsus mobil ilovasi </span>  tomonidan avtomatik
              ravishda <span style="font-weight: 800 !important;"> elektron shaklda xabar yuborilgan.</span>
            </div>
          </b-col>
          <b-col cols="1">
            <qr-code :size="120" :text="resDate.qrLink ? resDate.qrLink : ''"></qr-code>
            <!--                        <qrcode-vue :value="resDate.qrLink" size="300" level="H"/>-->
            <!--                        <img style="height: 100px;" class="ml-4" src="./images/qrCOde.png" alt="">-->
          </b-col>
          <b-col cols="1">
            <div class="serial">{{ resDate.mnumber ? resDate.mnumber : '' }}</div>
          </b-col>
          <b-col cols="1"></b-col>
        </b-row>

        <!--            <div class="col-5">-->
        <!--                <div class="footer-text">-->
        <!--                    Mazkur hujjat O‘zbekiston Respublikasi Prezidentining 2021-yil 24-martdagi PF-6191-son farmoniga-->
        <!--                    muvofiq-->
        <!--                    «Elektron hukumat» tizimi idoralararo integratsiyalashuv platformasi orqali shakllantirilgan-->
        <!--                    elektron hujjatning-->
        <!--                    nusxasi bo‘lib, davlat organlari tomonidan ushbu hujjatni qabul qilishni rad etishlari qatʼiyan-->
        <!--                    taqiqlanadi.-->
        <!--                    Hujjat haqiqiyligini ***** veb-manzilida hujjatning noyob raqamini kiritib yoki mobil telefon-->
        <!--                    yordamida QR- kodni-->
        <!--                    skaner qilish orqali tekshirish mumkin.-->
        <!--                    <div class="sub-footer-text">-->
        <!--                        Mazkur ma’lumot faqat kadrlar bilan ishlash jarayonlarida foydalanilishi lozim.-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--                <div class="qr">-->
        <!--                    <img src="./images/qrCOde.png" alt="">-->
        <!--                </div>-->
        <!--                <div class="serial">ADS151513158</div>-->
        <!--            </div>-->
        <!--            <div class="line">1</div>-->
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.8.0/html2pdf.bundle.min.js">
</script>

<script>

var element = document.getElementById('element-to-print');
html2pdf(element, {
  margin:       10,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
});
</script>

<script>
import html2pdf from "html2pdf.js";
// import QrcodeVue from 'qrcode.vue'
import VueQRCodeComponent from 'vue-qrcode-component'

export default {
  props: {
    resDate: {
      type: Object,
      default: () => [],
    }
  },
  components: {
    'qr-code': VueQRCodeComponent
  },
  data() {
    return {
      options: {
        margin: 0.3,
        filename: 'filename.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        }
      }
    }
  },
  methods: {
    getTotal(data) {
      var total = 0
      if (data) {
        for (let i = 0; i < data.length; i++) {
          total += data[i].paymentPrice - data[i].referentPrice
        }
      }
      return total
    },
    generatePdf() {
      var element = document.getElementById("element-to-print");

      var opt = {
        margin: 0.3,
        filename: 'filename.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };

      html2pdf().set(opt).from(element).save();
    }
  },
}
</script>

<style lang="css" scoped>
.user-image {
  /*position: relative;*/
  height: 250px;
  width: 200px;
  border-radius: 8px;
  margin: 0;
  position: absolute;
  top: 70%;
  transform: translateY(-85%);
}

.text-color-header-left {
  margin-left: -40px;
  font-weight: bold;
  color: black
}

.text-color-header-right {
  margin-left: 20px;
  font-weight: bold;
  color: black
}

.container-main {
  border: 1px solid #006100;
  border-radius: 10px;
  margin: 30px 360px 0px 360px;
}

.container {
  width: 850px;
  position: relative;
  padding: 5rem 8rem 0rem 5rem;
  background-image: url("../images/bg.png");
  background-repeat: no-repeat;
  background-position: 45% 30% !important;
  background-size: 65%;
  /*height: 842px;*/
  font-family: sans-serif;
}

.card-header {
  padding-top: -80px !important;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-right: 220px;
  background-color: #FFFFFF;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*padding: 0 7rem;*/
  width: 100%;
}

.body {
  padding-bottom: 1rem;
}

.line1 {
  background: linear-gradient(86deg, #2C665A 0%, #0F977B 100%);
  width: 100%;
  height: 10px;
  transform: skew(313deg);
}

.line2 {
  width: 40px;
  height: 80px;
  background: linear-gradient(86deg, #2C665A 0%, #0F977B 100%);
  transform: skewX(325deg);
  position: absolute;
  right: 260px;
}

.line3 {
  width: 40px;
  height: 80px;
  background: linear-gradient(86deg, #2C665A 0%, #0F977B 100%);
  transform: skewX(325deg);
  position: absolute;
  right: 200px;
}

.line4 {
  width: 40px;
  height: 80px;
  background: linear-gradient(86deg, #2C665A 0%, #0F977B 100%);
  transform: skewX(325deg);
  position: absolute;
  right: 140px;
}

.left-img {
  width: 110px;
  height: 110px;
}

.right-img {
  width: 110px;
  height: 110px;
  margin-left: 20px;
}

.center-img {
  width: 100px;
  height: 100px;
}

.one-line-txt {
  display: flex;
  justify-content: space-around;
}

.txt1, .txt2 {
  width: 200px;
  font-weight: bold;
}

.txt1 {
  text-align: start;
}

.txt2 {
  text-align: end;
}

.txt3, .txt4 {
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  color: #3A9378;
}

.txt4 {
  color: #3A9378;
}

.bg-div {
  background: linear-gradient(86deg, #2C665A 0%, #0F977B 100%);
  transform: skewX(330deg);
  align-items: center;
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  height: 35px;
  margin: 0px 0;
}

.bg-div1 {
  background: linear-gradient(86deg, #2C665A 0%, #0F977B 100%);
  transform: skewX(337deg);
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin: 60px 0;
}

.txt-left {
  text-align: start;
  color: #FFFFFF;
  font-family: sans-serif;
  font-weight: bold;
  transform: skewX(22deg);
  /* padding: 0.5rem; */
  margin: 0 40px;
}

.txt-right {
  text-align: end;
  color: #000000;
  background-color: #BAEFE4;
  transform: skewX(22deg);
  padding: 5px;
  border-radius: 3px;
  margin: 0 40px;
}


.icon {
  font-size: 180px;
  color: #afecde;
  margin-top: 30px;
  padding: 0 10px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  /*height: 350px;*/
  /*padding: 1rem;*/
  align-items: center;
}

.col-2 p, h4 {
  margin: 5px 0;
}

.col-3 p {
  margin: 7px 0;
}

.col-4 p, h4 {
  margin: 5px 0;
}

.col-4 {
  padding: 0 0 10% 0;
}

.col-5 {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.footer-text {
  font-size: 12px;
  font-weight: 400;
}

.sub-footer-text {
  margin-top: 15px;
}

.line {
  border-bottom: 1px solid #000000;
  margin-bottom: 10px;
  text-align: end;
  margin-top: 50px;
}

.serial {
  position: absolute;
  transform: rotateZ(269deg);
  right: -120px;
  margin-top: -20px;
  font-size: 15px;
  font-family: sans-serif;
  font-weight: bold;
}

p {
  color: #0F977B;
}

table  {
  border: 1px solid #DBDBDB;
}

thead th {
  border: 1px solid #DBDBDB;
  padding: 3px;
}

tbody td {
  padding: 3px;
  border: 1px solid #DBDBDB;
}

tbody td {

  padding: 3px;
}
</style>