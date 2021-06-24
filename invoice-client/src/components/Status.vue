<template>
    <span class="status" :class="status">●&nbsp;{{ status }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        status: {
            validator(value: string) {
                return (
                    ['paid', 'unpaid', 'pending', 'draft'].indexOf(value) !== -1
                );
            },
            default: 'unpaid',
        },
    },
});
</script>

<style lang="scss" scoped>
.status {
    text-align: center;
    padding: 0.8rem;
    background-color: var(--DarkBlueEmphasis);
    font-weight: 700;
}

.status.paid {
    color: var(--GreenDone);
    background-color: #1f2c3f;
}

.status.unpaid {
    color: var(--RedWarning);
    background-color: #2a2735;
}

.status.pending {
    color: var(--AmberPending);
    background-color: #2b2735;
}

.status.draft {
    color: var(--White);
    background-color: #2a2c43;
}
</style>
