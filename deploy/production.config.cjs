const appName = "ntuclh-demo";
const baseDir = `/home/deploy/apps/${appName}`;
const releaseDir = `${baseDir}/current`;
const logDir = `${releaseDir}/logs`;
const sharedDir = `${releaseDir}/shared`;

module.exports = {
  apps: [
    {
      name: appName,
      script: "server.js",
      exec_mode: "cluster",
      instances: "max",
      error_file: `${logDir}/error.log`,
      out_file: `${logDir}/out.log`,
      pid_file: `${sharedDir}/${appName}.pid`,
      cwd: releaseDir,
      env: { NODE_ENV: "production", PORT: 3000 },
    },
  ],
};
