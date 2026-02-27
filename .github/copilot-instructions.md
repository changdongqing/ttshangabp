# Copilot Instructions (TTShang ABP)

These instructions apply to this repository, which uses the ABP Layered (DDD) solution template.

## Core Principles (Always)
- Follow strict layered architecture and dependency direction.
- Use ABP base classes and provided services instead of manual plumbing.
- Keep domain logic inside the domain model (rich domain model).
- Prefer async all the way; no `.Result` or `.Wait()`.
- Use `Clock`/`IClock` instead of `DateTime.Now` or `DateTime.UtcNow`.
- Localize user-facing messages and exceptions.

## Layered Architecture
**Layers and responsibilities**
- Domain.Shared: constants, enums, localization keys, ETOs.
- Domain: entities, aggregate roots, repository interfaces, domain services.
- Application.Contracts: DTOs and application service interfaces.
- Application: application service implementations.
- EntityFrameworkCore: DbContext, repository implementations, migrations.
- HttpApi: controllers (if not using Auto API).
- Blazor: UI components and pages.
- DbMigrator: migrations and seeding.

**Dependency direction**
- Higher layers can depend on lower layers only.
- Domain never depends on infrastructure.
- HttpApi references contracts only.
- Application references Domain + Contracts.
- EF Core references Domain only.

## ABP Core Conventions
- Use the ABP module system (`AbpModule`) and put middleware setup only in the final host.
- Rely on automatic DI via marker interfaces: `ITransientDependency`, `ISingletonDependency`, `IScopedDependency`.
- Use `IRepository<TEntity, TKey>` for simple CRUD; define custom repositories only for custom queries.
- Base class properties to prefer before injecting:
  - `Clock`, `GuidGenerator`, `CurrentUser`, `CurrentTenant`, `L`, `AuthorizationService`, `FeatureChecker`, `DataFilter`, `UnitOfWorkManager`, `Logger`.
- Use `BusinessException` with namespaced codes and map to localization resources.

**Avoid (anti-patterns)**
- No Minimal APIs or MediatR.
- No `DbContext` directly in application services.
- No `AddScoped/AddTransient/AddSingleton` unless required (use marker interfaces).
- No business logic in controllers.
- No hardcoded role checks; use permissions.

## DDD Patterns (Domain)
- Entities should enforce invariants via methods; avoid public setters.
- Aggregate roots are consistency boundaries; child entities are modified through the aggregate.
- One repository per aggregate root only; no repositories for child entities.
- Use domain services (`*Manager`) when logic spans aggregates or needs repository checks.
- Use domain events: local for same transaction, distributed for cross-module events (ETOs).

## Application Layer
- App services accept/return DTOs only, never entities.
- Method naming: `GetAsync`, `GetListAsync`, `CreateAsync`, `UpdateAsync`, `DeleteAsync`.
- DTO naming conventions:
  - `Get{Entity}Input`, `Get{Entity}ListInput`, `Create{Entity}Dto`, `Update{Entity}Dto`, `{Entity}Dto`, `{Entity}ListItemDto`.
- Prefer DTO validation with data annotations; use `IValidatableObject` only for app-level rules.
- Do not call other app services in the same module; use domain services or events.

## Authorization and Permissions
- Define permissions in Application.Contracts and register in `PermissionDefinitionProvider`.
- Use `[Authorize(PermissionName)]` on app service methods.
- Use `CheckPolicyAsync` or `IsGrantedAsync` where needed.
- Use `CurrentUser` from base classes instead of injecting in app services.

## Multi-Tenancy
- Implement `IMultiTenant` for tenant-aware entities.
- Never manually filter by `TenantId`; ABP applies filters.
- Use `CurrentTenant.Change()` with `using` to switch tenant context.
- Use `DataFilter.Disable<IMultiTenant>()` only when required and supported.

## EF Core
- Always call `ConfigureByConvention()` when configuring entities.
- Use table prefix and schema constants.
- Avoid `AddDefaultRepositories(includeAllEntities: true)`.
- Use `IncludeDetails` extension patterns for eager loading.
- Use DbMigrator to apply migrations and seed data.

## Infrastructure
- Use `SettingDefinitionProvider` and `ISettingProvider` for settings.
- Use `FeatureDefinitionProvider` and `IFeatureChecker` for features.
- Use `IDistributedCache<T>` with `CacheName` for caching.
- Use local and distributed event buses appropriately.
- Use `AsyncBackgroundJob<TArgs>` for background jobs.

## Blazor UI
- Use `AbpComponentBase` or `AbpCrudPageBase` for pages.
- Use `L["Key"]` for localization.
- Use `AuthorizationService` or `AuthorizeView` for UI auth.
- Prefer service proxies from `HttpApi.Client` for data access.

## Testing
- Prefer integration tests with ABP test base classes.
- Use Shouldly for assertions.
- Add seeders for common test data.
- Disable authorization with `AddAlwaysAllowAuthorization()` when needed.

## ABP CLI Quick Reference
- `abp generate-proxy -t ng`
- `abp generate-proxy -t csharp -u https://localhost:44300`
- `abp install-libs`
- `abp add-package-ref <Project>`
- `abp update`
- `abp clean`

## Development Flow (Checklist)
- Domain entity + rules
- Domain.Shared constants/enums
- Repository interface (only if custom queries)
- EF Core mapping + migration
- DTOs and service interface (Contracts)
- App service implementation (Application)
- Localization keys
- Permissions
- Tests
