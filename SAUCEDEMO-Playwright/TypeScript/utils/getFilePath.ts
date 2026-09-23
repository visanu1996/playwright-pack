import path from 'path'
import fs from 'fs'

/**
 * Resolve and validate file paths under the project's `src/data` folder.
 *
 * This helper uses the current working directory as the project root,
 * then joins each provided filename to `src/data` and verifies that the
 * file exists before returning the final absolute paths.
 *
 * Example:
 *   getFilesPath('users.json', 'products.json')
 *   // => ['/absolute/path/to/project/src/data/users.json', ...]
 */
export function getFilesPath(...filesName: string[]): string[] {
  const rootData = path.resolve(process.cwd(), 'src', 'data')
  const allPath: string[] = []

  for (const file of filesName) {
    const filePath = path.join(rootData, file)
    if (!fs.existsSync(filePath)) throw new Error(`File doesn't exist: ${file}`)
    allPath.push(filePath)
  }

  return allPath
}
