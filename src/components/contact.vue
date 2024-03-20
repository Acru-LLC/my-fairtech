<script>
export default {};
</script>

<template>
  <div>
    <section class="green-gradient-bg p-3 d-flex">
      <div class="container">
        <b-row>
          <b-col>
            <hr class="bg-white" style="height: 2px">
          </b-col>

          <b-col>
            <h3 class="section-title text-center text-white">
              <span class="d-none d-sm-inline">{{ $t('contact.title') }}</span> <!-- Display only on screens larger than or equal to small (sm) -->
              <span class="d-inline d-sm-none" style="font-size: 16px">{{ $t('contact.title') }}</span> <!-- Display only on screens smaller than small (sm) -->
            </h3>
          </b-col>

          <b-col>
            <hr class="bg-white" style="height: 2px">
          </b-col>
        </b-row>
      </div>
    </section>
    <!-- CONTACT FORM START-->
    <section class="section" id="contact">
      <div class="container">
        <b-row cols="12">
          <b-col cols="12" lg="5" style="box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px; border-radius: 5px">
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <img width="25" height="25" src="@/assets/image/location.svg" alt="">
              </div>
              <div>
                <p class="mt-4">
                  <span class="h4 font-weight-bold text-color">{{ $t('contact.address_title') }}</span>
                  <br/>
                  <span
                      class="d-block text-color">{{ $t('contact.address') }}</span>
                </p>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <img width="25" height="25" src="@/assets/image/message.svg" alt="">
              </div>
              <div>
                <p class="mt-4">
                  <span class="h4 font-weight-bold text-color">{{ $t('contact.email') }}</span>
                  <br/>
                  <span
                      class="d-block text-color">info@antimon.gov.uz</span>
                </p>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <img width="25" height="25" src="@/assets/image/messages-group.svg" alt="">
              </div>
              <div>
                <p class="mt-4">
                  <span class="h4 font-weight-bold text-color">{{ $t('contact.citizens_email') }}</span>
                  <br/>
                  <span
                      class="d-block text-color">info@antimon.gov.uz</span>
                </p>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="mr-3">
                <img width="25" height="25" src="@/assets/image/telegram.svg" alt="">
              </div>
              <div>
                <p class="mt-4">
                  <span class="h4 font-weight-bold text-color">{{ $t('contact.telegram') }}</span>
                  <br/>
                  <a href="https://t.me/RaqobatGovUz"
                     target="_blank"
                      class="d-block text-color">@RaqobatGovUz</a>
                </p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" lg="7" class="mt-lg-4">
            <form method="post" name="contact-form" id="contact-form"
                  style="box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px; border-radius: 5px" class="p-3">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.361650637049!2d69.26273495463661!3d41.32274863436962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba60f739dff%3A0xf5893ba8065e084!2sCommittee%20for%20the%20Development%20of%20Competition%20and%20Protection%20of%20Consumer%20Rights%20of%20the%20Republic%20of%20Uzbekistan!5e0!3m2!1sen!2sus!4v1709115506007!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </form>
          </b-col>
        </b-row>
      </div>
    </section>
    <!-- CONTACT FORM END-->

    <!--START SOCIAL-->
    <!--END SOCIAL-->
  </div>
</template>
