export function GET() {
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "Lucci Labs API Interface Preview",
      version: "0.0.1-preview",
      description: "A non-production schema describing the intended developer interface. Endpoints are illustrative until a public API is released.",
    },
    servers: [{ url: "https://api.luccilabs.xyz/v1", description: "Preview base URL" }],
    paths: {
      "/runs": {
        post: {
          summary: "Create a run",
          responses: { "201": { description: "Run created" } },
        },
      },
      "/runs/{run_id}": {
        get: {
          summary: "Retrieve a run",
          parameters: [{ name: "run_id", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Run state and output" } },
        },
      },
    },
  })
}
