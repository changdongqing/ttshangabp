using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TTShang.Data;
using Volo.Abp.DependencyInjection;

namespace TTShang.EntityFrameworkCore;

public class EntityFrameworkCoreTTShangDbSchemaMigrator
    : ITTShangDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreTTShangDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the TTShangDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<TTShangDbContext>()
            .Database
            .MigrateAsync();
    }
}
