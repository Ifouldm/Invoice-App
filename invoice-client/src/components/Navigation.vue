<template>
    <div class="nav">
        <router-link class="button" active-class="active" to="/">
            Invoices
        </router-link>
        <router-link class="button" active-class="active" to="/about">
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
    .button {
        margin: 1rem;
    }
    .active {
        background-color: #4527be;
    }
}
</style>
