import { Button, ButtonGroup, Divider, IconButton, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { namestorage } from "../../../config/variables";
import { addOrderService } from "../../../services/StoreServices/AddOrderService";
import { ProductType } from "../../../types/ProductType";
import { StoreThemeType } from "../../../types/StoreThemeType";
import styles from "./styles/Product.module.css";

export default function ProductTheme01({product, store}: {product: ProductType,store: StoreThemeType}) {
    const [quantity, setQuantity] = useState(1);
  const [optionsName, setOptionsName] = useState<string[]>([]);
  const [optionsPrice, setOptionsPrice] = useState<number[]>([]);
  const [adicional, setAdicional] = useState(0);
  const [idProductOption, setIdProductOption] = useState<string[]>([]);
  const router = useRouter();

  const addOption = (name: string, price: string, id: string) => {
    setOptionsName([...optionsName, name]);
    setIdProductOption([...idProductOption, id]);
    setOptionsPrice([...optionsPrice, Number(Number(price).toFixed(2))]);
    setAdicional(adicional + Number(price))
  }

  const removeOption = (name: string, price: string, id: string) => {
    setOptionsName(optionsName.filter(item => item !== name));
    setIdProductOption(idProductOption.filter(item => item !== id));
    setOptionsPrice(optionsPrice.filter((item: number) => item !== Number(price)));
    setAdicional(adicional - Number(price))
  }

  const setCart = async () => {
    const price = ((Number(product.price) * quantity) + adicional).toFixed(2);
    const customerTemp = localStorage.getItem(namestorage);
    const json = {
      productId: product.id, 
      idProductOption, 
      quantity, 
      price,
      userId: product.userId, 
      customerTemp
    }
    const data = await addOrderService(json, 'carts');
    if(data) {
        router.push('/' + store.slug + '/cart')
    }
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: store.colorBackground, color: "#fff" }}
    >
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={"/api/uploads/products/" + product.path}
            objectFit="contain"
            layout="fill"
            alt=""
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title} style={{ fontSize: 30 }}>
          {product.name}
        </h1>
        <small>{product.category?.name}</small>
        <br />
        <span className={styles.price} style={{ textDecoration: "none" }}>
          R$ {((Number(product.price) * quantity) + adicional).toFixed(2).replace(".", ",")}
        </span>
        <p
          style={{ marginTop: "20px" }}
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: String(product.description) }}
        ></p>
        <Divider my="5px" bg={store.colorFooter} h="1px" />
        <h3 className={styles.choose} style={{ marginTop: "20px" }}>
          {product.productGroups &&
            product.productGroups.map((item) => {
                return (
                  <Wrap key={item.id}>
                    <WrapItem w="100%">
                      <Text fontSize={20}>{item.name}</Text>
                    </WrapItem>
                    {item.productOptions &&
                      item.productOptions.map((op) => {
                        return (
                          <WrapItem key={"option" + op.id}>
                            <Button variant="outline" textColor={optionsName.includes(String(op.name)) ? 'black' : 'white'} bg={optionsName.includes(String(op.name)) ? 'white' : 'transparent'} onClick={() => optionsName.includes(String(op.name)) ? removeOption(String(op.name), String(op.price), String(op.id)) : addOption(String(op.name), String(op.price), String(op.id))}>
                              {op.name}
                            </Button>
                          </WrapItem>
                        );
                      })}
                    <WrapItem w="100%">
                      <Divider my="5px" bg={store.colorFooter} h="1px" />
                    </WrapItem>
                  </Wrap>
                );
              
              
            })}
        </h3>
        <ButtonGroup size="md" mt="20px" isAttached variant="outline">
          <IconButton
            aria-label="Diminuir"
            icon={<RiSubtractLine />}
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
          />
          <Button>{quantity}</Button>
          <IconButton
            aria-label="Aumentar"
            icon={<RiAddLine />}
            onClick={() => setQuantity(quantity + 1)}
          />
          <Button onClick={() => setCart()}>Adicionar ao carrinho</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}