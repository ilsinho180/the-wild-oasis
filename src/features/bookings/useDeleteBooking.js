import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooki, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("The booking was successfully deleted!");
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error("There was an error trying to delete the booking");
    },
  });

  return { deleteBooki, isDeleting };
}
