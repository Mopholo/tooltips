import { SvelteComponent } from 'svelte';

export interface TooltipActionProps {
  /**
   * The action to trigger the tooltip
   * @default 'hover'
   */
  action: 'hover' | 'click' | 'prop' | string;

  /**
   * The alignment of the tooltip.
   * @default 'left'
   */
  align?: 'left' | 'right' | 'center' | string;

  /**
   * The animation style of the tooltip.
   * @default ''
   */
  animation?: string;

  /**
   * Whether to show the arrow of the tooltip.
   * @default true
   */
  arrow?: boolean;

  /**
   * Whether to automatically position the tooltip when clipping occurs.
   * @default false
   */
  autoPosition?: boolean;

  /**
   * The content of the tooltip.
   * @default ''
   */
  content?: string;

  /**
   * The animation's delay of the tooltip.
   * @default 200
   */
  delay?: number;

  /**
   * The maximum width of the tooltip.
   * @default 200
   */
  maxWidth?: number;

  /**
   * The position of the tooltip.
   * @default 'top'
   */
  position?: 'bottom' | 'left' | 'right' | 'top' | string;

  /**
   * Control the visibility of the tooltip.
   * @default false
   */
  show?: boolean;

  /**
   * The style of the tooltip.
   * @default null
   */
  style?: undefined;

  /**
   * The target element to bind the tooltip to.
   * @default null
   */
  targetElement?: HTMLElement | null;

  /**
   * The theme of the tooltip.
   * @default ''
   */
  theme?: string;

   /**
   * How to manage title attribute on element 
   * @default 'false
   */
   titleFillContent?: boolean;

   /**
   * manipulate the final poistion of a tooltip
   * @default {x:0,y:0}
   */
   offset?: any;
}

export interface TooltipActionEvents {}

export interface TooltipActionSlots {
  default: {};
}

export default class TooltipAction extends SvelteComponent<
  TooltipActionProps,
  TooltipActionEvents,
  TooltipActionSlots
> {}
