<template>
    <transition name="notes">
        <div class="notification" v-if="visible">
            {{ message }}
        </div>
    </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const message = computed(() => store.state.notificationText);
        const visible = computed(() => store.state.notificationVisible);
        return { visible, message };
    },
});
</script>

<style lang="scss" scoped>
.notification {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 100px;
    margin-right: 50px;
    margin-bottom: 50px;
    background-color: var(--DarkBlue);
    color: var(--White);
    border-radius: 0.5rem;
    padding: 1rem;
}

.notes-enter-active {
    transform-origin: bottom right;
    animation: appear 2s ease;
}

.notes-leave-active {
    transform-origin: bottom right;
    animation: disappear 2s ease;
}

@keyframes appear {
    0% {
        opacity: 0;
        transform: scale(0, 0);
    }
    100% {
        transform: scale(1, 1);
    }
}

@keyframes disappear {
    0% {
        transform: scale(1, 1);
    }
    100% {
        opacity: 0;
        transform: scale(0, 0);
    }
}
</style>
