using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;
using Microsoft.Extensions.Localization;
using TTShang.Localization;

namespace TTShang.Blazor.Client;

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
