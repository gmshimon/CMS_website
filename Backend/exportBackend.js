// save this as exportBackend.js in your BACKEND root
import fs from 'fs'
import path from 'path'

const projectRoot = process.cwd() // run script from BACKEND folder
const outputFile = path.join(projectRoot, 'Backend_code.txt')

// folders we want to skip
const ignore = [
  'node_modules',
  '.gitignore',
  'dist',
  '.vscode',
  'cms-website-efbff-firebase-adminsdk-fbsvc-ea47fb1749.json',
  'exportBackend.js'
]

// recursive walker
function walk (dir) {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    if (ignore.includes(file)) continue
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath))
    } else {
      results.push(fullPath)
    }
  }
  return results
}

function exportProject () {
  const files = walk(projectRoot)

  const outStream = fs.createWriteStream(outputFile, { flags: 'w' })

  files.forEach(filePath => {
    const relPath = path.relative(projectRoot, filePath)
    outStream.write(`\n\n=== FILE: ${relPath} ===\n\n`)
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      outStream.write(content)
    } catch (err) {
      outStream.write(`(Could not read file: ${err.message})`)
    }
  })

  outStream.end()
  console.log(`✅ Backend project exported to ${outputFile}`)
}

exportProject()
