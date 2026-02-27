using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace TTShang.Data;

/* This is used if database provider does't define
 * ITTShangDbSchemaMigrator implementation.
 */
public class NullTTShangDbSchemaMigrator : ITTShangDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
