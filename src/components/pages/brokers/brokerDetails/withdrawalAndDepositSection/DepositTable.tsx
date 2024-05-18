import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CustomTable from "./CustomTabe";

const DepositTable = () => {
  const depositeColumns: ColumnDef<(typeof fakeData)[0]>[] = [
    {
      header: "Deposit Method",
      accessorKey: "depositMethod",
      cell: (row) => {
        console.log("row.getValue()", row.getValue());
        return (
          <div className="w-full h-full flex items-center justify-center mx-2">
            <Image
              width={100}
              height={100}
              src={String(row.getValue())}
              alt="Deposit Method"
              className="w-[58px] h-[44px]"
            />
          </div>
        );
      },
    },
    {
      header: "Commission",
      accessorKey: "commission",
    },
    {
      header: "Exchange Rate",
      accessorKey: "exchangeRate",
    },
    {
      header: "Processing Time",
      accessorKey: "proccessingTime",
    },
  ];
  return <CustomTable data={fakeData} columns={depositeColumns} />;
};

export default DepositTable;
const fakeData = [
  {
    depositMethod: "/images/png/bank.png",
    commission: 0,
    exchangeRate: "",
    proccessingTime: "Instant",
  },
  {
    depositMethod: "/images/png/bank.png",
    commission: 0,
    exchangeRate: "",
    proccessingTime: "Instant",
  },
  {
    depositMethod: "/images/png/bank.png",
    commission: 0,
    exchangeRate: "",
    proccessingTime: "Instant",
  },
  {
    depositMethod: "/images/png/bank.png",
    commission: 0,
    exchangeRate: "",
    proccessingTime: "Instant",
  },
  {
    depositMethod: "/images/png/bank.png",
    commission: 0,
    exchangeRate: "",
    proccessingTime: "Instant",
  },
  {
    depositMethod: "/images/png/bank.png",
    commission: 0,
    exchangeRate: "",
    proccessingTime: "Instant",
  },
];
