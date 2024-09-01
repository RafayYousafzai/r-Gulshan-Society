import { Image } from "@nextui-org/react";
import React from "react";

export default function SingleChallan({ mockData }) {
  return (
    <div>
      <div className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
        <div className="flex justify-center items-center gap-2">
          <div className="w-3/5">
            <Image
              radius={0}
              src={mockData.logoSrc}
              alt="logo"
              height={150}
              width={100}
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold ">
              Defence Housing Authority (DHA) Multan
            </h4>
            <p className="text-xs">
              <p className="font-semibold text-md">Recipient:</p>{" "}
              <p> {mockData.recipient}</p>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b py-6 text-xs">
          <p className="flex justify-between">
            <span className="text-gray-400">Ref No.:</span>
            <span>{mockData.id}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Challan No.:</span>
            <span>{mockData.challanNo}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Date.:</span>
            <span>{mockData.date}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Plot Size.:</span>
            <span>{mockData.plotSize}</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
          <h3 className="text-xs font-semibold">Banks</h3>
          <div className="grid grid-cols-2 gap-4">
            {mockData.bankAccounts.map((account, index) => (
              <div key={index} className="">
                <p>{account}</p>
              </div>
            ))}
          </div>

          <div className=" border-b border border-dashed"></div>

          <table className="w-full text-left">
            <thead>
              <tr className="flex">
                <th className="w-full py-2">Payment Type</th>
                <th className="min-w-[44px] py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockData.paymentDetails.map((detail, index) => (
                <tr className="flex" key={index}>
                  <td className="flex-1 py-1">{detail.type}</td>
                  <td className="min-w-[44px]">{detail.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className=" border-b border border-dashed"></div>
          <table className="w-full text-left">
            <thead>
              <tr className="flex">
                <th className="w-full py-2">Total Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex">
                <td className="flex-1 py-1">{mockData.totalPayment}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
