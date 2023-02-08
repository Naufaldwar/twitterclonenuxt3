<template>
    <NuxtLink to="#" class="flex items-center p-3 rounded-full w-min hover:bg-gray-200 text-black dark:hover:bg-dim-200 dark:text-white" :class="defaultTransition">
        <div class="w-6 h-6 text-dark">
            <slot name="icon"></slot>
        </div>
        <div class="ml-4 text-xl hidden xl:block" :class="textClasses">
            <slot name="name"></slot>
        </div>
    </NuxtLink>
</template>
<script setup>
const {defaultTransition} = useTailwindConfig()

const props = defineProps({
    active:{
        type: Boolean,
        default: false
    }
})

const textClasses = computed (() => props.active? 'font-semibold': 'font-normal')
</script>