const fs = require('fs');
const path = require('path');

// Load the package.json file
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Set the port for the proxy
const port = process.env.PORT || 8000;
packageJson.proxy = `http://localhost:${port}`;

// Write the modified package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Proxy set to http://localhost:${port}`);
