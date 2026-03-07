export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["hero.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D5Hs_CQp.js",app:"_app/immutable/entry/app.Dy7uMC5d.js",imports:["_app/immutable/entry/start.D5Hs_CQp.js","_app/immutable/chunks/DOXfydTH.js","_app/immutable/chunks/CebdRyTY.js","_app/immutable/chunks/CEV47lTt.js","_app/immutable/chunks/4D2fh7bU.js","_app/immutable/entry/app.Dy7uMC5d.js","_app/immutable/chunks/CebdRyTY.js","_app/immutable/chunks/Cm94KOZ0.js","_app/immutable/chunks/Cpe7s6kJ.js","_app/immutable/chunks/4D2fh7bU.js","_app/immutable/chunks/DpZQ46JF.js","_app/immutable/chunks/DWxdjsnJ.js","_app/immutable/chunks/mz4Jl4Hy.js","_app/immutable/chunks/CEV47lTt.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(mgmt)/cards",
				pattern: /^\/cards\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(mgmt)/commands",
				pattern: /^\/commands\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(mgmt)/commands/[id]",
				pattern: /^\/commands\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(mgmt)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(mgmt)/database",
				pattern: /^\/database\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(mgmt)/economy",
				pattern: /^\/economy\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(mgmt)/embeds",
				pattern: /^\/embeds\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(mgmt)/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(mgmt)/flows",
				pattern: /^\/flows\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/(mgmt)/flows/[id]",
				pattern: /^\/flows\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/(admin)/ledger",
				pattern: /^\/ledger\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(mgmt)/modules",
				pattern: /^\/modules\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/(admin)/rbac",
				pattern: /^\/rbac\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(admin)/system",
				pattern: /^\/system\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
