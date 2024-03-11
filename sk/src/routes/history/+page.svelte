<script lang="ts">
    export let data;

    let items = data.items;
</script>

<div class="justify-center">
    <ul class="divide-y">
        {#each items as item}
        <li class="pb-1">
           <div class="flex items-center p-3 space-x-4 rtl:space-x-reverse bg-orange-600">
              <div class="flex-1 min-w-0">
                 <p class="text-xl font-medium text-gray-950 truncate dark:text-white">
                    {item.expand?.task.name}
                 </p>
                 <div class="inline-flex items-center px-2 text-xl font-semibold text-gray-950 dark:text-white">
                     <p class="text-sm text-gray-800 truncate dark:text-gray-400">
                        {item.expand?.user.name}
                     </p>
                     <p class="text-sm px-5 text-gray-800 truncate dark:text-gray-400">
                        {new Date(item.created).toLocaleString()}
                     </p>
                </div>
              </div>
              <div class="inline-flex items-center px-2 text-xl font-semibold text-gray-950 dark:text-white">
                {item.score} pts
              </div>
           </div>
        </li>
        {/each}
     </ul>
</div>
 