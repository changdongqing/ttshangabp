using TTShang.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace TTShang.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(TTShangEntityFrameworkCoreModule),
    typeof(TTShangApplicationContractsModule)
)]
public class TTShangDbMigratorModule : AbpModule
{
}
