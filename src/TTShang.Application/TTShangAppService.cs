using TTShang.Localization;
using Volo.Abp.Application.Services;

namespace TTShang;

/* Inherit your application services from this class.
 */
public abstract class TTShangAppService : ApplicationService
{
    protected TTShangAppService()
    {
        LocalizationResource = typeof(TTShangResource);
    }
}
