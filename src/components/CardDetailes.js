import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DELETE } from "../redux/actions/action";

const CardDetailes = () => {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  const dispatch = useDispatch();

  const history = useNavigate();

  const getData = useSelector((state) => state.cartReducer.carts);

  const compare = () => {
    let item = getData.filter((e) => {
      return e.id == id;
    });
    setItems(item);
  };

  const total = () => {
    let total = getData.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    return total;
  };

  const removeItem = (id) => {
    dispatch(DELETE(id));
    history("/");
  };

  useEffect(() => {
    compare();
    total();
  }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Item details page</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {items.map((item) => {
              return (
                <>
                  <div className="items_img">
                    <img src={item.imgdata} alt="" />
                  </div>

                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            {" "}
                            <strong>Restaurent</strong> : {item.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹{item.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {item.address}, mughali
                          </p>
                          <p>
                            <strong>Total</strong> : ₹{total()}
                          </p>
                        </td>
                        <td>
                          <p>
                            <strong>Rating</strong> :{" "}
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {item.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review</strong> :{" "}
                            <span> {item.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove</strong> :{" "}
                            <span>
                              <i
                                className="fas fa-trash text-danger"
                                style={{ fontSize: 20, cursor: "pointer" }}
                                onClick={() => removeItem(item.id)}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardDetailes;
