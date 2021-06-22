<template>
    <div class="wishlists">
        <div class="row">
            <div class="header">
                <h1>Wishlists</h1>
                <h5>There are {{ wishlists.length }} total wishlists</h5>
            </div>
            <router-link class="button add" to="EditWishlist">
                New Wishlist
            </router-link>
        </div>
        <transition name="error">
            <div v-show="showErr" class="error">ERROR</div>
        </transition>
        <div
            class="wishlist-card"
            v-for="wishlist in wishlists"
            :key="wishlist._id"
        >
            <span class="name">{{ wishlist.wishlistName || 'default' }}</span>
            <span class="qty">Number of items: {{ wishlist.qty }}</span>

            <router-link
                class="details"
                :to="{
                    path: 'Wishlist',
                    query: { name: wishlist.wishlistName },
                }"
                >Details &#62;
            </router-link>
        </div>
        <button @click="showErr = !showErr">Error</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import axios from 'axios';

export default defineComponent({
    setup() {
        const apiAddress = process.env.VUE_APP_API_URL;

        type wishlistType = { wishlistName: string; qty: number };
        const wishlists = ref([] as Array<wishlistType>);
        const showErr = ref(false);

        const getwishlists = function () {
            axios
                .get(`${apiAddress}/wishlists`)
                .then((res) => {
                    wishlists.value = res.data.map(
                        (line: { _id: string; count: number }) => {
                            return { wishlistName: line._id, qty: line.count };
                        }
                    );
                })
                .catch((err) => console.error(err));
        };

        onMounted(getwishlists);

        return { wishlists, showErr };
    },
});
</script>

<style scoped>
.Wishlists {
    width: 100%;
}

.wishlist-card {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--DarkBlue);
    border-radius: 0.5rem;
    margin: 1rem 0;
    padding: 1.2rem;
    font-size: 0.8rem;
}

.error-enter-active {
    animation: wobble 1s ease-in-out;
}

.error-leave-active {
    transition: all 2s ease-in-out;
}

@keyframes wobble {
    0% {
        transform: translateY(-60px);
        opacity: 0;
    }
    50% {
        transform: translateY(0);
        opacity: 1;
    }
    60% {
        transform: translateX(8px);
    }
    70% {
        transform: translateX(-8px);
    }
    80% {
        transform: translateX(4px);
    }
    90% {
        transform: translateX(-4px);
    }
    100% {
        transform: translateX(0);
    }
}

.row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.details {
    padding: 1rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--PurpleAccent);
}

h1 {
    color: var(--White);
}

h5 {
    color: var(--LightGrey);
}
</style>
