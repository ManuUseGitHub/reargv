export const hasNextOptions = (args, i) => {
	return args[i + 1] && !args[i + 1].startsWith("-");
};

const longOptions = (args, arg, out, i) => {
	const [key, value] = arg.slice(2).split("=", 2);

	if (value !== undefined) {
		out.options[key] = value;
	} else if (hasNextOptions(args, i)) {
		out.options[key] = args[++i];
		return 1;
	} else {
		out.options[key] = true;
	}
	return 0;
};

const shortOptions = (args, arg, out, i) => {
	const key = arg[1];
	const value = arg.slice(2);

	if (value) {
		out.options[key] = value;
	} else if (hasNextOptions(args, i)) {
		out.options[key] = args[++i];
		return 1;
	} else {
		out.options[key] = true;
	}
	return 0;
};

export const reargv = () => {
	const args = process.argv.slice(2);
	const out = { options: {}, files: [], misc: [] };

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		// --version or --VERSION -V or misc 'version' or 'VERSION'
		if (/^--version|-V|version$/i.test(arg)) {
			out.options["version"] = true;
		}

		// --help or --HELP or misc 'help' or 'HELP'
		else if (/^--help|help/i.test(arg)) {
			out.options["help"] = true;
		}

		// --long or --long=value
		else if (/^--/.test(arg)) {
			i += longOptions(args, arg, out, i);
		}

		// -s or -sVALUE
		else if (/^-[a-zA-Z]/.test(arg)) {
			i += shortOptions(args, arg, out, i);
		}

		// file
		else if (/\.[a-zA-Z0-9]+$/.test(arg)) {
			out.files.push(arg);
		}

		// misc
		else {
			out.misc.push(arg);
		}
	}

	return out;
};
