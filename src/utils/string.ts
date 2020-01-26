export function uri(str: string, params: Record<string, any> = {}) {
  return str.replace(/\/\{([^\/]+?)\}/g, (match: string, key: string) => params[key] ? `/${params[key]}` : '')
}
