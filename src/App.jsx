import { useState, useEffect } from "react";
import cartIcon from "./asset/icon-add-to-cart.svg";
import illustration from "./asset/illustration-empty-cart.svg";
import data from "./data.json";
import carbonNeutral from "./asset/icon-carbon-neutral.svg";
import checkIcon from "./asset/icon-order-confirmed.svg";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageUrl = (image) => {
    if (screenWidth <= 640) return image.mobile;
    if (screenWidth > 640 && screenWidth < 1024) return image.tablet;
    if (screenWidth >= 1024) return image.desktop;
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className=" fixed inset-0 bg-black bg-opacity-50">

        </div>
        <div className=" bg-white rounded-lg p-6 absolute bottom-0 left-0 right-0 sm:relative z-10 m-0 lg:max-w-md lg:mx-auto">
          <img src={checkIcon} alt="" className=" mb-8" />
          <h2 className=" text-[40px] font-bold">Order Confirmed</h2>
          <p className=" text-[#87635a] mb-[30px]">
            We hope you enjoy your food!
          </p>
          <div className=" bg-[#fcf9f7] rounded-lg p-4">
            {cart.map((item) => (
              <div
                key={item.name}
                className=" flex  justify-between items-center border-b pb-4 py-4 border-[#f4edeb] w-full"
              >
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className=" rounded-lg w-[60px] "
                />
                <div className=" self-start ml-4">
                  <p className=" font-semibold text-[10px] sm:text-[16px] lg:text-[16px] ">{item.name}</p>
                  <span className=" flex justify-start  items-center  ">
                    <p className=" mx-2 ml-0 font-semibold text-[#c73a0f] text-[10px] sm:text-[15px]">
                      {item.quantity}x
                    </p>
                    <p className=" ml-2 text-[#ad8985] text-[10px] sm:text-[15px]  ">
                      @${item.price}
                    </p>
                  </span>
                </div>{" "}
                <p className=" mx-2 ml-2 sm:ml-[60px] font-semibold text-[15px] sm:text-[18px]">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
            <div className="  my-6">
              <span className=" flex justify-between items-center ">
                <p>Order Total</p>
                <p className=" font-bold text-2xl">${totalPrice}</p>
              </span>
            </div>
          </div>
          <button
            onClick={refreshPage}
            className=" bg-[#c73a0f] my-4 mt-10 w-full h-[60px] rounded-full text-white font-semibold "
          >
            {" "}
            Start New Order
          </button>
          {children}
        </div>
      </div>
    );
  };
  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddToCart = (product) => {
    const updatedProducts = products.map((item) =>
      item.name === product.name ? { ...item, isInCart: true } : item
    );
    setProducts(updatedProducts);
    console.log(updatedProducts);

    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const handleIncrease = (product) => {
    setCart(
      cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (product) => {
    const updatedCart = cart
      .map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    // If the quantity is zero, set `isInCart` to false in `products`
    if (!updatedCart.find((item) => item.name === product.name)) {
      setProducts(
        products.map((item) =>
          item.name === product.name ? { ...item, isInCart: false } : item
        )
      );
    }
  };
  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((item) => item.name !== product.name));
    const updatedProducts = products.map((item) =>
      item.name === product.name ? { ...item, isInCart: false } : item
    );
    setProducts(updatedProducts);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const refreshPage = () => { window.location.reload(); }

  return (
    <div className=" bg-[#fcf9f7] absolute lg:flex-row  inset-0 font-redhat px-5 py-5 flex flex-col items-center lg:items-start lg:justify-around h-fit text-[#260f08]">
      <div>
        <h1 className=" text-[40px] font-bold text-[#260f08] self-start ">
          Desserts
        </h1>
        <div className="lg:grid  md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-6">
          {products.map((dessert) => (
            <div key={dessert.name} className=" ">
              <div className="  relative flex justify-center items-center w-fit h-fit">
                <img
                  src={getImageUrl(dessert.image)}
                  alt={dessert.name}
                  className={` rounded-xl my-5 w-[375px] lg:w-[270px] ${
                    dessert.isInCart ? " border-2 border-[#c73a0f]" : ""
                  }`}
                />
                {dessert.isInCart ? (
                  <div className=" absolute bottom-[-4px] flex justify-between items-center  w-[190px] h-[50px] rounded-full p-[10px] bg-[#c73a0f]  ">
                    <button
                      className="flex items-center justify-center group hover:bg-white border-[1.5px] border-white rounded-full p-1 w-[18px] h-[18px]"
                      onClick={() => handleDecrease(dessert)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="2"
                        fill="#fff"
                        className="group-hover:fill-[#c73a0f] hover:bg-white "
                        viewBox="0 0 10 2"
                      >
                        <path d="M0 .375h10v1.25H0V.375Z" />
                      </svg>
                    </button>
                    <p className=" text-white">
                      {
                        cart.find((item) => item.name === dessert.name)
                          ?.quantity
                      }
                    </p>
                    <button
                      className="flex items-center justify-center group hover:bg-white border-[1.5px] border-white rounded-full p-1 w-[18px] h-[18px]"
                      onClick={() => handleIncrease(dessert)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="#fff"
                        className="group-hover:fill-[#c73a0f]  "
                        viewBox="0 0 10 10"
                      >
                        <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(dessert)}
                    className="absolute bottom-[-4px] flex justify-center items-center border border-[#87635a] bg-[#fcf9f7] hover:border-[#c73a0f] hover:text-[#c73a0f] w-[190px] sm:w-[200px] sm:h-[60px] h-[50px] lg:w-[190px] lg:h-[50px] rounded-full p-[10px] "
                  >
                    <img src={cartIcon} alt="" className="m-2" />
                    <span className=" text-[16px] lg:text-[15px] sm:text-[20px] font-semibold ">
                      Add to Cart
                    </span>{" "}
                  </button>
                )}
              </div>
              <div className="">
                <h4 className=" mt-[20px] text-[#87635a] text-[12px] sm:text-[16px] lg:text-[15px] ">
                  {dessert.category}
                </h4>
                <h3 className=" text-[18px] sm:text-[22px] lg:text-[18px] font-semibold">
                  {dessert.name}
                </h3>
                <p className=" text-[#c73a0f] font-semibold mb-[10px] sm:text-[18px] lg:text-[16px]">
                  ${dessert.price}
                </p>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
      <div className=" h-fit bg-white rounded-2xl p-10  pt-7 my-10 lg:ml-10 lg:w-[400px]">
        <h2 className=" text-[25px] lg:mb-[10px] sm:text-[40px] lg:text-[28px] text-[#c73a0f] font-bold ">
          Your Cart ({totalQuantity})
        </h2>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div
                key={item.name}
                className=" flex justify-between items-center border-b pb-4 border-[#f4edeb] w-full"
              >
                <div className=" pt-[10px]">
                  <p className=" font-semibold text-[13px] sm:text-[20px] lg:text-[16px] w-fit text-[#260f08]">
                    {item.name}
                  </p>
                  <span className=" flex justify-start text-[10px] sm:text-[18px] lg:text-[14px] items-center  ">
                    <p className=" mx-1 sm:mx-2 ml-0 sm:ml-0 font-semibold text-[#c73a0f]">
                      {item.quantity}x
                    </p>
                    <p className=" mx-1 sm:mx-2 text-[#ad8985] ">
                      @${item.price}
                    </p>
                    <p className=" mx-1 sm:mx-2 ml-0 font-semibold text-[#87635a]">
                      ${item.price * item.quantity}
                    </p>
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="group border sm:border-[2px] border-[#CAAFA7] hover:border-black rounded-full p-[1px] sm:p-[3px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="#CAAFA7"
                    className="group-hover:fill-black sm:w-[15px] sm:h-[15px] lg:w-[12px] lg:h-[12px] "
                    viewBox="0 0 10 10"
                  >
                    <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                  </svg>
                </button>
              </div>
            ))}

            <div className="  my-6">
              <span className=" flex justify-between items-center ">
                <p className=" sm:text-[20px] lg:text-[18px] ">Order Total</p>
                <p className=" font-bold text-2xl sm:text-3xl lg:text-2xl ">
                  ${totalPrice}
                </p>
              </span>
              <span className=" flex bg-[#f4edeb] rounded-md p-6 py-4 items-center justify-center my-6">
                <img src={carbonNeutral} alt="" className=" sm:w-[27px] " />
                <p className="text-[10px] sm:text-[18px] lg:text-[15px] mx-2">
                  This is a <b className=" font-semibold">carbon-neutral</b>{" "}
                  delivery{" "}
                </p>
              </span>
              <button
                onClick={handleOpenModal}
                className="  bg-[#c73a0f] text-[13px] sm:text-[20px] lg:text-[17px] hover:bg-[#a94d31] w-full h-[60px] sm:h-[70px] lg:h-[60px] rounded-full text-white font-semibold "
              >
                {" "}
                Confirm Order
              </button>
            </div>
          </>
        ) : (
          <div className="  flex flex-col justify-center items-center m-5">
            <img src={illustration} alt="" />
            <span className=" text-[#87635a] mt-4">
              Your added items will appear here
            </span>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
