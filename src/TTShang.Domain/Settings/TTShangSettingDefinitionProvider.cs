using Volo.Abp.Settings;

namespace TTShang.Settings;

public class TTShangSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(TTShangSettings.MySetting1));
    }
}
