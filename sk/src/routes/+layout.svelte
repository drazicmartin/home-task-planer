<script>
    import "../app.pcss";
    import { Toast, initializeStores } from '@skeletonlabs/skeleton';
    import { Modal } from '@skeletonlabs/skeleton';
    
    initializeStores();
</script>

<Modal />
<Toast />
<slot></slot>

