import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { CheckoutBooking, isCheckout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckout}
      onClick={() => CheckoutBooking(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
