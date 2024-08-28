import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const filtredValue = params.get("status");
  const filtred =
    !filtredValue || filtredValue === "all"
      ? null
      : { field: "status", value: filtredValue };

  const page = !params.get("page") ? 1 : Number(params.get("page"));
  const sortValue = params.get("sortBy") || "startDate-desc";
  const [sort, direction] = sortValue.split("-");
  const sorted = { sort, direction };

  const {
    data: { data: bookings, count } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", filtred, sorted, page],
    queryFn: () => getBookings(filtred, sorted, page),
  });

  if (page < Math.ceil(count / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filtred, sorted, page + 1],
      queryFn: () => getBookings(filtred, sorted, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filtred, sorted, page - 1],
      queryFn: () => getBookings(filtred, sorted, page - 1),
    });
  }

  return { bookings, isLoading, isError, count };
}
