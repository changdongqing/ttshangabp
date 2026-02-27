using System.Threading.Tasks;

namespace TTShang.Data;

public interface ITTShangDbSchemaMigrator
{
    Task MigrateAsync();
}
