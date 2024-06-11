import { task, src, dest, series } from 'gulp';
import { deleteAsync } from 'del';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import ts from 'gulp-typescript';
import config from './tsconfig.json' assert { type: 'json' };

const compilerOptions = config.compilerOptions;

task('build_clean', () => {
	return deleteAsync(['dist', 'types']);
});

task('build_tsc', () => {
	return src('src/**/*.ts')
		.pipe(ts({ ...compilerOptions, declaration: true }))
		.pipe(dest('dist/types'));
});

task(
	'build_js',
	series('build_clean', () => {
		return src('src/**/*.ts')
			.pipe(ts(compilerOptions))
			.pipe(
				rename({
					basename: 'index',
					extname: '.mjs',
				})
			)
			.pipe(dest('dist'))
			.pipe(
				babel({
					presets: ['@babel/env'],
					plugins: [['@babel/plugin-transform-modules-commonjs']],
				})
			)
			.pipe(
				rename({
					basename: 'index',
					extname: '.cjs',
				})
			)
			.pipe(dest('dist'))
			.pipe(
				babel({
					presets: ['@babel/env'],
					plugins: [['@babel/transform-modules-umd']],
				})
			)
			.pipe(
				rename({
					basename: 'index',
					extname: '.js',
				})
			)
			.pipe(dest('dist'));
	})
);

task(
	'build_all',
	series('build_js', 'build_tsc', () => {
		return src('dist/types/**/*.d.ts').pipe(dest('types'));
	})
);

task(
	'build',
	series('build_all', () => {
		return deleteAsync('dist/types');
	})
);
