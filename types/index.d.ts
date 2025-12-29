export interface ReArgVObject {
	/**
	 * An object containing arguments introduced by dashes (- or --) or matched special arguments.
	 */
	options: { [x: string]: any };

	/**
	 * An array of arguments recognized as file names.
	 */
	files: string[];

	/**
	 * An array of remaining arguments that are neither options nor files.
	 */
	misc: string[];
}

/**
 * Returns an argv description.
 *
 * @returns A ReArgVObject object (never null)
 */
export function reargv(): ReArgVObject;
