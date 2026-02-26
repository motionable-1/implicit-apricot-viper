
import { deploySite, getOrCreateBucket } from '@remotion/lambda';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the Remotion entry point
function findEntryPoint() {
  const cwd = process.cwd();
  console.log('Working directory:', cwd);
  console.log('Directory contents:', fs.readdirSync(cwd));
  
  if (fs.existsSync(path.join(cwd, 'src'))) {
    console.log('src/ contents:', fs.readdirSync(path.join(cwd, 'src')));
  }
  
  const possibleEntries = [
    'src/remotion/index.ts',
    'src/remotion/index.tsx',
    'src/index.ts',
    'src/index.tsx',
    'src/entry.ts',
    'src/entry.tsx',
    'src/Root.tsx',
    'src/Video.tsx',
    'src/Composition.tsx',
    'remotion/index.ts',
    'remotion/index.tsx',
    'remotion/Root.tsx',
    'app/remotion/index.tsx',
    'index.ts',
    'index.tsx',
    'video.ts',
    'video.tsx',
  ];
  
  for (const entry of possibleEntries) {
    const fullPath = path.join(cwd, entry);
    console.log('Checking:', entry, fs.existsSync(fullPath) ? 'EXISTS' : 'not found');
    if (fs.existsSync(fullPath)) {
      console.log('Found entry point:', entry);
      return fullPath;
    }
  }
  
  // Fallback: look for any file with registerRoot in src/
  console.log('Searching for registerRoot in src/...');
  const srcDir = path.join(cwd, 'src');
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        try {
          const content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
          if (content.includes('registerRoot')) {
            console.log('Found entry point with registerRoot:', 'src/' + file);
            return path.join(srcDir, file);
          }
        } catch (e) {
          console.log('Could not read:', file);
        }
      }
    }
  }
  
  // Fallback: look for any file with registerRoot anywhere
  console.log('Searching for registerRoot in all directories...');
  function searchDir(dir, depth = 0) {
    if (depth > 3) return null;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const result = searchDir(fullPath, depth + 1);
          if (result) return result;
        } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (content.includes('registerRoot')) {
              console.log('Found entry point with registerRoot:', fullPath);
              return fullPath;
            }
          } catch (e) {}
        }
      }
    } catch (e) {}
    return null;
  }
  
  const found = searchDir(cwd);
  if (found) return found;
  
  throw new Error('Could not find Remotion entry point. Please ensure your project has a file that calls registerRoot()');
}

async function main() {
  try {
    const region = 'us-east-1';
    const siteName = 'project-f1f03844-9c53-4971-98a0-5fd16ab9270d';
    
    const entryPoint = findEntryPoint();
    
    // Get or create the bucket
    const { bucketName } = await getOrCreateBucket({ region });
    console.log('Using bucket:', bucketName);
    
    // Webpack override for Tailwind CSS
    const webpackOverride = (currentConfiguration) => {
      return {
        ...currentConfiguration,
        module: {
          ...currentConfiguration.module,
          rules: [
            ...(currentConfiguration.module?.rules ?? []).filter((rule) => {
              if (rule && typeof rule === 'object' && rule.test instanceof RegExp) {
                return !rule.test.test('.css');
              }
              return true;
            }),
            {
              test: /\.css$/i,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [['@tailwindcss/postcss', {}]],
                    },
                  },
                },
              ],
            },
          ],
        },
      };
    };
    
    // Deploy the site
    const { serveUrl } = await deploySite({
      entryPoint,
      bucketName,
      region,
      siteName,
      options: {
        rootDir: process.cwd(),
        webpackOverride,
        onBundleProgress: (progress) => {
          if (progress % 20 === 0) console.log('Bundle progress:', progress + '%');
        },
        onUploadProgress: ({ filesUploaded, totalFiles }) => {
          if (filesUploaded % 10 === 0) console.log('Upload progress:', filesUploaded + '/' + totalFiles);
        },
      },
    });
    
    console.log('DEPLOY_SUCCESS:' + serveUrl);
  } catch (error) {
    console.error('DEPLOY_ERROR:', error.message);
    process.exit(1);
  }
}

main();

