import { getRouteInfo } from "@/utils/routeHelpers";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Burger,
  Group,
  Menu,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import { MdChevronRight } from "react-icons/md";
import styles from "./BreadCrumb.module.scss";

interface UpperNavProps {
  handleLogout: () => void;
  opened: boolean;
  toggle: () => void;
}

export const UpperNav = ({ handleLogout, opened, toggle }: UpperNavProps) => {
  const theme = useMantineTheme();
  const locations = useLocation();
  const routeInfo = getRouteInfo(locations.pathname, locations.state);

  // Generate breadcrumb items
  const breadcrumbItems =
    routeInfo.isNested && routeInfo.breadcrumbs
      ? routeInfo.breadcrumbs.map((item, index) => {
          const isLast = index === routeInfo.breadcrumbs!.length - 1;
          return (
            <Text
              className={styles.breadcrumbLink}
              c={isLast ? "black" : ""}
              style={{ color: "var(--mantine-color-neutral-5)" }}
              key={item.label}
            >
              {isLast ? item.label : <Link to={item.path}>{item.label}</Link>}
            </Text>
          );
        })
      : null;

  return (
    <Group justify="space-between" align="center" h={"100%"} px={"xxl"}>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

      {!routeInfo.isNested || !breadcrumbItems ? (
        <Title order={1} lh={"34px"}>
          {routeInfo.title === "Content"
            ? "Content management"
            : routeInfo.title}
        </Title>
      ) : (
        <Breadcrumbs
          separator={<MdChevronRight size={18} />}
          c={"neutral.5"}
          separatorMargin="0px"
          styles={{
            root: { gap: "4px" },
            separator: { color: theme.colors.neutral[5] },
          }}
        >
          {breadcrumbItems}
        </Breadcrumbs>
      )}

      <Menu shadow="md" width={144} position="bottom-end">
        <Menu.Target>
          <Avatar
            bg={theme.colors.customColor[6]}
            color="white"
            fw={"lighter"}
            radius="xl"
          >
            S
          </Avatar>
        </Menu.Target>

        <Menu.Dropdown
          bd={"1px solid #E5E7EB"}
          py={"xxs"}
          px={0}
          style={{
            borderRadius: "8px",
            boxShadow:
              "0px 24px 48px 0px #12121708,0px 10px 18px 0px #12121708, 0px 5px 8px 0px #1212170A, 0px 2px 4px 0px #1212170A",
          }}
        >
          <Menu.Item
            py={6}
            styles={{
              item: {
                paddingInline: 16,
                borderRadius: 0,
              },
            }}
          >
            <Text lh={"xs"} fz={"sm"}>
              {/* <Link to="/settings">Profile</Link> */}
            </Text>
          </Menu.Item>
          <Menu.Item
            styles={{
              item: {
                paddingInline: 16,
                borderRadius: 0,
              },
            }}
          >
            <Box
              c={theme.colors.utility[1]}
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              <Text lh={"xs"} fz={"sm"}>
                Log out
              </Text>
            </Box>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
