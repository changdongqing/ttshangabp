using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Volo.Abp.FeatureManagement.Blazor.Components;
using Volo.Abp.TenantManagement.Localization;

namespace Volo.Abp.TenantManagement.Blazor.Pages.TenantManagement;

public partial class TenantManagement
{
    protected const string FeatureProviderName = "T";

    [Inject] protected ITenantAppService AppService { get; set; }

    protected FeatureManagementModal FeatureManagementModal;

    protected List<TenantDto> Entities { get; set; } = new();
    protected int TotalCount { get; set; }
    protected int CurrentPage { get; set; } = 1;
    protected int PageSize { get; set; } = 10;

    protected bool HasCreatePermission { get; set; }
    protected bool HasUpdatePermission { get; set; }
    protected bool HasDeletePermission { get; set; }
    protected bool HasManageFeaturesPermission { get; set; }

    protected bool IsCreateDialogVisible { get; set; }
    protected TenantCreateDto NewEntity { get; set; } = new();
    protected bool ShowNewPassword { get; set; }

    protected bool IsEditDialogVisible { get; set; }
    protected TenantUpdateDto EditingEntity { get; set; } = new();
    protected Guid EditingEntityId { get; set; }

    public TenantManagement()
    {
        ObjectMapperContext = typeof(AbpTenantManagementBlazorModule);
        LocalizationResource = typeof(AbpTenantManagementResource);
    }

    protected override async Task OnInitializedAsync()
    {
        await SetPermissionsAsync();
        await LoadEntitiesAsync();
    }

    protected virtual async Task SetPermissionsAsync()
    {
        HasCreatePermission = await AuthorizationService.IsGrantedAsync(TenantManagementPermissions.Tenants.Create);
        HasUpdatePermission = await AuthorizationService.IsGrantedAsync(TenantManagementPermissions.Tenants.Update);
        HasDeletePermission = await AuthorizationService.IsGrantedAsync(TenantManagementPermissions.Tenants.Delete);
        HasManageFeaturesPermission = await AuthorizationService.IsGrantedAsync(TenantManagementPermissions.Tenants.ManageFeatures);
    }

    protected virtual async Task LoadEntitiesAsync()
    {
        try
        {
            var result = await AppService.GetListAsync(new GetTenantsInput
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
        NewEntity = new TenantCreateDto();
        ShowNewPassword = false;
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

    protected virtual Task OpenEditDialogAsync(TenantDto entity)
    {
        EditingEntityId = entity.Id;
        EditingEntity = ObjectMapper.Map<TenantDto, TenantUpdateDto>(entity);
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

    protected virtual async Task DeleteEntityAsync(TenantDto entity)
    {
        var confirmed = await Message.Confirm(string.Format(L["TenantDeletionConfirmationMessage"], entity.Name));
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
