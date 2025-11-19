import { Suspense } from "react";
import { ProductionShell } from "./production-shell";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductionShell searchParams={searchParams} />
    </Suspense>
  );
}