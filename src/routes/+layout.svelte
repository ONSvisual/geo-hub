<script>
  import "@onsvisual/svelte-components/css/main.css";
  import "../app.css";
  import { page } from '$app/stores';
  import { PhaseBanner, AnalyticsBanner, Header, Main, Footer } from "@onsvisual/svelte-components";
  // import CensusBanner from "$lib/layout/CensusBanner.svelte";
	
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
<PhaseBanner phase="Beta"/>
<Header {lang}/>
<!-- <CensusBanner/> -->

<Main>
  <slot/>
</Main>

<Footer theme="dark"/>

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