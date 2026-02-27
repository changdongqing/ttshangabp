# Symlink Management Tool

This directory contains a unified TypeScript script for managing symlinks between the main Angular application and ABP module libraries.

If you need to reference a package for the main angular application, this typescript configuration is not fully supported. For this reason, you can utilize the symlinking approach instead.

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@angular/*": ["node_modules/@angular/*"]
    }
  }
}
```

## Main Script (`symlinks.ts`)

A single, comprehensive script that handles both setup and removal of symlinks with built-in configuration.

### Configuration

The script includes built-in configuration:

- `packageDirectories`: Array of module directories to process
- `packagesToSymlink`: Array of package names to symlink

### Commands

#### Setup Symlinks

Creates symlinks from the main app's `node_modules` to module libraries' `node_modules` for specified packages.

**Usage:**

```bash
yarn symlinks:setup
yarn symlinks setup
```

**What it does:**

- Links specific packages from main app to module libraries
- Avoids circular symlinks
- Creates `node_modules` directories if they don't exist
- Provides detailed console output with colored status messages

#### Remove Symlinks

Removes all symlinked `node_modules` directories from module libraries.

**Usage:**

```bash
yarn symlinks:remove
yarn symlinks remove
```

**What it does:**

- Removes entire `node_modules` directories from module libraries
- Libraries will fall back to their own local dependencies
- Provides detailed console output with colored status messages

#### Help

Shows usage information and available commands.

**Usage:**

```bash
yarn symlinks help
yarn symlinks --help
yarn symlinks -h
# or just
yarn symlinks
```

## Requirements

- Node.js
- TypeScript
- ts-node (installed as dev dependency)
