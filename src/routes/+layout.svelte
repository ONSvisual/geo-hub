<script>
  import "../app.css";
  import { page } from '$app/stores';
  import PhaseBanner from "$lib/layout/PhaseBanner.svelte";
	import ONSFooter from "$lib/layout/ONSFooter.svelte";
  import AnalyticsBanner from "$lib/layout/AnalyticsBanner.svelte";
  import ONSHeader from "$lib/layout/ONSHeader.svelte";
  import CensusBanner from "$lib/layout/CensusBanner.svelte";
	
  // For localisation of menu etc
  $: lang = $page.url.hostname.split(".")[0] === "cy" ? "cy" : "en";

  // GOOGLE ANALYTICS
  // Settings for page analytics. Values must be shared with <AnalyticsBanner> component
  const analyticsId = "GTM-MBCBVQS";
  const analyticsProps = {
    "contentTitle": "Area hub",
    "releaseDate": "20230117",
    "outputSeries": "areahub",
    "contentType": "exploratory"
  };
</script>

<AnalyticsBanner {analyticsId} {analyticsProps}/>
<PhaseBanner url="https://www.ons.gov.uk/feedback"/>
<ONSHeader {lang}/>
<CensusBanner/>

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