using TTShang.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace TTShang.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class TTShangController : AbpControllerBase
{
    protected TTShangController()
    {
        LocalizationResource = typeof(TTShangResource);
    }
}
