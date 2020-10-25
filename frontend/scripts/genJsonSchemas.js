const fs = require("fs").promises;
const { resolve } = require("path");
const TJS = require("typescript-json-schema");

module.exports = async () => {
  const generator = TJS.buildGenerator(
    TJS.programFromConfig(resolve("tsconfig.json")),
    {
      required: true,
    }
  );
  const outdir = resolve("..", "backend", "lib", "schema");

  const types = generator
    .getUserSymbols()
    .filter((name) => name.startsWith("PagePropsType."));
  Promise.all(
    types.map((typename) =>
      fs.writeFile(
        resolve(outdir, `${typename}.json`),
        JSON.stringify(generator.getSchemaForSymbol(typename), null, 2)
      )
    )
  );
};

if (!module.parent) module.exports();
