using System.Collections.Generic;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;

namespace Volo.Abp.AspNetCore.Components.WebAssembly.LeptonXLiteTheme.Bundling;

public class LeptonXLiteThemeBundleScriptContributor : BundleContributor
{
    public override void ConfigureBundle(BundleConfigurationContext context)
    {
        if (!context.Parameters.InteractiveAuto)
        {
            context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/libs/bootstrap/js/bootstrap.bundle.js");
        }

        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/js/lepton-x.bundle.min.js");
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/libs/jquery/jquery.min.js");
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/side-menu/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js");
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.Web.LeptonXLiteTheme/scripts/style-initializer.js");
        context.Files.AddIfNotContains("_content/Volo.Abp.AspNetCore.Components.WebAssembly.LeptonXLiteTheme/scripts/style-initializer.js");
    }
}
