"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
// import { DotsIcon } from "@/components/Management/icons/accounts/dots-icon";
// import { ExportIcon } from "@/components/Management/icons/accounts/export-icon";
// import { InfoIcon } from "@/components/Management/icons/accounts/info-icon";
// import { TrashIcon } from "@/components/Management/icons/accounts/trash-icon";
// import { SettingsIcon } from "@/components/Management/icons/sidebar/settings-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import TableWrapper from "./Table/TableWrapper";
import NewCustomers from "./NewCustomers/NewCustomers";
// import { AddUser } from "../EditAccount/add-user";

export const App = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = items?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Customers</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Customers</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search by names"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <NewCustomers />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper items={filteredUsers} />
      </div>
    </div>
  );
};
