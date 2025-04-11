import { AppShell, Box, Image, useMantineTheme } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { NavbarSimple } from "../../components/navbar/Navbar";
import { UpperNav } from "../../components/upperNav/UpperNav";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: RouteComponent,
  notFoundComponent: () => {
    return <p>This page doesn't exist!</p>;
  },
});

function RouteComponent() {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scroll] = useWindowScroll();

  const isAtTop = scroll.y === 0;

  const handleLogout = () => {
    navigate({ to: "/login" });
  };

  return (
    <AppShell
      layout="alt"
      header={{ height: 80, collapsed: !isAtTop }}
      navbar={{
        width: 264,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header
        withBorder={false}
        zIndex={2}
        style={{
          transition: "transform 300ms ease",
          transform: isAtTop ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <UpperNav opened={opened} handleLogout={handleLogout} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar bg={theme.colors.neutral[7]} withBorder={false}>
        <Box
          h={80}
          mb={24}
          px={"xl"}
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            loading="eager"
            alt="Company logo"
            height={"52%"}
            src="/logo.svg"
          />
        </Box>
        <NavbarSimple activeLink={location.href} />
      </AppShell.Navbar>
      <AppShell.Main
        pt={`80px`}
        style={{
          transition: "padding-top 300ms ease",
        }}
      >
        <Box px={"xxl"}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
