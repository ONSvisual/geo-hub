<script>
  import CensusLogo from "./partial/CensusLogo.svelte";

  export let baseurl = "//www.ons.gov.uk";
</script>

<div class="promo__background--plum-gradient">
  <div class="wrapper">
    <div class="banner--half-padding">
      <span class="margin-top--0 margin-bottom--0 padding-bottom--0 padding-top--0 flex flex-col flex-wrap-wrap banner--vertical-center">
        <a class="flex" alt="Census 2021" href="{baseurl}/census" style:margin-right="16px">
          <CensusLogo/>
        </a>
        <a class="margin-top--0 text--white font-size--18 underline-link" href="{baseurl}/census">Data and analysis from Census 2021</a>
      </span>
    </div>
  </div>
</div>