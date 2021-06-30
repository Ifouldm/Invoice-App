<template>
    <div>
        <form @submit.prevent="submitForm" class="wishlist">
            <div class="section">
                <div class="section-heading">Wishlist</div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Wishlist Name</label>
                        <input v-model.trim="form.wishlistName" type="text" />
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="section-heading">Wishlist Item</div>

                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Product Name</label>
                        <input v-model.trim="form.itemName" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Description</label>
                        <input v-model.trim="form.description" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Image URL</label>
                        <input v-model.trim="form.imageUrl" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Link to product</label>
                        <input v-model.trim="form.link" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Date Added</label>
                        <input v-model.trim="form.dateAdded" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Quantity</label>
                        <input v-model.number="form.quantity" type="text" />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="fromAddress">Price</label>
                        <input v-model.number="form.price" type="text" />
                    </div>
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
import { defineComponent, ref } from 'vue';
import { Wishlist } from '../types';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const apiAddress = '/api';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const form = ref({
            itemName: '',
            link: '',
            imageUrl: '',
            quantity: 1,
            price: 0.0,
            dateAdded: new Date(),
            description: '',
            wishlistName: '',
        } as Wishlist);

        const back = function () {
            router.back();
        };

        const submitForm = function () {
            if (route.query.id) {
                axios
                    .put(
                        `${apiAddress}/wishlist?id=${form.value._id}`,
                        form.value
                    )
                    .then(() => router.push('/wishlists'))
                    .catch((err) =>
                        store.dispatch(
                            'notification',
                            'Error updating wishlist: ' + err
                        )
                    );
            } else {
                axios
                    .post(`${apiAddress}/wishlist`, form.value)
                    .then(() => router.push('/wishlists'))
                    .catch((err) =>
                        store.dispatch(
                            'notification',
                            'Error inserting new wishlist: ' + err
                        )
                    );
            }
        };

        return {
            back,
            submitForm,
            form,
        };
    },
    created() {
        if (this.$route.query.id) {
            axios
                .get(`${apiAddress}/wishlist?id=${this.$route.query.id}`)
                .then((res) => {
                    this.form = res.data;
                })
                .catch((err) => console.error(err));
        }
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
