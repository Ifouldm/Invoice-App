<template>
    <div class="filter">
        <label for="filterSelect">Filter By:&nbsp;</label>
        <select
            id="filterSelect"
            v-model="selected"
            @change="$emit('selected', selected)"
        >
            <option disabled value="">Please select</option>
            <option
                v-for="status in statusOptions"
                :key="status"
                :value="status"
            >
                {{ status }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    emits: ['selected'],
    setup() {
        const selected = ref('');
        const statusOptions = ref([
            'all',
            'paid',
            'unpaid',
            'pending',
            'draft',
        ]);
        return { statusOptions, selected };
    },
});
</script>

<style lang="scss" scoped>
.filter {
    font-weight: 700;
    color: var(--White);
}

select {
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: none;
    color: var(--White);
    background-color: var(--DarkBlue);
}

select:focus {
    border: none;
}

select > option {
    border: none;
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    color: var(--White);
    background-color: var(--DarkBlue);
}
</style>
