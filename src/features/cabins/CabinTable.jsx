import Spinner from "../../ui/Spinner";
import CabinRow from "../cabins/CabinRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";

import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [params] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="Cabins" />;

  const filtredValue = params.get("discount") || "all";
  const sortBy = params.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  let filtredCabins;

  if (filtredValue === "all") filtredCabins = cabins;
  if (filtredValue === "with-discount")
    filtredCabins = cabins.filter((cabin) => cabin.discount !== 0);
  if (filtredValue === "no-discount")
    filtredCabins = cabins.filter((cabin) => cabin.discount === 0);

  const modify = direction === "asc" ? 1 : -1;

  let sortByCabins = filtredCabins.sort(
    (a, b) => (a[field] - b[field]) * modify
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortByCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
