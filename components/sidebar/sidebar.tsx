import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Avatar, Tooltip } from "@nextui-org/react";
// import { BalanceIcon } from "../icons/sidebar/balance-icon";
// import { CustomersIcon } from "../icons/sidebar/customers-icon";
// import { ProductsIcon } from "../icons/sidebar/products-icon";
// import { CollapseItems } from "./collapse-items";
// import { DevIcon } from "../icons/sidebar/dev-icon";
// import { ViewIcon } from "../icons/sidebar/view-icon";
// import { SettingsIcon } from "../icons/sidebar/settings-icon";
// import { FilterIcon } from "../icons/sidebar/filter-icon";
// import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<AccountsIcon />}
                href="/customers"
              />
              <SidebarItem
                isActive={pathname === "/plots"}
                title="Plots"
                icon={<PaymentsIcon />}
                href="/plots"
              />
              <SidebarItem
                isActive={pathname === "/bookings"}
                title="Bookings"
                icon={<ReportsIcon />}
                href="/bookings"
              />
            </SidebarMenu>

            {/* <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/"}
                title="Website"
                icon={<DevIcon />}
                href="/"
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </div>
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              // <Link href="/client/edit-profile">
                <Avatar src="/user.jpg" size="sm" />
              // </Link>
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};
