import { createStore } from 'vuex';

export default createStore({
    state: {
        notificationText: '',
        notificationVisible: false,
    },
    mutations: {
        toggleNotificationVisible(state) {
            state.notificationVisible = !state.notificationVisible;
        },
        updateNotificationText(state, message: string) {
            state.notificationText = message;
        },
    },
    actions: {
        notification(context, message: string) {
            context.commit('updateNotificationText', message);
            context.commit('toggleNotificationVisible');
            setTimeout(() => context.commit('toggleNotificationVisible'), 5000);
        },
    },
    modules: {},
});
