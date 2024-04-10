module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},
};
