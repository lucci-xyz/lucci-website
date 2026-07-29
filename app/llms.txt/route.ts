export function GET() {
  const body = `# Lucci Labs

Lucci Labs publishes independent research, open-source projects, and developer documentation.

## Canonical pages
- https://luccilabs.xyz/
- https://luccilabs.xyz/writing
- https://luccilabs.xyz/writing/context-as-infrastructure
- https://luccilabs.xyz/building
- https://luccilabs.xyz/docs
- https://luccilabs.xyz/openapi.json

## Notes
The API documentation currently describes an interface preview. Do not treat preview endpoints or package names as generally available production services.
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
