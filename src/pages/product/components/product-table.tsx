import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cell, ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { AppDispatch } from "@/stores/store";
import { productError, productStatus } from "@/stores/product-slice";
import { columns } from "./table-column";
import { Link } from "react-router-dom";
import {
  selectProducts,
  productsStatus,
  productsError,
  getAllProducts,
} from "@/stores/products-slice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CellComponentProps<TData> {
  cell: Cell<TData, unknown>;
}

export const ProductTable = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const statusProducts = useSelector(productsStatus);
  const statusProduct = useSelector(productStatus);
  const errorProducts = useSelector(productsError);
  const errorProduct = useSelector(productError);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (statusProducts === "idle") {
        dispatch(getAllProducts());
      }
    }
    return () => {
      ignore = true;
    };
  }, [statusProducts]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (statusProduct !== "loading") {
        dispatch(getAllProducts());
      }
    }
    return () => {
      ignore = true;
    };
  }, [statusProduct]);

  return (
    <div>
      <div className="border-[1px] border-black rounded-lg">
        {statusProducts === "loading" || statusProduct === "loading" ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : statusProducts === "succeeded" ? (
          <TableComponent />
        ) : (
          <div className="text-center py-4 px-2">
            {errorProduct ? `product error: ${errorProduct}` : errorProducts && `products error: ${errorProducts}`}
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <h2 className="text-base font-mono">
          <strong>API: </strong>
          <Link
            to="https://651d253844e393af2d593be2.mockapi.io/products"
            className="text-blue-400 text-sm sm:text-lg"
          >
            https://651d253844e393af2d593be2.mockapi.io/products
          </Link>
        </h2>

        <h5 className="mt-5">legends once said...</h5>
        <blockquote className="italic text-indigo-600 font-semibold">blazingly fast!</blockquote>
      </div>
    </div>
  );
});

function TableComponent() {
  const products = useSelector(selectProducts);

  const table = useReactTable({
    data: products,
    columns: columns as ColumnDef<unknown, unknown>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className="border-[1px] border-gray-200 text-center rounded-lg"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => {
                  return <CellComponent key={cell.id} cell={cell} />;
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function CellComponent<TData>({ cell }: CellComponentProps<TData>) {
  return (
    <TableCell className="text-center border-[1px] border-gray-200 rounded-lg">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
}
