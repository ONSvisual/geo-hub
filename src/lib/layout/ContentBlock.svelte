<script>
  export let title;
  export let unit;
</script>

<div class="content-block">
  <h3 class="content-subhead">{title} <span>{unit}</span></h3>
  <slot/>
</div>

<style>
  .content-block {
    border: 1px solid #999;
    border-radius: 3px;
    padding: 8px;
  }
  h3.content-subhead {
    display: inline-block;
    font-size: 18px;
  }
  h3.content-subhead > span {
    font-size: 16px;
    font-weight: normal;
  }
</style>