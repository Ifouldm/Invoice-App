import { createStore } from 'vuex';

export default createStore({
    state: {
        notificationVisible: false,
    },
    mutations: {
        toggleNotificationVisible(state) {
            state.notificationVisible = !state.notificationVisible;
        },
    },
    actions: {
        showNotification(context) {
            context.commit('toggleNotificationVisible');
            setTimeout(() => context.commit('toggleNotificationVisible'), 5000);
        },
    },
    modules: {},
});
