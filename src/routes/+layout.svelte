<script>
  import "../app.css";
  import { page } from '$app/stores';
  import { base } from "$app/paths";
	import { setContext } from "svelte";
	import { themes } from "$lib/config";
  import PhaseBanner from "$lib/layout/PhaseBanner.svelte";
	import ONSFooter from "$lib/layout/ONSFooter.svelte";
  import AnalyticsBanner from "$lib/layout/AnalyticsBanner.svelte";
  import ONSHeader from "$lib/layout/ONSHeader.svelte";
	
  // For localisation of menu etc
  let path = $page.url.pathname;
  let lang = $page.url.hostname.split(".")[0] == "cy" ? "cy" : "en";
  let baseurl = lang == "cy" ? "//cy.ons.gov.uk" : "//www.ons.gov.uk";

  // STYLE CONFIG
  // Set theme globally (options are 'light' or 'dark', defined in config.js)
  let theme = "light";
  setContext("theme", themes[theme]);

  // GOOGLE ANALYTICS
  // Settings for page analytics. Values must be shared with <AnalyticsBanner> component
  const analyticsId = "GTM-MBCBVQS";
  const analyticsProps = {
    "contentTitle": "Census area profiles - prototype",
    "releaseDate": "20220624",
    "contentType": "exploratory"
  };

  const survey_url = "https://www.surveymonkey.co.uk/r/N3FKCL9";
</script>

<AnalyticsBanner {analyticsId} {analyticsProps}/>
<PhaseBanner url={survey_url}/>
<ONSHeader/>

<!-- <header style:background-color="#206095" style:color="white">
  <div class="wrapper">
    <h1 class="title">Area hub</h1>
  </div>
</header> -->

<main id="main" tabindex="-1">
  <slot/>
</main>

<ONSFooter/>

<style>
  h1 {
    font-size: 32px;
    line-height: 42px;
    font-weight: bold;
    margin: 26px 0;
    padding: 0;
  }
  /* .subhead {
    font-size: 18px;
    line-height: 28px;
    margin: 0 0 28px 0;
    padding: 0;
  } */
  p.footer-text {
    font-size: 1.1em;
    margin: 0;
    padding: 40px 0 5px 0;
  }
  p.footer-text + p.footer-text {
    padding-top: 10px;
  }
</style>