import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { DELETE } from "../redux/actions/action";

const Header = () => {
  const getData = useSelector((state) => state.cartReducer.carts);
  console.log(getData);

  const dispatch = useDispatch();

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeItem = (id) => {
    if (getData.length == 1) {
      history("/");
    }
    dispatch(DELETE(id));
    total();
  };

  const total = () => {
    let total = 0;
    getData.map((item) => {
      total += item.price * item.qnty;
    });
    return total;
  };

  useEffect(() => {
    total();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
      <Container>
        <NavLink to="/" className="text-decoration-none text-light mx-3">
          Add to cart
        </NavLink>
        <Nav className="me-auto">
          <NavLink to="/" className="text-decoration-none text-light">
            Home
          </NavLink>
        </Nav>

        <Badge
          badgeContent={getData.length}
          color="primary"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <i
            className="fa-solid fa-cart-shopping text-light"
            style={{ fontSize: 25, cursor: "pointer" }}
          ></i>
        </Badge>
      </Container>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {getData.length ? (
          <div className="card_details" style={{ width: "24rem", padding: 10 }}>
            <Table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Restaurent Name</th>
                </tr>
              </thead>
              <tbody>
                {getData.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <img
                            src={e.imgdata}
                            style={{ width: "5rem", height: "rem" }}
                          ></img>
                        </NavLink>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price : ₹{e.price}</p>
                        <p>Quantity : {e.qnty}</p>
                        <p
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => removeItem(e.id)}
                        >
                          <i className="fas fa-trash smalltrash"></i>
                        </p>
                      </td>
                      <td
                        className="mt-5"
                        style={{
                          color: "red",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => removeItem(e.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
                <span className="text-center">Total : ₹{total()}</span>
              </tbody>
            </Table>
          </div>
        ) : (
          <div
            className="cart_details d-flex justify-content-center align-items-center"
            style={{ width: "22rem", padding: 10, position: "relative" }}
          >
            <i
              className="fas fa-close smallclose"
              style={{
                position: "absolute",
                top: 2,
                right: 30,
                fontSize: 23,
                cursor: "pointer",
              }}
              onClick={handleClose}
            ></i>
            <p style={{ fontSize: 22 }}>Your Carts is empty</p>
            <img
              className="emptycart_img"
              style={{ width: "5rem", padding: 10 }}
              src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
              alt=""
            />
          </div>
        )}
      </Menu>
    </Navbar>
  );
};

export default Header;
