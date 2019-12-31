import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/" exact>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button
            as={Link}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
