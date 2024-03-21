<script lang="ts">
    export let data;

    let items = data.items;
</script>

<div class="background snap-x scroll-px-4 snap-mandatory scroll-smooth gap-1 overflow-x-auto px-4">
   {#each items as item}
      <div class="my-3">
         <div class="flex items-center p-3 space-x-4 rtl:space-x-reverse card variant-glass-success capitalize">
            <div class="flex-1 min-w-0">
               <p class="text-xl font-medium text-emerald-950 truncate">
                  {item.expand?.task?.name ?? "TASK_NAME"}
               </p>
               <div class="inline-flex items-center px-2 text-xl font-semibold text-gray-50">
                  <p class="text-sm text-gray-950 truncate">
                     - {item.expand?.user?.name ?? "USER_NAME"}
                  </p>
                  <p class="text-sm px-5 text-gray-800 truncate">
                     - {new Date(item.created).toLocaleString() ?? "DATE"} -
                  </p>
               </div>
            </div>
            <button class="btn-icon btn-icon-sm variant-ghost-surface items-center px-2 text-xl font-semibold text-emerald-950">
               {item.score}  
            </button>
         </div>
      </div>
   {/each}
</div>

<style>
   .background {
      width: 100%;
      background: url('https://i.imgur.com/DdrZVb7.gif');
      background-position: center center; /* Center the background image horizontally and set it 10% from the top */
      background-size: cover; /* Make the background image cover the entire container */
      background-repeat: no-repeat; /* Prevent the background image from repeating */
      /* Other styles */
      height: 100vh; /* Set the height of the container */
   }
</style>