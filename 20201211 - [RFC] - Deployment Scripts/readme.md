# Build & Deployment Configuration

| Status        | Proposed       |
:-------------- |:---------------------------------------------------- |
| **Author(s)** | Conrad (conrad.koh@foodpanda.com) |
| **Updated**   | 2020-12-11                                           |

## Objective
Separate the build and deploy stages, and allow a maintainable solution, with minimised code duplication. Modification to the deployment targets should not result in a modification of the shared build script.

## Motivation

The current deployment and build script is quite inflexible. All plugins are assumed to be built and deployed to all regions. The only way to prevent deployment to a certain region for a certain plugin is to modify the deployment and build script.

## User Benefit
Knowing how to configure deployment targets for plugins would not require knowledege of the inner workings of the stages of the script itself

## Design Proposal
In general, there are 3 main parameters that need to be expanded into a matrix.
- Environment
- AWS Region
- Plugin ID

We break down the responsibility of these configurations as follows
1. The configured env is left up to the executor of the deployment. e.g. `yarn deploy:stg`
2. The AWS region configuration is done in 2 steps
    1. Matrix expansion is done in the CI/CD pipeline
    2. Plugin level script filters out which regions should not be deployed to
3. The set of all plugins are configured with the `deploy-stg` or `deploy-prod` scripts themselves

### Current deployment flow
- Env - Stg | Prod
- Matrix - [aws-region-all]
1. Generate all plugin bundles
2. Upload all bundles to s3 bucket
3. Interate through bundles generated
4. For each bundle,
    1. Get the filename of the bundle
    2. Register plugin through portal's API
    3. Generate commits list
    4. Report commits to data fridge

### New deployment flow
- Env - Stg | Prod
- Matrix - [aws-regions-all]
1. Deploy all plugins
2. For each plugin
    1. Execute plugin deploy script
        1. Skip if aws region is ignored
    2. Execute common deploy script with parameters
        1. Generate plugin bundle through `ENV=<env> AWS_REGION=<aws-region> yarn build:<plugin-name>`
        2. Upload bundle to s3 bucket
        3. Get the filename of the bundle
        4. Generate commits list
        5. Report commits to datafridge

### Proposed scripting strategy
1. Plugin deployment configuration
    1. Use shell scripts - Path of least resistance
    2. Configured in plugin level deploy script
    3. AWS regions to be ignored will be configured in plugin level deployment script
2. Plugin build configuration
    1. Use typescript to read configuration
        - Easy to work with json / yml
        - Access to usage of libraries
    1. To migrate all non-secret configurations to be commited to code repository
    2. Read configuration from build script itself

## Detailed Design

TBC

## Questions and Discussion Topics

1. Is the scripting strategy sound - usage of bash for deployments and typescript for build?
2. In the new deployment flow, part 2.1, ignoring the deployment regions will be done in the plugin level deploy script itself. Are there any better proposed alternatives?