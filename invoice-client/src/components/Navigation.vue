<template>
    <div class="nav">
        <router-link class="button" active-class="is-primary" to="/">
            Invoices
        </router-link>
        <router-link class="button" active-class="is-primary" to="/about">
            About
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
.nav {
    display: flex;
    flex-direction: column;
    height: 100vh;
    border-radius: 0 2rem 2rem 0;
    background-color: var(--DarkBlue);
    z-index: 100;
    @media screen and (max-width: 600px) {
        flex-direction: row;
        height: initial;
        border-radius: 0 0 2rem 2rem;
    }
    .button {
        margin: 1rem;
    }
}
</style>
