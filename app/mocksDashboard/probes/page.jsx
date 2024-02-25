import ProbesTable from "@app/ui/probes/table"
import { MocksTableSkeleton } from "@app/ui/skeletons"
import { Suspense } from "react"
export default function Page() {
    return(
        <>
        <Suspense fallback={<MocksTableSkeleton />}>
        <ProbesTable />

        </Suspense>
        </>
    )
}