import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { data: booking = {}, isLoading } = useBooking();
  const [confirmPay, setConfirmPay] = useState(false);
  const { CheckinBooking, isChecking } = useChecking();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    if (booking?.isPaid === true) {
      setConfirmPay(true);
    }
  }, [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakPrice = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPay) return;
    if (addBreakfast) {
      CheckinBooking({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakPrice,
          totalPrice: totalPrice + optionalBreakPrice,
        },
      });
    } else CheckinBooking({ bookingId, breakfast: {} });
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPay((confirmPay) => !confirmPay);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPay}
          onChange={() => setConfirmPay((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPay || isChecking}
        >
          {addBreakfast
            ? `I confirm that ${
                guests.fullName
              } has paid the full amount of ${formatCurrency(
                totalPrice + optionalBreakPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakPrice
              )})`
            : `I confirm that ${
                guests.fullName
              } has paid the full amount of ${formatCurrency(totalPrice)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPay || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
