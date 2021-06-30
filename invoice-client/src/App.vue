<template>
    <div class="page-layout">
        <Navigation />
        <div class="main">
            <router-view v-slot="{ Component }">
                <transition :name="transitionName">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <Notification />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Notification from './components/Notification.vue';

export default defineComponent({
    setup() {
        const router = useRouter();
        const transitionName = ref('');

        watch(router.currentRoute, (curr, prev) => {
            const routes = router.getRoutes();
            const currInd = routes.findIndex(
                (route) => route.path === curr.path
            );
            const prevInd = routes.findIndex(
                (route) => route.path === prev.path
            );
            transitionName.value =
                currInd < prevInd ? 'slide-right' : 'slide-left';
        });

        return {
            transitionName,
        };
    },
    components: {
        Navigation,
        Notification,
    },
});
</script>

<style lang="scss" scoped>
.page-layout {
    display: flex;
    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
}

.main {
    position: relative;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
}

.slide-left-enter-active,
.slide-right-enter-active {
    transition: all 0.75s 0.2s ease;
}
.slide-left-leave-active,
.slide-right-leave-active {
    transition: all 0.75s ease;
}

.slide-left-enter-from {
    position: absolute;
    transform: translateX(100%);
}

.slide-left-leave-to {
    position: absolute;
    transform: translateX(-100%);
}

.slide-right-enter-from {
    position: absolute;
    transform: translateX(-100%);
}

.slide-right-leave-to {
    position: absolute;
    transform: translateX(100%);
}
</style>
