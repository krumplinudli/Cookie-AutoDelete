const path = require('path');
const ROOTDIR = process.cwd();

function changeVersion(filename, version) {
  const fs = require('fs');
  var jsonData = require(filename);
  if (jsonData.version === undefined) {
    console.error('ERROR:  No version key found');
    return -1;
  }
  if (jsonData.version === version) {
    console.log('Version is already updated to %s on %s', version, filename);
  } else {
    console.log('Replacing old version number: %s', jsonData.version);
    jsonData.version = version;
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));
    console.log('Finished updating version number to %s on:  %s', version, filename);
  }
}
console.log("\nUsing NodeJS Version %s on %s %s", process.version, process.platform, process.arch);
console.log("\nCurrent Process Directory:  %s", ROOTDIR);
console.log('Checking if GITHUB_REF TAG exists...');
if (process.env.GITHUB_REF !== undefined) {
  console.log('GITHUB_REF:  %s', process.env.GITHUB_REF);
  let versionTag = process.env.GITHUB_REF;
  console.log('TAG exists - %s', versionTag);
  if (versionTag.startsWith('refs/tags/')) {
    versionTag = versionTag.slice(10);
  }
  if (versionTag.startsWith('v')) {
    versionTag = versionTag.slice(1);
  }
  console.log('New Version Number: ', versionTag);
  console.log('Replacing...');
  //changeVersion(path.join(ROOTDIR, 'package.json'), versionTag);
  changeVersion(path.join(ROOTDIR, 'extension', 'manifest.json'), versionTag);
  console.log('Replacements done with ' + versionTag);
} else {
  console.log("CI TAG does not exist.  No Replacements done.");
}