import { type VariantProps, tv } from 'tailwind-variants';
export { default as Badge } from './badge.svelte';

export const badgeVariants = tv({
	base: 'w-max h-max focus:ring-ring inline-flex select-none items-center border border-dashed border-primary px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 no-underline',
	variants: {
		variant: {
			default:
				'bg-linear-to-b from-secondary/10 to-secondary text-secondary-foreground hover:opacity-80',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
			selected: 'bg-linear-to-b from-accent/10 to-accent text-secondary-foreground hover:opacity-80'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type Variant = VariantProps<typeof badgeVariants>['variant'];
