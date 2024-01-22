<script>
  import { base } from "$app/paths";
  import { beforeNavigate } from "$app/navigation";
  import { capitalise } from "@onsvisual/robo-utils";
  import { Section, Button } from "@onsvisual/svelte-components";
  import Icon from "$lib/ui/Icon.svelte";

  export let data;
  export let compact = false;
  export let title = "Fina a dataset";

  let open = false;

  beforeNavigate(() => open = false);
</script>

<Section {title} theme="dark" background="#003c57" width="wide" marginTop>
  {#each data.topics as topic, i}
  <div class:visuallyhidden={!(open || (!compact && i === 0))}>
    <h3 class="title-indicators">{capitalise(topic)}</h3>
    <ul class="list-columns list-indicators">
      {#each data.indicators.filter(ind => ind.topic === topic) as ind}
        <li>
          <a href="{base}/datasets/{ind.code}/" class="indicator-link">
            <span>{ind.label}</span>
            <Icon type="chevron" margin="4px 0 0"/>
          </a>
          {ind.subtitle}
        </li>
      {/each}
    </ul>
  </div>
  {/each}
  <Button variant="ghost" on:click={() => open = !open} small>
    {compact && open ? "Hide datasets" : compact ? "Show datasets" : open ? "Show fewer datasets" : `Show all ${data.indicators.length} datasets`}
    <Icon type="chevron" rotation={open ? 90 : -90}/>
  </Button>
</Section>