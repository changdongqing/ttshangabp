using System;
using Volo.Abp.Ui.Branding;

namespace Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite;

public static class BrandingProviderExtensions
{
    public static bool IsExternalLogoUrl(this IBrandingProvider brandingProvider)
    {
        if (brandingProvider.LogoUrl.IsNullOrWhiteSpace())
        {
            return false;
        }

        return brandingProvider.LogoUrl.StartsWith("http://", StringComparison.CurrentCultureIgnoreCase)
               || brandingProvider.LogoUrl.StartsWith("https://", StringComparison.CurrentCultureIgnoreCase);
    }

    public static bool IsExternalLogoReverseUrl(this IBrandingProvider brandingProvider)
    {
        if (brandingProvider.LogoReverseUrl.IsNullOrWhiteSpace())
        {
            return false;
        }

        return brandingProvider.LogoReverseUrl.StartsWith("http://", StringComparison.CurrentCultureIgnoreCase)
               || brandingProvider.LogoReverseUrl.StartsWith("https://", StringComparison.CurrentCultureIgnoreCase);
    }
}
