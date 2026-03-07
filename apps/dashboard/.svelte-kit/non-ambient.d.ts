
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(mgmt)" | "/(auth)" | "/(admin)" | "/" | "/(mgmt)/cards" | "/(mgmt)/commands" | "/(mgmt)/commands/[id]" | "/(mgmt)/dashboard" | "/(mgmt)/database" | "/(mgmt)/economy" | "/(mgmt)/embeds" | "/(mgmt)/events" | "/(mgmt)/flows" | "/(mgmt)/flows/[id]" | "/(admin)/ledger" | "/(auth)/login" | "/(mgmt)/modules" | "/(admin)/rbac" | "/(admin)/system";
		RouteParams(): {
			"/(mgmt)/commands/[id]": { id: string };
			"/(mgmt)/flows/[id]": { id: string }
		};
		LayoutParams(): {
			"/(mgmt)": { id?: string };
			"/(auth)": Record<string, never>;
			"/(admin)": Record<string, never>;
			"/": { id?: string };
			"/(mgmt)/cards": Record<string, never>;
			"/(mgmt)/commands": { id?: string };
			"/(mgmt)/commands/[id]": { id: string };
			"/(mgmt)/dashboard": Record<string, never>;
			"/(mgmt)/database": Record<string, never>;
			"/(mgmt)/economy": Record<string, never>;
			"/(mgmt)/embeds": Record<string, never>;
			"/(mgmt)/events": Record<string, never>;
			"/(mgmt)/flows": { id?: string };
			"/(mgmt)/flows/[id]": { id: string };
			"/(admin)/ledger": Record<string, never>;
			"/(auth)/login": Record<string, never>;
			"/(mgmt)/modules": Record<string, never>;
			"/(admin)/rbac": Record<string, never>;
			"/(admin)/system": Record<string, never>
		};
		Pathname(): "/" | "/cards" | "/commands" | `/commands/${string}` & {} | "/dashboard" | "/database" | "/economy" | "/embeds" | "/events" | "/flows" | `/flows/${string}` & {} | "/ledger" | "/login" | "/modules" | "/rbac" | "/system";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/hero.png" | "/robots.txt" | string & {};
	}
}