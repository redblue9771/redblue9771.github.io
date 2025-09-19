import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./src/schema.docs.graphql",
  generates: {
    "src/github.schema.types.generated.d.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: { withHooks: true },
    },
  },
}
export default config
