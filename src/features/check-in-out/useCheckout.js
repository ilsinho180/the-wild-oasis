import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: CheckoutBooking, isLoading: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: () => {
      toast.success(`The checkout has been successfully!`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("Error");
    },
  });

  return { CheckoutBooking, isCheckout };
}
