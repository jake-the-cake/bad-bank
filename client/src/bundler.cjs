require( 'esbuild' ).buildSync({
  entryPoints: [ 'src/index.tsx' ],
  bundle: true,
  minify: false,
  sourcemap: true,
  outdir: './public/dist'
})