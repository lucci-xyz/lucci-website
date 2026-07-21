export function GET() {
  const body = `# Lucci Labs

Lucci Labs publishes independent research, open-source projects, and developer documentation.

## Canonical pages
- https://lucci.tools/
- https://lucci.tools/research
- https://lucci.tools/research/context-as-infrastructure
- https://lucci.tools/projects
- https://lucci.tools/docs
- https://lucci.tools/openapi.json

## Notes
The API documentation currently describes an interface preview. Do not treat preview endpoints or package names as generally available production services.
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
