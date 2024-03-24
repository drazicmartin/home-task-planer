<script>
    import "../app.pcss";
    import { Toast, initializeStores } from '@skeletonlabs/skeleton';
    import { Modal } from '@skeletonlabs/skeleton';
    import { page } from "$app/stores";
    
    initializeStores();

    let links = [
        {
            href: "/",
            name: "Taches"
        },
        {
            href: "/history",
            name: "Historiques"
        },
        {
            href: "/pb/_",
            name: "Backend"
        },
        {
            href: "/grafana",
            name: "Grafana"
        },
    ]
</script>

<Modal />
<Toast />

<header>
    <nav class="relative w-full px-4 py-5 flex justify-between items-center bg-white z-10">
        <ul class="flex absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 mx-auto items-center w-auto space-x-6">
            {#each links as link, idx}
                <li><a class={`text-sm ${(link.href == $page.url.pathname) ? "font-bold" : "text-gray-400 hover:text-gray-500"}`} href={link.href}>{link.name}</a></li>
                {#if idx != links.length-1}
                    <li class="text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </li>
                {/if}
            {/each}
        </ul>
    </nav>
</header>

<slot/>
