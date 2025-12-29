import { reargv } from "../index.mjs";

const setArgvs = (commandString) => {
	const newArgv = commandString.split(" ");
	return newArgv;
};

test("adds 1 + 2 to equal 3", () => {
	process.argv =
		"-o -t -k3 -f -p2 hello mop text.ts next nuxt nest --arg='Hello test' --help --version".split(
			" "
		);
});

it.each(setArgvs("-a -b -c -d -e -f -g -h -i"))(
	"%s should be present",
	(arg) => {
		const option = arg.replace(/^-/g, "");
		process.argv = [null, null, arg];
		expect(reargv().options[option]).toBe(true);
	}
);

it("arguments should be placed in good places miscs and files and options", () => {
	process.argv = [
		null,
		null,
		..."hello mop -f -k text.ts -k2 -b crypt -m -p oui -nn --non -j k script.js --files next nuxt nest --equal=5".split(
			" "
		),
	];
	const argvs = reargv();

	expect(argvs.misc.length).toBe(4);
	expect(argvs.files.length).toBe(1);
	expect(argvs.options.files).toBe("next");
	expect(argvs.misc.includes("next")).toBe(false);
});

it.each([
	"--version --help text.ts",
	"-V help text.ts",
	"--VERSION HELP text.ts",
	"VERSION --HELP text.ts",
	"-V --help text.ts",
])(
	"'version' and 'help' argument are alwais flags (args : [%s])",
	(_arguments) => {
		process.argv = [null, null, ..._arguments.split(" ")];
		const argvs = reargv();

		expect(argvs.options.version).toBe(true);
		expect(argvs.options.help).toBe(true);
	}
);

// Example :
process.argv = [
	null,
	null,
	...[
		"hello",
		"--world",
		"argv",
		"on.npm",
		'--and="this is great!"',
		"help",
		"VERSION",
		"-k8",
		"-x",
	],
];

const argv = reargv();

console.log(argv);
