export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [];

export const dictionary = {
		"/": [5],
		"/(mgmt)/cards": [10,[4]],
		"/(mgmt)/commands": [11,[4]],
		"/(mgmt)/commands/[id]": [12,[4]],
		"/(mgmt)/dashboard": [13,[4]],
		"/(mgmt)/database": [14,[4]],
		"/(mgmt)/economy": [15,[4]],
		"/(mgmt)/embeds": [16,[4]],
		"/(mgmt)/events": [17,[4]],
		"/(mgmt)/flows": [18,[4]],
		"/(mgmt)/flows/[id]": [19,[4]],
		"/(admin)/ledger": [6,[2]],
		"/(auth)/login": [9,[3]],
		"/(mgmt)/modules": [20,[4]],
		"/(admin)/rbac": [7,[2]],
		"/(admin)/system": [8,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';