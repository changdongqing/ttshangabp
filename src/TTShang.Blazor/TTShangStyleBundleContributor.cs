using Volo.Abp.AspNetCore.Mvc.UI.Bundling;

namespace TTShang.Blazor;

public class TTShangStyleBundleContributor : BundleContributor
{
    public override void ConfigureBundle(BundleConfigurationContext context)
    {
        context.Files.Add(new BundleFile("main.css", true));
    }
}
