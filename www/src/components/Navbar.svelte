<script>
    import { page } from "$app/stores";
  
    const menus = [
      {name: "Home", url: "/"},
      {name: "Map", url: "/map"},
    ]
  
    $: currentPage = $page.url.pathname; //should be reactive
  </script>

  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">FarmSim Status</a>
        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                {#each menus as { url, name }}
                <li class="nav-item">
                    <a
                        class="nav-link"
                        class:active={url === currentPage}
                        href="{url}">{name}</a>
                </li>
              {/each}
            </ul>
        </div>
    </div>
</nav>