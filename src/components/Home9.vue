<template>
    <div id="home1">
        <navbar></navbar>

        <hero-section9></hero-section9>
        
        <services></services>
        
        <about></about>

        <web-configuration></web-configuration>

        <pricing></pricing>

        <testimonial2></testimonial2>

        <start-process></start-process>

        <testimonial></testimonial>

        <get-started></get-started>

        <blog></blog>

        <contact></contact>

        <social></social>

        <footer-section></footer-section>
        
        <footer-alter></footer-alter>

        <switcher />
    </div>
</template>

<script>
import Navbar from './Elements/Navbar.vue'
import HeroSection9 from './Sections/HeroSection9.vue'
import Services from './Sections/Services.vue'
import About from './Sections/About.vue'
import WebConfiguration from './Sections/WebConfiguration.vue'
import Pricing from './Sections/Pricing.vue'
import Testimonial2 from './Sections/Testimonial2.vue'
import StartProcess from './Sections/StartProcess.vue'
import Testimonial from './Sections/Testimonial.vue'
import GetStarted from './Sections/GetStarted.vue'
import Blog from './Sections/Blog.vue'
import Contact from './Sections/Contact.vue'
import Social from './Sections/Social.vue'
import FooterSection from './Elements/FooterSection.vue'
import FooterAlter from './Elements/FooterAlter.vue'
import Switcher from './Elements/Switcher.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    HeroSection9,
    Services,
    About,
    WebConfiguration,
    Pricing,
    Testimonial2,
    StartProcess,
    Testimonial,
    GetStarted,
    Blog,
    Contact,
    Social,
    FooterSection,
    FooterAlter,
    Switcher
  }
}

</script>
