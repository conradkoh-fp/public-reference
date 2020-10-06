# Frontend Development Proposal
## Goals
1. Code reusability / robustness
    - To facilitate this goal, code should have as little state as possible, or as little of an assumption about the datasource to be consumed
        - e.g. 1 component should be able to present data from different APIs, storages (local storage, indexed DB, etc)
1. Separation of concerns
    - The business logic for the components that are designed should be separate from the component state
1. Dry Code
    - Repeated business logic that is presented differently should not result in code duplication
    - Similarly presented code with different business logic should not result in code duplication
1. Iterative / progresive changes
    - Creating new versions of presentational components should only cause duplication of presentational component code
    - Integrating with new APIs should not result in duplication of presentational component code
    - Changes to presentation / business / data layer should be able to be done without breaking changes, unless the use case has been changed
        - breaking changes include 
            - Removal of required keys from shared interfaces
            - Addition of mandatory keys in shared interfaces
            - Change of type of shared interfaces