<script>
    import "../app.pcss";
    import { Toast, initializeStores } from '@skeletonlabs/skeleton';
    import { Modal } from '@skeletonlabs/skeleton';
    
    initializeStores();
</script>

<Modal />
<Toast />

<header>
    <nav class="relative px-4 py-4 flex justify-between items-center bg-white">
        <ul class="flex absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 mx-auto items-center w-auto space-x-6">
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/">Taches</a></li>
            <li class="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </li>
            <li><a class="text font-bold" href="/history">Historique</a></li>
            <li class="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </li>
            <li><a class="text-sm text-gray-400 hover:text-gray-500" href="/_">Backend</a></li>
        </ul>
    </nav>
</header>

<slot></slot>
