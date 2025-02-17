import { defineStore } from 'pinia';

export const useBridgeStore = defineStore('bridge', {
	state: () => {
		return {
			bridge: null,
			currentThemeConfig: null
		};
	},
	getters: {},
	actions: {
		setBridge(bridge) {
			this.bridge = bridge;
		},
		setCurrentThemeConfig(config) {
			this.currentThemeConfig = config;
		}
	}
});
