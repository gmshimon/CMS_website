// save this as exportProject.js in your CMS_FRONTEND root
import fs from 'fs'
import path from 'path'

const projectRoot = process.cwd() // current folder where you run the script
const outputFile = path.join(projectRoot, 'Frontend_code.txt')

// ignore folders that don't matter
const ignore = ['node_modules', '.git', 'dist', '.vscode','exportProject.js','public',"src/assets/EGE_logo.png"]

// recursively walk directory
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
  console.log(`✅ Project exported to ${outputFile}`)
}

exportProject()
