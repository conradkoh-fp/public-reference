# Monorepo Migration
1. Add configuration of eslint, prettier to the root of the project
1. Move "resolutions" property to the root of the projects. Yarn workspaces does not support having it in sub-packages