import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

const eslintConfig = [
	{
		ignores: [
			'**/dist',
			'**/node_modules',
			'**/.next',
			'**/build',
			'src/components/ui',
		],
	},
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			indent: ['error', 'tab'],
			quotes: ['error', 'single'],
		}
	},
];

export default eslintConfig;
