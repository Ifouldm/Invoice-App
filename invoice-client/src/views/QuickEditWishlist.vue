<template>
    <div>
        <form @submit.prevent="submitForm" class="wishlist">
            <div class="section">
                <div class="section-heading">Wishlist</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Wishlist Name</label>
                        <input v-model.trim="wishlistName" type="text" />
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-heading">Wishlist Items</div>
                <div class="row">
                    <span>Line No</span>
                    <span>Product</span>
                    <span>Price</span>
                </div>
                <div class="row" v-for="(listLine, index) in list" :key="index">
                    <div class="line-no">{{ index }}</div>
                    <div class="form-field">
                        <input
                            class="item-name"
                            v-model.trim="list[index].itemName"
                            type="text"
                        />
                    </div>
                    <div class="form-field">
                        <input v-model.number="list[index].price" type="text" />
                    </div>
                    <input v-model="list[index].wishlistName" type="hidden" />
                    <input v-model="list[index].dateAdded" type="hidden" />
                    <input
                        v-model.number="list[index].quantity"
                        type="hidden"
                    />
                </div>
            </div>
            <div class="section">
                <span class="button muted" @click="back">Cancel</span>
                <input type="submit" class="button" value="Save Changes" />
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { Wishlist } from '../types';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const apiAddress = process.env.VUE_APP_API_URL || '/api';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const wishlistName = ref(route.query.id || '');
        const list = ref(
            Array.of(
                {
                    itemName: '',
                    quantity: 1,
                    price: 0,
                },
                {
                    itemName: '',
                    quantity: 1,
                    price: 0,
                },
                {
                    itemName: '',
                    quantity: 1,
                    price: 0,
                }
            ) as Array<Wishlist>
        );

        const back = function () {
            router.back();
        };

        const submitForm = function () {
            if (route.query.id) {
                // send edit req
            } else {
                const listSubmit = list.value.filter((a) => a.itemName !== '');
                listSubmit.forEach(
                    (item) => (item.wishlistName = '' + wishlistName.value)
                );
            }
        };

        onMounted(() => {
            if (route.query.id) {
                axios
                    .get(`${apiAddress}/wishlist?id=${route.query.id}`)
                    .then((res) => {
                        list.value = res.data;
                    })
                    .catch((err) =>
                        store.dispatch(
                            'notification',
                            'Error loading wishlist: ' + err
                        )
                    );
            }
        });

        return {
            wishlistName,
            back,
            submitForm,
            list,
        };
    },
});
</script>

<style lang="scss" scoped>
.wishlist {
    width: 100%;
}

label {
    display: block;
}

.row {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    gap: 1rem;
}

.line-no {
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-name {
    width: 100%;
}

.form-row {
    width: 100%;
    display: flex;
    gap: 1rem;
}

.form-field {
    margin: 1rem 0;
}

.section {
    margin: 2rem 0;

    .section-heading {
        margin: 1rem 0;
        font-weight: 700;
        color: var(--PurpleAccent);
    }

    .section-subheading {
        font-weight: 700;
        color: var(--Grey);
    }

    .items-grid {
        display: grid;
        grid-template-columns: 4fr 1fr 2fr 2fr 1fr;
        gap: 0.5rem;
    }
}
</style>
