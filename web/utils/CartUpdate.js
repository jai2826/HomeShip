import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(import.meta.env.VITE_HYGRAPH_ENDPOINT, {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN}`,
  },
});

export const clearCart = async (userEmail) => {
  const clearQuery = gql`
    mutation MyMutation {
      updateCustomer(
        data: { cart: { delete: true } }
        where: { email: "${userEmail}" }
      ){
        id
      }
      publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED){
      id
    }
    }
  `;
  const Newdata = await graphQLClient.request(clearQuery);
  return Newdata.updateCustomer;
};

export const clearItem = async (stateCart, data) => {
  let totalcost = 0,
    totalqty = 0;
  const query = gql`
    mutation MyMutation {
      updateCustomer(
        data: {cart: {update: {where: {id: "${stateCart.cartId}"}, data: {totalCost: ${totalcost}, totalQuantity: ${totalqty}, orderItems: {delete: {id: "${data.id}"}}}}}}
        where: { email: "test@gmail.com" }
      ){
        id
        cart {
          id
          orderItems {
            total
            id
            quantity
            product {
              id
              images {
                url
              }
              name
              price
            }
          }
        }
      }
      publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED) {
        id
      } 
    }
  `;
  const Newdata = await graphQLClient.request(query);
  return Newdata.updateCustomer;
};

export const setItem = async (stateCart, CartId, data) => {
  // console.log(stateCart);
  if (stateCart.length === 0) {
    const quantity = 1;
    const total = data.price;
    const query = gql`
    mutation MyMutation {
      updateCustomer(
        data: {cart: {create: {orderItems: {create: {quantity: ${quantity}, product: {connect: {id: "${data.id}"}}, total: ${total}}}}}}
        where: {email: "test@gmail.com"}
        ){
          id
          cart {
            id
            orderItems {
              total
              id
              quantity
              product {
                id
                images {
                  url
                }
                name
                price
              }
            }
          }
        }
    publishManyOrderItems(to: PUBLISHED, where: {product: {id: "${data.id}"}}) {
          count
    }
    publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED) {
      id
    }
  }
  `;
    const Newdata = await graphQLClient.request(query);
    return Newdata.updateCustomer;
  } else {
    const filteredArray = stateCart.filter((item) => {
      return item.product.id === data.id;
    });
    if (filteredArray.length === 0) {
      const quantity = 1;
      const total = data.price;
      const query = gql`
      mutation MyMutation {
        updateCustomer(
          where: {email: "test@gmail.com"}
          data: {cart: {update: {where: {id: "${CartId}"}, data: {orderItems: {create: {quantity: ${quantity}, total: ${total}, product: {connect: {id: "${data.id}"}}}}}}}}
          ){
            id
            cart {
              id
              orderItems {
                total
                id
                quantity
                product {
                  id
                  images {
                    url
                  }
                  name
                  price
                }
              }
            }
          }
      publishManyOrderItems(to: PUBLISHED, where: {product: {id: "${data.id}"}}) {
            count
      }
      publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED) {
        id
      }
        }
        `;
      const Newdata = await graphQLClient.request(query);
      return Newdata.updateCustomer;
    } else {
      let quantity = filteredArray[0].quantity + 1;
      let total = filteredArray[0].total + data.price;
      // console.log(filteredArray[0].quantity , filteredArray[0].total )
      // console.log(quantity , total )

      const query = gql`
      mutation MyMutation {
        updateCustomer(
          where: {email: "test@gmail.com"}
          data: {cart: {update: {where: {id: "${CartId}"}, data: {orderItems: {update: {where: {id: "${filteredArray[0].id}"}, data: {quantity: ${quantity}, total: ${total}}}}}}}}
          ) {
            id
            cart {
              id
              orderItems {
                total
                id
                quantity
                product {
                  id
                  images {
                    url
                  }
                  name
                  price
                }
              }
            }
          }
      publishManyOrderItems(to: PUBLISHED, where: {product: {id: "${data.id}"}}) {
            count
      }
      publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED) {
        id
      }
        }
        `;
      const Newdata = await graphQLClient.request(query);
      // console.log(Newdata.updateCustomer.cart);
      return Newdata.updateCustomer;
    }
  }
};

export const decreaseItem = async (stateCart, CartId, data) => {
  const filteredArray = stateCart.filter((item) => {
    return item.product.id === data.product.id;
  });
  let quantity = filteredArray[0].quantity - 1;
  let total = filteredArray[0].total - data.product.price;

  // console.log(data)
  // console.log(filteredArray, quantity, total)

  if (filteredArray[0].quantity > 1) {
    const query = gql`
    mutation MyMutation {
      updateCustomer(
        data: {cart: {update: {where: {id: "${CartId}"}, data: {orderItems: {update: {where: {id: "${filteredArray[0].id}"}, data: {quantity: ${quantity}, total: ${total}}}}}}}}
        where: { email: "test@gmail.com" }
      ){
        id
        cart {
          id
          orderItems {
            total
            id
            quantity
            product {
              id
              images {
                url
              }
              name
              price
            }
          }
        }
      }
      publishManyOrderItems(to: PUBLISHED, where: {product: {id: "${data.id}"}}) {
            count
      }
      publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED) {
        id
      }      
    }
  `;
    const Newdata = await graphQLClient.request(query);
    return Newdata.updateCustomer;
  } else {
    const query = gql`
    mutation MyMutation {
      updateCustomer(
        data: {cart: {update: {where: {id: "${CartId}"}, data: {orderItems: {delete: {id: "${data.id}"}}}}}}
        where: { email: "test@gmail.com" }
      ){
        id
        cart {
          id
          orderItems {
            total
            id
            quantity
            product {
              id
              images {
                url
              }
              name
              price
            }
          }
        }
      }
      publishCustomer(where: {email: "test@gmail.com"}, to: PUBLISHED) {
        id
      }      
    } 
    `;
    const Newdata = await graphQLClient.request(query);
    return Newdata.updateCustomer;
  }
};
