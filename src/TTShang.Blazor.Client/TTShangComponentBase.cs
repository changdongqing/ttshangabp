using TTShang.Localization;
using Volo.Abp.AspNetCore.Components;

namespace TTShang.Blazor.Client;

public abstract class TTShangComponentBase : AbpComponentBase
{
    protected TTShangComponentBase()
    {
        LocalizationResource = typeof(TTShangResource);
    }
}
