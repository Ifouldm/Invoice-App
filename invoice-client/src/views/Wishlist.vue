<template>
    <div class="wishlist">
        <div @click.prevent="$router.back()" class="back-btn">
            &#60; Go back
        </div>
        <div class="toolbar">
            <div class="start">
                <h3 class="name">{{ $route.query.name || 'default' }}</h3>
            </div>
            <div class="end">
                <router-link class="button dark" to="QuickEditWishlist">
                    Quick Edit
                </router-link>
                <router-link class="button dark" to="EditWishlist">
                    Edit Details
                </router-link>
                <div class="button warning" @click="deleteWishlist()">
                    Delete
                </div>
                <div class="button" @click="markPaid()">Mark as Paid</div>
            </div>
        </div>
        <div class="wishlist-data">
            <div class="card">
                <span>Product</span>
                <span>Quantity</span>
                <span @click="sortByPrice">
                    Price {{ order === 'des' ? '&darr;' : ''
                    }}{{ order === 'asc' ? '&uarr;' : '' }}
                </span>
                <span>Link</span>
            </div>
            <transition-group name="sort-list" appear>
                <div class="card" v-for="item in wishlist" :key="item._id">
                    <span class="data">{{ item.itemName }} </span>
                    <span class="data">{{ item.quantity }} </span>
                    <span class="data">£{{ item.price }} </span>
                    <span class="data">
                        <a :href="item.link">link</a>
                    </span>
                </div>
            </transition-group>
            <div class="card">
                <h3>Total</h3>
                <h3>£{{ getTotal() }}</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import axios from 'axios';
import { Wishlist } from '../types';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const apiAddress = '/api';

export default defineComponent({
    setup() {
        const wishlist = ref([] as Array<Wishlist>);
        const order = ref('');
        const route = useRoute();
        const store = useStore();

        const getTotal = function () {
            return wishlist.value.reduce(
                (cumm, val) => (cumm += val.quantity * val.price),
                0
            );
        };

        const getWishlist = function () {
            axios
                .get(`${apiAddress}/wishlist?name=${route.query.name}`)
                .then((res) => {
                    wishlist.value = res.data;
                })
                .catch((err) =>
                    store.dispatch(
                        'notification',
                        'Error loading wishlist: ' + err
                    )
                );
        };

        const sortByPrice = function () {
            order.value === '' || order.value === 'asc'
                ? (order.value = 'des')
                : (order.value = 'asc');
            wishlist.value = wishlist.value.sort((a, b) =>
                order.value === 'des' ? b.price - a.price : a.price - b.price
            );
        };

        onMounted(getWishlist);

        return {
            wishlist,
            getTotal,
            sortByPrice,
            order,
        };
    },
});
</script>

<style lang="scss" scoped>
.back-btn {
    align-self: flex-start;
    padding: 1rem;
    font-weight: 700;
    color: var(--White);
    cursor: pointer;
}

.back-btn::first-letter {
    color: var(--PurpleAccent);
}

.sort-list-move {
    transition: all 1s ease;
}

.toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--DarkBlue);
    padding: 1rem 2rem;

    .end {
        display: flex;
    }
}

.name {
    color: var(--White);
}

.wishlist-data {
    width: 100%;
}

.card {
    padding: 1rem;
    margin: 1rem 0;
    width: 100%;
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: var(--DarkBlue);
}

.card.total {
    background-color: var(--VeryDarkBlue);
}
</style>
