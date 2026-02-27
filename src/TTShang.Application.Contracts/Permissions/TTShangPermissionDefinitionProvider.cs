using TTShang.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace TTShang.Permissions;

public class TTShangPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(TTShangPermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(TTShangPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<TTShangResource>(name);
    }
}
