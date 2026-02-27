import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

// Configuration
// example: "../../../../../angular/libs/lepton-x-abp-core"
const packageDirectories = [
  "../../../../angular/libs/lepton-x-abp-core",
  "../../../../angular/libs/abp-lepton-x",
  "../../../../angular/libs/lepton-x-core",
  "../../../../angular/libs/lepton-x-lite",
  "../../../../../abp/npm/ng-packs/packages/core",
  "../../../../../abp/npm/ng-packs/packages/account",
  "../../../../../abp/npm/ng-packs/packages/account-core",
  "../../../../../abp/npm/ng-packs/packages/identity",
  "../../../../../abp/npm/ng-packs/packages/oauth",
  "../../../../../abp/npm/ng-packs/packages/theme-shared",
  "../../../../../abp/npm/ng-packs/packages/components",
  "../../../../../abp/npm/ng-packs/packages/permission-management",
  "../../../../../abp/npm/ng-packs/packages/feature-management",
  "../../../../../abp/npm/ng-packs/packages/setting-management",
  "../../../../../abp/npm/ng-packs/packages/tenant-management",
];

const packagesToSymlink = [
  "@angular",
  "@swimlane",
  "@fortawesome",
  "@ng-bootstrap",
  "@ngx-validate",
  "@types",
  "angular-oauth2-oidc",
  "bootstrap",
  "chart.js",
  "just-clone",
  "just-compare",
  "ng-zorro-antd",
  "rxjs",
  "typescript",
  "ts-toolbelt",
  "tslib",
  "zone.js",
];

// Simple colored logging
const log = {
  info: (msg: string) => console.log(`\x1b[36m${msg}\x1b[0m`),
  success: (msg: string) => console.log(`\x1b[32m${msg}\x1b[0m`),
  warning: (msg: string) => console.log(`\x1b[33m${msg}\x1b[0m`),
  error: (msg: string) => console.log(`\x1b[31m${msg}\x1b[0m`),
  gray: (msg: string) => console.log(`\x1b[90m${msg}\x1b[0m`),
};

function showHelp() {
  log.info("\n🔗 Symlink Management Tool");
  console.log("\nUsage:");
  log.gray("  yarn symlinks setup    - Create symlinks");
  log.gray("  yarn symlinks remove   - Remove symlinks");
  log.gray("  yarn symlinks help     - Show this help");
  console.log(
    "\nManages symlinks between main Angular app and ABP module libraries.\n"
  );
}

function setupSymlinks() {
  log.info("🔗 Setting up symlinks...\n");

  const mainNodeModules = path.resolve("node_modules");
  if (!fs.existsSync(mainNodeModules)) {
    log.error("❌ Main node_modules not found. Run yarn install first.");
    process.exit(1);
  }

  log.gray(`Source: ${mainNodeModules}`);
  console.log();

  let totalLinked = 0;
  let totalSkipped = 0;

  packageDirectories.forEach((packageDir) => {
    const targetPath = path.resolve(packageDir);
    const targetNodeModules = path.join(targetPath, "node_modules");

    log.info(`📁 Processing ${packageDir}...`);

    if (!fs.existsSync(targetNodeModules)) {
      fs.mkdirSync(targetNodeModules, { recursive: true });
      log.gray("   📁 Created node_modules directory");
    }

    packagesToSymlink.forEach((packageName) => {
      const sourcePackage = path.join(mainNodeModules, packageName);
      const targetPackage = path.join(targetNodeModules, packageName);

      if (!fs.existsSync(sourcePackage)) {
        log.warning(`   ⚠️  ${packageName} not found`);
        totalSkipped++;
        return;
      }

      try {
        if (fs.existsSync(targetPackage)) {
          fs.rmSync(targetPackage, { recursive: true, force: true });
        }

        if (process.platform === "win32") {
          execSync(`mklink /J "${targetPackage}" "${sourcePackage}"`, {
            stdio: "ignore",
          });
        } else {
          fs.symlinkSync(sourcePackage, targetPackage, "dir");
        }

        log.success(`   ✅ ${packageName}`);
        totalLinked++;
      } catch (error) {
        log.error(`   ❌ ${packageName}: ${error}`);
        totalSkipped++;
      }
    });
    console.log();
  });

  log.success(`🎉 Completed! Linked: ${totalLinked}, Skipped: ${totalSkipped}`);
}

function removeSymlinks() {
  log.info("🗑️  Removing symlinks...\n");

  let totalRemoved = 0;
  let totalSkipped = 0;

  packageDirectories.forEach((packageDir) => {
    const targetPath = path.resolve(packageDir);
    const targetNodeModules = path.join(targetPath, "node_modules");

    log.info(`📁 Processing ${packageDir}...`);

    if (!fs.existsSync(targetNodeModules)) {
      log.warning("   ⚠️  No node_modules found");
      totalSkipped++;
      return;
    }

    try {
      fs.rmSync(targetNodeModules, { recursive: true, force: true });
      log.success("   ✅ Removed node_modules");
      totalRemoved++;
    } catch (error) {
      log.error(`   ❌ Failed: ${error}`);
      totalSkipped++;
    }
  });

  console.log();
  log.success(
    `🎉 Cleanup completed! Removed: ${totalRemoved}, Skipped: ${totalSkipped}`
  );
}

// Main execution
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case "setup":
      setupSymlinks();
      break;
    case "remove":
      removeSymlinks();
      break;
    case "help":
    case "--help":
    case "-h":
      showHelp();
      break;
    default:
      log.error('❌ Invalid command. Use "setup", "remove", or "help"');
      showHelp();
      process.exit(1);
  }
}
