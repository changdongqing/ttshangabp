using System.Collections.Generic;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonXLiteTheme.Bundling;

public class LeptonXLiteThemeBundleStyleContributor : BundleContributor
{
    public override void ConfigureBundle(BundleConfigurationContext context)
    {
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/libs/chart.js/Chart.min.css");
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css");
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/libs/bootstrap-icons/font/bootstrap-icons.css");
    }
}
