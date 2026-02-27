using Microsoft.Extensions.Localization;
using TTShang.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace TTShang.Blazor;

[Dependency(ReplaceServices = true)]
public class TTShangBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<TTShangResource> _localizer;

    public TTShangBrandingProvider(IStringLocalizer<TTShangResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
