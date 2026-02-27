using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Identity;
using Volo.Abp.Identity.Localization;
using Volo.Abp.PermissionManagement.Blazor.Components;

namespace Volo.Abp.Identity.Blazor.Pages.Identity;

public partial class UserManagement
{
    protected const string PermissionProviderName = "U";
    protected const string DefaultSelectedTab = "UserInformations";

    [Inject] protected IIdentityUserAppService AppService { get; set; }
    [Inject] protected IPermissionChecker PermissionChecker { get; set; }
    [Inject] protected NavigationManager Navigation { get; set; }

    protected PermissionManagementModal PermissionManagementModal;

    protected IReadOnlyList<IdentityRoleDto> Roles;
    protected List<IdentityUserDto> Entities { get; set; } = new();
    protected int TotalCount { get; set; }
    protected int CurrentPage { get; set; } = 1;
    protected int PageSize { get; set; } = 10;
    protected string FilterText { get; set; } = string.Empty;

    protected bool HasCreatePermission { get; set; }
    protected bool HasUpdatePermission { get; set; }
    protected bool HasDeletePermission { get; set; }
    protected bool HasManagePermissionsPermission { get; set; }

    protected bool IsCreateDialogVisible { get; set; }
    protected IdentityUserCreateDto NewEntity { get; set; } = new();
    protected AssignedRoleViewModel[] NewUserRoles;
    protected bool ShowCreatePassword { get; set; }

    protected bool IsEditDialogVisible { get; set; }
    protected IdentityUserUpdateDto EditingEntity { get; set; } = new();
    protected Guid EditingEntityId { get; set; }
    protected AssignedRoleViewModel[] EditUserRoles;
    protected bool ShowEditPassword { get; set; }
    protected bool IsEditCurrentUser { get; set; }

    public UserManagement()
    {
        ObjectMapperContext = typeof(AbpIdentityBlazorModule);
        LocalizationResource = typeof(IdentityResource);
    }

    protected override async Task OnInitializedAsync()
    {
        await SetPermissionsAsync();
        try
        {
            Roles = (await AppService.GetAssignableRolesAsync()).Items;
        }
        catch (Exception ex)
        {
            await HandleErrorAsync(ex);
        }
        await LoadEntitiesAsync();
    }

    protected virtual async Task SetPermissionsAsync()
    {
        HasCreatePermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Users.Create);
        HasUpdatePermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Users.Update);
        HasDeletePermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Users.Delete);
        HasManagePermissionsPermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Users.ManagePermissions);
    }

    protected virtual async Task LoadEntitiesAsync()
    {
        try
        {
            var result = await AppService.GetListAsync(new GetIdentityUsersInput
            {
                Filter = FilterText,
                MaxResultCount = PageSize,
                SkipCount = (CurrentPage - 1) * PageSize
            });
            Entities = result.Items.ToList();
            TotalCount = (int)result.TotalCount;
        }
        catch (Exception ex)
        {
            await HandleErrorAsync(ex);
        }
    }

    protected virtual async Task OnSearchTextChanged(string value)
    {
        FilterText = value;
        CurrentPage = 1;
        await LoadEntitiesAsync();
    }

    protected virtual Task OpenCreateDialogAsync()
    {
        NewEntity = new IdentityUserCreateDto { IsActive = true, LockoutEnabled = true };
        NewUserRoles = Roles?.Select(x => new AssignedRoleViewModel { Name = x.Name, IsAssigned = x.IsDefault }).ToArray();
        ShowCreatePassword = false;
        IsCreateDialogVisible = true;
        return Task.CompletedTask;
    }

    protected virtual void CloseCreateDialog()
    {
        IsCreateDialogVisible = false;
    }

    protected virtual async Task CreateEntityAsync()
    {
        try
        {
            if (NewUserRoles != null)
                NewEntity.RoleNames = NewUserRoles.Where(x => x.IsAssigned).Select(x => x.Name).ToArray();
            await AppService.CreateAsync(NewEntity);
            IsCreateDialogVisible = false;
            await Notify.Success(L["SavedSuccessfully"].Value);
            await LoadEntitiesAsync();
        }
        catch (Exception ex)
        {
            await HandleErrorAsync(ex);
        }
    }

    protected virtual async Task OpenEditDialogAsync(IdentityUserDto entity)
    {
        try
        {
            EditingEntityId = entity.Id;
            IsEditCurrentUser = entity.Id == CurrentUser.Id;
            EditingEntity = ObjectMapper.Map<IdentityUserDto, IdentityUserUpdateDto>(entity);
            ShowEditPassword = false;

            if (await PermissionChecker.IsGrantedAsync(IdentityPermissions.Users.ManageRoles))
            {
                var userRoleIds = (await AppService.GetRolesAsync(entity.Id)).Items.Select(r => r.Id).ToList();
                EditUserRoles = Roles?.Select(x => new AssignedRoleViewModel
                {
                    Name = x.Name,
                    IsAssigned = userRoleIds.Contains(x.Id)
                }).ToArray();
            }
            IsEditDialogVisible = true;
        }
        catch (Exception ex)
        {
            await HandleErrorAsync(ex);
        }
    }

    protected virtual void CloseEditDialog()
    {
        IsEditDialogVisible = false;
    }

    protected virtual async Task UpdateEntityAsync()
    {
        try
        {
            if (EditUserRoles != null)
                EditingEntity.RoleNames = EditUserRoles.Where(x => x.IsAssigned).Select(x => x.Name).ToArray();
            await AppService.UpdateAsync(EditingEntityId, EditingEntity);
            IsEditDialogVisible = false;
            await Notify.Success(L["SavedSuccessfully"].Value);
            await LoadEntitiesAsync();
        }
        catch (Exception ex)
        {
            await HandleErrorAsync(ex);
        }
    }

    protected virtual async Task DeleteEntityAsync(IdentityUserDto entity)
    {
        var confirmed = await Message.Confirm(string.Format(L["UserDeletionConfirmationMessage"], entity.UserName));
        if (confirmed)
        {
            try
            {
                await AppService.DeleteAsync(entity.Id);
                await Notify.Success(L["SuccessfullyDeleted"].Value);
                await LoadEntitiesAsync();
            }
            catch (Exception ex)
            {
                await HandleErrorAsync(ex);
            }
        }
    }

    protected virtual async Task PageChangedAsync(int page)
    {
        CurrentPage = page;
        await LoadEntitiesAsync();
    }
}

public class AssignedRoleViewModel
{
    public string Name { get; set; }
    public bool IsAssigned { get; set; }
}
