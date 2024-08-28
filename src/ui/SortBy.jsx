import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

export default function SortBy({ options }) {
  const [params, setParams] = useSearchParams();
  const sortBy = params.get("sortBy") || "";

  function handleClick(e) {
    params.set("sortBy", e.target.value);
    setParams(params);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleClick}
      value={sortBy}
    ></Select>
  );
}
