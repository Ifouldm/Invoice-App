<template>
    <div class="pagination">
        <button
            class="nes-btn"
            :class="{ 'is-disabled': !hasPrev }"
            @click="prev"
        >
            &lt;
        </button>
        <button
            class="nes-btn"
            @click="gotoPage(page)"
            v-for="page in availPages"
            :key="page"
            :class="{ 'is-primary': page === currentPage }"
        >
            {{ page }}
        </button>
        <button
            class="nes-btn"
            :class="{ 'is-disabled': !hasNext }"
            @click="next"
        >
            &gt;
        </button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        totalRecords: { type: Number, required: true },
        perPage: { type: Number, required: true },
    },
    emits: ['pageChange'],
    setup(props, { emit }) {
        const currentPage = ref(1);

        const totalPages = computed(() =>
            Math.ceil(props.totalRecords / props.perPage)
        );

        const hasNext = () => currentPage.value < totalPages.value;

        const hasPrev = () => currentPage.value > 1;

        const availPages = computed((): Set<number> => {
            return new Set(
                [
                    1,
                    currentPage.value - 1,
                    currentPage.value,
                    currentPage.value + 1,
                    totalPages.value,
                ]
                    .sort((a, b) => a - b)
                    .filter(
                        (pageNo) => pageNo <= totalPages.value && pageNo >= 1
                    )
            );
        });

        const prev = () => {
            if (hasPrev()) {
                currentPage.value -= 1;
                emit('pageChange', currentPage.value);
            }
        };

        const next = () => {
            if (hasNext()) {
                currentPage.value += 1;
                emit('pageChange', currentPage.value);
            }
        };

        const gotoPage = (pageNo: number) => {
            if (pageNo > 0 && pageNo <= totalPages.value) {
                currentPage.value = pageNo;
                emit('pageChange', currentPage.value);
            }
        };

        return {
            currentPage,
            totalPages,
            availPages,
            hasPrev,
            hasNext,
            prev,
            next,
            gotoPage,
        };
    },
    // data() {
    //     return {
    //         currentPage: 1,
    //     };
    // },
    // computed: {
    //     totalPages(): number {
    //         return Math.ceil(this.totalRecords / this.perPage);
    //     },
    //     availPages(): Set<number> {
    //         return new Set(
    //             [
    //                 1,
    //                 this.currentPage - 1,
    //                 this.currentPage,
    //                 this.currentPage + 1,
    //                 this.totalPages,
    //             ]
    //                 .sort((a, b) => a - b)
    //                 .filter(
    //                     (pageNo) => pageNo <= this.totalPages && pageNo >= 1
    //                 )
    //         );
    //     },
    //     hasNext(): boolean {
    //         return this.currentPage < this.totalPages;
    //     },
    //     hasPrev(): boolean {
    //         return this.currentPage > 1;
    //     },
    // },
    // methods: {
    //     prev(): void {
    //         if (this.hasPrev) {
    //             this.currentPage -= 1;
    //             this.$emit('pageChange', this.currentPage);
    //         }
    //     },
    //     next(): void {
    //         if (this.hasNext) {
    //             this.currentPage += 1;
    //             this.$emit('pageChange', this.currentPage);
    //         }
    //     },
    //     gotoPage(pageNo: number): void {
    //         if (pageNo > 0 && pageNo <= this.totalPages) {
    //             this.currentPage = pageNo;
    //             this.$emit('pageChange', this.currentPage);
    //         }
    //     },
    // },
});
</script>

<style>
.pagination {
    margin: 1rem;
    display: flex;
    gap: 0.5rem;
}
</style>
