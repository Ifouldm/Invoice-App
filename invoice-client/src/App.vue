<template>
    <div class="page-layout">
        <Navigation />
        <router-view class="main" v-slot="{ Component }">
            <transition :name="transitionName">
                <component :is="Component" />
            </transition>
        </router-view>
        <Notification message="added" />
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
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.75s ease-out;
}

.slide-left-enter-to {
    position: absolute;
    right: 0;
}

.slide-left-enter-from {
    position: absolute;
    right: -100%;
}

.slide-left-leave-to {
    position: absolute;
    left: -100%;
}

.slide-left-leave-from {
    position: absolute;
    left: 0;
}

.slide-right-enter-to {
    position: absolute;
    left: 0;
}

.slide-right-enter-from {
    position: absolute;
    left: -100%;
}

.slide-right-leave-to {
    position: absolute;
    right: -100%;
}

.slide-right-leave-from {
    position: absolute;
    right: 0;
}
</style>
