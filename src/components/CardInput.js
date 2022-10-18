import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCore } from "@/providers/CoreProvider";
import { usePaymentControls } from "@/hooks/usePaymentControls";
import { getPriceFromService } from "@/utils/tools";

const CardInput = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { paymentData, isPaying } = useCore();
  const { payWithStripe } = usePaymentControls();

  const usdPrice = getPriceFromService(
    paymentData?.service?.toLowerCase() || "generator",
  );

  const containerColor = useColorModeValue("whiteAlpha.500", "blackAlpha.500");

  return (
    <Box bg={containerColor} borderRadius="10px" p="5" w="full">
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              color: "white",
            },
          },
        }}
      />
      <Button
        variant="primary"
        w="full"
        mt="1em"
        onClick={() => payWithStripe(stripe, elements, CardElement)}
        isLoading={isPaying}
        loadingText="Paying"
      >
        Pay ${usdPrice?.toFixed(2)} USD
      </Button>
    </Box>
  );
};

export default CardInput;
