using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Volo.Abp.Identity;
using Volo.Abp.Identity.Localization;
using Volo.Abp.PermissionManagement.Blazor.Components;

namespace Volo.Abp.Identity.Blazor.Pages.Identity;

public partial class RoleManagement
{
    protected const string PermissionProviderName = "R";

    [Inject] protected IIdentityRoleAppService AppService { get; set; }

    protected PermissionManagementModal PermissionManagementModal;

    protected List<IdentityRoleDto> Entities { get; set; } = new();
    protected int TotalCount { get; set; }
    protected int CurrentPage { get; set; } = 1;
    protected int PageSize { get; set; } = 10;

    protected bool HasCreatePermission { get; set; }
    protected bool HasUpdatePermission { get; set; }
    protected bool HasDeletePermission { get; set; }
    protected bool HasManagePermissionsPermission { get; set; }

    protected bool IsCreateDialogVisible { get; set; }
    protected IdentityRoleCreateDto NewEntity { get; set; } = new();

    protected bool IsEditDialogVisible { get; set; }
    protected IdentityRoleUpdateDto EditingEntity { get; set; } = new();
    protected Guid EditingEntityId { get; set; }

    public RoleManagement()
    {
        ObjectMapperContext = typeof(AbpIdentityBlazorModule);
        LocalizationResource = typeof(IdentityResource);
    }

    protected override async Task OnInitializedAsync()
    {
        await SetPermissionsAsync();
        await LoadEntitiesAsync();
    }

    protected virtual async Task SetPermissionsAsync()
    {
        HasCreatePermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Roles.Create);
        HasUpdatePermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Roles.Update);
        HasDeletePermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Roles.Delete);
        HasManagePermissionsPermission = await AuthorizationService.IsGrantedAsync(IdentityPermissions.Roles.ManagePermissions);
    }

    protected virtual async Task LoadEntitiesAsync()
    {
        try
        {
            var result = await AppService.GetListAsync(new GetIdentityRolesInput
            {
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

    protected virtual Task OpenCreateDialogAsync()
    {
        NewEntity = new IdentityRoleCreateDto();
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

    protected virtual Task OpenEditDialogAsync(IdentityRoleDto entity)
    {
        EditingEntityId = entity.Id;
        EditingEntity = ObjectMapper.Map<IdentityRoleDto, IdentityRoleUpdateDto>(entity);
        IsEditDialogVisible = true;
        return Task.CompletedTask;
    }

    protected virtual void CloseEditDialog()
    {
        IsEditDialogVisible = false;
    }

    protected virtual async Task UpdateEntityAsync()
    {
        try
        {
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

    protected virtual async Task DeleteEntityAsync(IdentityRoleDto entity)
    {
        var confirmed = await Message.Confirm(string.Format(L["RoleDeletionConfirmationMessage"], entity.Name));
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

