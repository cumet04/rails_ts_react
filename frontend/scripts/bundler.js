const { resolve } = require("path");
const esbuild = require("esbuild");

const env = process.argv[2] == "dev" ? "dev" : "production";
const srcPath = "./src";
const distPath = "../backend/public/assets";

const buildOpts = {
  entryPoints: [resolve(srcPath, "index.tsx")],
  outfile: resolve(distPath, "bundle.js"),
  bundle: true,
  platform: "browser",
  minify: env == "production",
  sourcemap: env == "dev" ? "inline" : false,
  define: {
    "process.env.NODE_ENV": `"${env}"`,
  },
  loader: {
    ".png": "file",
  },
};

// first build
esbuild.buildSync(buildOpts);

if (env == "dev") {
  const chokidar = require("chokidar");
  const livereload = require("livereload");

  const { hrtime, stdout, stderr } = process;

  // watch & build
  chokidar.watch(resolve(srcPath)).on("change", async () => {
    const service = await esbuild.startService();
    try {
      stdout.write(`building...`);
      const start = hrtime();
      await service.build(buildOpts);
      const ms = (hrtime(start)[1] / 1e6).toFixed(1);
      stdout.write(`done, elapsed ${ms} ms\n`);
    } catch (e) {
      stderr.write(`[ERROR]: ${e}\n`);
    } finally {
      service.stop();
    }
  });

  livereload
    .createServer({
      port: 3001,
    })
    .watch(resolve(distPath));
}
