// Resolves files in /public against the deploy base path (GitHub Pages project sites live under /<repo>/).
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
