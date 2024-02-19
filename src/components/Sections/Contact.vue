<template>
    <!-- CONTACT FORM START-->
        <section class="section scroll-select" id="contact">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <h1 class="section-title text-center">Get In Touch</h1>
                        <div class="section-title-border margin-t-20"></div>
                        <p class="section-subtitle text-muted text-center font-secondary padding-t-30">We thrive when coming up with innovative ideas but also understand that a smart concept should be supported with measurable results.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="mt-4 pt-4">
                            <p class="mt-4"><span class="h5">Office Address 1:</span><br> <span class="text-muted d-block mt-2">4461 Cedar Street Moro, AR 72368</span></p>
                            <p class="mt-4"><span class="h5">Office Address 2:</span><br> <span class="text-muted d-block mt-2">2467 Swick Hill Street <br/>New Orleans, LA 70171</span></p>
                            <p class="mt-4"><span class="h5">Working Hours:</span><br> <span class="text-muted d-block mt-2">9:00AM To 6:00PM</span></p>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="custom-form mt-4 pt-4">
                            <div id="message"></div>
                            <form method="post" action="php/contact.php" name="contact-form" id="contact-form">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group mt-2">
                                            <input name="name" id="name" type="text" class="form-control" placeholder="Your name*" >
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group mt-2">
                                            <input name="email" id="email" type="email" class="form-control" placeholder="Your email*" >
                                        </div>
                                    </div>                                
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group mt-2">
                                            <input type="text" class="form-control" id="subject" placeholder="Your Subject.." />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group mt-2">
                                            <textarea name="comments" id="comments" rows="4" class="form-control" placeholder="Your message..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 text-right">
                                        <input type="submit" id="submit" name="send" class="submitBnt btn btn-custom" value="Send Message">
                                        <div id="simple-msg"></div>
                                    </div>
                                </div>
                            </form>
                        </div>  
                    </div>
                </div>
            </div>
        </section> 
        <!-- CONTACT FORM END-->
</template>

<script>
export default {
  name: 'Contact',
  props: {
  }
}
</script>