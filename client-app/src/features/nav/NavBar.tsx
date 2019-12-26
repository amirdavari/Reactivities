import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  OpenCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({ OpenCreateForm }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={OpenCreateForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
