import { shallowMount } from '@vue/test-utils';
import Navigation from '@/components/Navigation.vue';

describe('Navigation.vue', () => {
    const wrapper = shallowMount(Navigation, {
        global: {
            stubs: ['router-link'],
        },
    });

    it('renders navigation', () => {
        expect(wrapper.exists);
    });

    it('buttons link to the correct page', async () => {
        const buttons = wrapper.findAll('.button');
        expect(buttons[0].attributes()['to']).toBe('/');
        expect(buttons[1].attributes()['to']).toBe('/about');
        expect(buttons[2].attributes()['to']).toBe('/Wishlists');
    });
});
