import { Box, Collapse, Group, useMantineTheme } from "@mantine/core";
import { MdKeyboardArrowDown } from "react-icons/md";

import { IconDoorFront } from "@/assets/icons";
import { IconProps } from "@/utils/types";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styles from "./navbar.module.scss";

interface LinksGroupProps {
  link?: string;
  icon: React.FC<IconProps>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const data: LinksGroupProps[] = [
  { link: "/", label: "Dashboard", icon: IconDoorFront },
  { link: "/pet", label: "Pets", icon: IconDoorFront },
  { link: "/quiz", label: "Quiz", icon: IconDoorFront },
];

export function NavbarSimple({ activeLink }: { activeLink: string }) {
  const [active, setActive] = useState(activeLink);
  const theme = useMantineTheme();
  useEffect(() => {
    setActive(activeLink);
  }, [activeLink]);

  const handleLinkClick = (link: string) => {
    setActive(link);
  };

  // Helper function to check if a parent item should be active
  const isParentActive = (item: LinksGroupProps): boolean => {
    if (!item.links) return false;

    return item.links.some((link) => {
      // For exact matches
      if (active === link.link) return true;

      // For nested routes (like /orders/123)
      const activeParts = active.split("/").filter(Boolean);
      const linkParts = link.link.split("/").filter(Boolean);

      if (linkParts.length > 0 && activeParts.length > 0) {
        return activeParts[0] === linkParts[0];
      }

      return false;
    });
  };

  // Helper function to check if a link should be active
  const isLinkActive = (linkPath: string): boolean => {
    // if (!isValidPath(active)) return false;

    if (linkPath === "/" && active === "/") return true;

    // For links with sub-items (dropdown menus)
    if (linkPath === "") return false;

    // Extract the root part of the current active path
    const activeParts = active.split("/").filter(Boolean);
    const linkParts = linkPath.split("/").filter(Boolean);

    // if does not match the nav data false is returned
    if (activeParts.length === 0 || linkParts.length === 0) return false;

    // Special case for root links (e.g., /orders, /customers)
    if (linkParts.length === 1) {
      return activeParts[0] === linkParts[0];
    }

    let match = true;
    for (let i = 0; i < linkParts.length; i++) {
      if (i >= activeParts.length || activeParts[i] !== linkParts[i]) {
        match = false;
        break;
      }
    }

    return match;
  };

  const links = data.map((item: LinksGroupProps) => {
    if (item === null) throw new Error("error");
    const { icon: Icon, label, initiallyOpened, links, link = "#" } = item;

    const hasLinks = Array.isArray(links);
    const shouldBeOpen = initiallyOpened || (hasLinks && isParentActive(item));
    const [opened, setOpened] = useState(shouldBeOpen);

    // Update opened state when active link changes
    useEffect(() => {
      if (hasLinks && isParentActive(item)) {
        setOpened(true);
      }
    }, [active, hasLinks]);

    const items = hasLinks
      ? item.links!.map((link) => (
          <Link
            key={link.label}
            onClick={() => handleLinkClick(link.link)}
            to={link.link}
            className={`${styles.link} ${styles["link--nested"]}`}
            data-active={isLinkActive(link.link) ? true : undefined}
          >
            {active === link.label || undefined}
            {link.label}
          </Link>
        ))
      : null;

    return (
      <div key={item.label}>
        <Link
          to={link || "#"}
          onClick={() => {
            if (hasLinks) {
              setOpened((o) => !o);
            } else {
              handleLinkClick(link);
            }
          }}
          data-active={!hasLinks && isLinkActive(link) ? true : undefined}
          className={styles.link}
        >
          <Icon
            color={
              hasLinks && opened
                ? theme.colors.neutral[4]
                : isLinkActive(link)
                  ? theme.colors.customColor[6]
                  : "black"
            }
          />
          <Group justify="space-between" w={"100%"}>
            <Box c={hasLinks && opened ? "neutral.4" : ""}>{label}</Box>
            {hasLinks && (
              <MdKeyboardArrowDown
                className={styles.chevron}
                size={18}
                style={{
                  transform: opened ? "rotate(-180deg)" : "none",
                  transition: "ease-in-out",
                }}
              />
            )}
          </Group>
        </Link>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </div>
    );
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarMain}>{links}</div>
    </nav>
  );
}
