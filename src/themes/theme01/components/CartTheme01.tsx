/* eslint-disable react/jsx-no-undef */
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    useColorModeValue as mode,
    CloseButton,
    Select,
    SelectProps,
    useColorModeValue,
    Button,
    Text,
    Icon,
    Image,
    StackProps,
    TextProps,
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    WrapItem,
    Wrap,
    useToast,
  } from "@chakra-ui/react";
  import * as React from "react";
  import { FaArrowRight } from "react-icons/fa";
  import Link from "next/link";
  import { api } from "../../../services/api";
  import { RiBankCardLine } from "react-icons/ri";
  import { loadStripe } from "@stripe/stripe-js";
  import axios from "axios";
  import { useRouter } from "next/router";
  
  type OrderSummaryItemProps = {
    label: string;
    value?: string;
    children?: React.ReactNode;
  };
  
  type CartItemProps = {
    isGiftWrapping?: boolean;
    name: string;
    description: string;
    quantity: number;
    price: number;
    currency: string;
    imageUrl: string;
    onChangeQuantity?: (quantity: number) => void;
    onClickGiftWrapping?: () => void;
    onClickDelete?: () => void;
  };
  
  export type CartProductMetaProps = {
    isGiftWrapping?: boolean;
    name: string;
    description: any;
    image: string;
  };
  
  export const CartProductMeta = (props: CartProductMetaProps) => {
    const { isGiftWrapping = true, image, name, description } = props;
  
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="contain"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{name}</Text>
            <Text color={mode("gray.600", "gray.400")} fontSize="sm">
              {description?.map(
                (item: ProductOptionCartDTO) =>
                  item.productOption?.option?.name + ", "
              )}
            </Text>
          </Stack>
        </Box>
      </Stack>
    );
  };
  
  interface PriceTagProps {
    currency: string;
    price: number;
    salePrice?: number;
    rootProps?: StackProps;
    priceProps?: TextProps;
    salePriceProps?: TextProps;
  }
  
  export type FormatPriceOptions = { locale?: string; currency?: string };
  
  export function formatPrice(
    value: number,
    opts: { locale?: string; currency?: string } = {}
  ) {
    const { locale = "pt-BR", currency = "BRL" } = opts;
    const formatter = new Intl.NumberFormat(locale, {
      currency,
      style: "currency",
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  }
  
  export const PriceTag = (props: PriceTagProps) => {
    const { price, currency, salePrice, rootProps, priceProps, salePriceProps } =
      props;
    return (
      <HStack spacing="1" {...rootProps}>
        <Price isOnSale={!!salePrice} textProps={priceProps}>
          {formatPrice(price, { currency })}
        </Price>
        {salePrice && (
          <SalePrice {...salePriceProps}>
            {formatPrice(salePrice, { currency })}
          </SalePrice>
        )}
      </HStack>
    );
  };
  
  interface PriceProps {
    children?: React.ReactNode;
    isOnSale?: boolean;
    textProps?: TextProps;
  }
  
  const Price = (props: PriceProps) => {
    const { isOnSale, children, textProps } = props;
    const defaultColor = mode("gray.700", "gray.400");
    const onSaleColor = mode("gray.400", "gray.700");
    const color = isOnSale ? onSaleColor : defaultColor;
    return (
      <Text
        as="span"
        fontWeight="medium"
        color={"white"}
        textDecoration={isOnSale ? "line-through" : "none"}
        {...textProps}
      >
        {children}
      </Text>
    );
  };
  
  const SalePrice = (props: TextProps) => (
    <Text
      as="span"
      fontWeight="semibold"
      color={mode("gray.800", "gray.100")}
      {...props}
    />
  );
  
  const OrderSummaryItem = (props: OrderSummaryItemProps) => {
    const { label, value, children } = props;
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    );
  };
  
  export const CartOrderSummary = ({
    carts,
    store,
  }: {
    carts: CartDTO[];
    store: UserStoreDTO;
  }) => {
    let total = 0;
    if (carts) {
      carts.map((item: CartDTO) => {
        total = total + Number(item.price);
      });
    }
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log(store.user?.gatewayPayments);
    const [loading, setLoading] = React.useState(false);
    const toast = useToast()
  
    const verifyFrete = async () => {
      try {
        const customer = localStorage.getItem("lojadrn");
        const response = await api.post('orders/verify', {customer});
        if(response.data.status === 'success') {
          router.push('/' + store.slug + '/login')
        } else {
          toast({
            title: <Text color="#000">Selecione a entrega</Text>,
            status: 'error',
            isClosable: true,
          })
        }
      } catch(err) {
        toast({
          title: <Text color="#000">Selecione a entrega</Text>,
          status: 'error',
          isClosable: true,
        })
        console.log(err);
      }
    };
  
    // const itens: any = [];
    // const url = window.location.href.split("/");
    // console.log(url[2]);
    // const currency = "brl";
    // carts?.map((cart) => {
    //   const priceunit = (Number(cart.price) / Number(cart.quantity)).toFixed(2);
    //   let description = "";
    //   cart?.productOptionCart?.map((option) => {
    //     description = description + ", " + option.productOption?.option?.name;
    //   });
    //   itens.push({
    //     image:
    //       url[0] +
    //       "//" +
    //       url[2] +
    //       "/api/images/uploads/products/" +
    //       cart.product?.path,
    //     name: cart.product?.name,
    //     price: priceunit,
    //     description: "Extras: " + description,
    //     quantity: Number(cart.quantity),
    //   });
    // });
    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={store.colorBackground}>
            <ModalHeader>Forma de pagamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Wrap w="100%">
                {store.user?.gatewayPayments &&
                  store.user.gatewayPayments.map((item) => {
                    if (item.slug === "stripe") {
                      const stripePromise = loadStripe(String(item.apiToken));
                      const createCheckOutSession = async () => {
                        setLoading(true);
                        try {
                          const stripe = await stripePromise;
                          const checkoutSession = await axios.post(
                            "/api/create-stripe-session",
                            {
                              itens,
                              currency,
                              url: url[0] + '//' + url[2] + '/' + store.slug,
                              secretkey: item.apiKey,
                            }
                          );
                          if (stripe) {
                            console.log(checkoutSession.data.content);
                            const result = await stripe.redirectToCheckout({
                              sessionId: checkoutSession.data.content,
                            });
                            if (result.error) {
                              setLoading(false);
                              console.log(result.error.message);
                            } else {
                              localStorage.removeItem('lojadrn')
                            }
                          }
                        } catch (err) {
                          console.log(err);
                          setLoading(false);
                        }
                      };
                      return (
                        <WrapItem key={item.id} w="100%" pb="20px">
                          <Button
                            isLoading={loading}
                            onClick={createCheckOutSession}
                            w="100%"
                            leftIcon={<RiBankCardLine />}
                            color="white"
                            variant="outline"
                          >
                            Cartão de crédito
                          </Button>
                        </WrapItem>
                      );
                    }
                  })}
              </Wrap>
            </ModalBody>
          </ModalContent>
        </Modal> */}
        <Heading size="md">Resumo do pedido</Heading>
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value={formatPrice(total)} />
          <OrderSummaryItem label="Taxa/Entrega">
            <Link href="#">Calcular entrega</Link>
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {formatPrice(total)}
            </Text>
          </Flex>
        </Stack>
        {carts?.length > 0 && (
          <Button
            onClick={verifyFrete}
            colorScheme="green"
            size="lg"
            fontSize="md"
            rightIcon={<FaArrowRight />}
          >
            Efetuar pagamento
          </Button>
        )}
      </Stack>
    );
  };
  
  const deleteItem = async (id: number) => {
    console.log(id);
    try {
      const response = await api.delete("carts/delete/" + id);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
  export const CartItem = (cart: CartDTO) => {
    return (
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <CartProductMeta
          name={String(cart.product?.name)}
          description={cart.productOptionCart}
          image={"/api/images/uploads/products/" + String(cart.product?.path)}
        />
  
        {/* Desktop */}
        <Flex
          width="full"
          justify="space-between"
          display={{ base: "none", md: "flex" }}
        >
          <Button variant="outline">{cart.quantity}</Button>
          <PriceTag price={Number(cart.price)} currency={"BRL"} />
          <CloseButton
            onClick={() => deleteItem(Number(cart.id))}
            aria-label={`Delete ${name} from cart`}
          />
        </Flex>
  
        {/* Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{ base: "flex", md: "none" }}
        >
          <Text onClick={() => deleteItem(Number(cart.id))}>Deletar</Text>
          <Button variant="outline">{cart.quantity}</Button>
          <PriceTag price={Number(cart.price)} currency={"BRL"} />
        </Flex>
      </Flex>
    );
  };
  
  const CartTheme01 = ({ store }: { store: UserStoreDTO }) => {
    const [carts, setCarts] = React.useState<CartDTO[]>();
  
    React.useEffect(() => {
      const customer = localStorage.getItem("lojadrn");
      if (customer) {
        readCarts(String(customer));
      }
    }, []);
  
    const readCarts = async (customer: string) => {
      try {
        const res = await api.get("carts/get/bycustomer/" + customer);
        if (res.data) {
          setCarts(res.data.content);
        }
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <>
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Carrinho de compras ({carts?.length} itens)
              </Heading>
  
              <Stack spacing="6">
                {carts?.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </Stack>
            </Stack>
  
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary carts={carts as CartDTO[]} store={store} />
              <HStack mt="6" fontWeight="semibold">
                <p>ou</p>
                <Link href={"/" + store.slug}>
                  <Text color={mode("blue.500", "blue.200")}>
                    Continue comprando
                  </Text>
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      </>
    );
  };
  
  export default CartTheme01;
  