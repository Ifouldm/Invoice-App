import { shallowMount } from '@vue/test-utils';
import Status from '@/components/Status.vue';

describe('Status.vue', () => {
    it('renders status when passed', () => {
        const status = 'paid';
        const wrapper = shallowMount(Status, {
            props: { status },
        });
        expect(wrapper.text()).toMatch(status);
        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(['status', status])
        );
    });
});
