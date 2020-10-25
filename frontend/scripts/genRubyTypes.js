const fs = require("fs");
const { resolve } = require("path");

// generate json schemas
const schemas = (() => {
  const TJS = require("typescript-json-schema");
  const schemas = {};
  const generator = TJS.buildGenerator(
    TJS.programFromConfig(resolve("tsconfig.json")),
    {
      required: true,
    }
  );

  generator
    .getUserSymbols()
    .filter((name) => name.startsWith("PagePropsType."))
    .forEach((typename) => {
      schemas[typename] = generator.getSchemaForSymbol(typename);
    });

  return schemas;
})();

// generate ruby code
const output = ((schemas) => {
  const quicktype = require("quicktype-core");
  const schemaInput = new quicktype.JSONSchemaInput(
    new quicktype.JSONSchemaStore()
  );
  Object.entries(schemas).forEach(([typename, schema]) => {
    schemaInput.addSourceSync({
      name: typename,
      schema: JSON.stringify(schema),
    });
  });

  const inputData = new quicktype.InputData();
  inputData.addInput(schemaInput);
  return quicktype.quicktype({ inputData, lang: "ruby" });
})(schemas);

// write .rb

const typefile = resolve("..", "backend", "lib", "type.rb");
console.log(`generate ${typefile}`);
output.then((output) => {
  fs.writeFileSync(typefile, output.lines.join("\n"));
});
