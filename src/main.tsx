import { createRouter, Link, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "@mantine/charts/styles.css";
import {
  ActionIcon,
  Alert,
  Button,
  createTheme,
  Input,
  MantineProvider,
  PasswordInput,
  Table,
  TextInput,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { DatesProvider } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import stylesAlert from "./Alert.module.scss";
import "./global.scss";
import styles from "./Input.module.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  context: { auth: undefined! },
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link to="/">Go home</Link>
      </div>
    );
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const theme = createTheme({
  spacing: {
    xxs: "0.5rem",
    lg: "1.5rem",
    xxl: "2.5rem",
  },

  fontFamily: "Inter, sans-serif",
  defaultRadius: "8px",
  headings: {
    sizes: {
      h1: {
        fontSize: "24px",
        lineHeight: "140%",
        fontWeight: "500",
      },
      h2: {
        fontSize: "20px",
        fontWeight: "500",
        lineHeight: "28px",
      },
    },
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "14px",
    lg: "16px",
    xl: "24px",
  },
  lineHeights: {
    xs: "140%",
    sm: "20px",
    md: "20px",
    lg: "150%",
    xl: "150%",
  },
  colors: {
    neutral: [
      "#1C1C1C", // Black
      "#F0F4F5", // border disable 1
      "#FAFAFA", // Light Gray
      "#B4B4B4", // Inactive Gray 3
      "#484848", // Gray Text 4
      "#aaaaaa", // Placeholder 5
      "#b4b4b4", // border 6
      "#F3F3F4", // dashboard highlight 7
      "#757575", // nav links 8
      "#EBEBEB", // Lightest 9
    ],
    customColor: [
      "#C6EAF4",
      "#C6EAF4",
      "#A7DEEC",
      "#88D2E5",
      "#69C6DD",
      "#58B5D0",
      "#234064", // Base color
      "#387386", // Primary Hover
      "#285361",
      "#19223D", // Darkest
    ],
    utility: [
      "#E5F6FB", // Lightest
      "#D43A20",
      "#005BD3",
      "#88D2E5",
      "#69C6DD", //utility 4
      "#234064", // Base color
      "#3F3F50", //utility 6
      "#387386",
      "#285361",
      "#19223D", // Darkest
    ],
    status1: [
      "#0F4527", //0
      "#EF7800", //1
      "#0075AD", //2
      "#7047EB", //3
      "#0075AD", //4
      "#A5088C", //5
      "#282833", //6
      "#16A085", //7
      "#DFF8EA", //8
      "#FFF3D6", //9
    ],
    status2: [
      "#DBF3FF", //0 Light Blue
      "#E2DAFB", //1 Light Lavender
      "#F0FAFF", //2 Very Light Blue
      "#FDDDF8", //3 Light Pink
      "#F2F2F2", //4 Light Gray
      "#D1F2EB", //5 Light Mint
      "#FFE8E1", //6 Soft Peach
      "#FFD6E6", //7 Light Coral (added)
      "#CFE8FF", //8 Sky Blue (added)
      "#E9FFE8", //9 Pale Green (added)
    ],
  },
  //changes
  black: "#1C1C1C",
  primaryColor: "customColor",
  components: {
    Button: Button.extend({
      defaultProps: {
        h: 37,
        fw: 500,
        py: 0,
      },
      styles: {
        root: {
          paddingBlock: 0,
        },
        inner: {
          height: "100%",
        },
        label: {
          fontWeight: 500,
          lineHeight: 21,
        },
      },
      classNames: {
        root: styles.button,
      },
    }),
    TextInput: TextInput.extend({
      classNames: {
        input: styles.textInput,
      },
      styles: () => ({
        section: {
          width: 24,
          height: 40,
          marginLeft: 12,
        },
        label: {
          marginBottom: 8,
        },
      }),
    }),
    PasswordInput: PasswordInput.extend({
      classNames: {
        input: styles.passwordInput,
        innerInput: styles.passwordInnerInput,
      },
      styles: () => ({
        label: {
          marginBottom: 8,
        },
      }),
    }),
    Input: Input.extend({
      classNames: {
        input: styles.textInput,
      },
      defaultProps: {
        h: 40,
      },
    }),
    Table: Table.extend({
      styles: (theme: any) => ({
        tr: {
          borderBottom: `1px solid ${theme.colors.neutral[9]}`,
        },
      }),
      defaultProps: {
        highlightOnHover: true,
        highlightOnHoverColor: "neutral.7",
      },
    }),
    DatePickerInput: {
      styles: () => ({
        input: {
          paddingBlock: "9px",
          height: "40px",
        },
      }),
    },
    Checkbox: {
      classNames: {
        input: styles.checkbox,
      },
      styles: (theme: any) => ({
        input: {
          borderWidth: "1.5px",
          borderColor: theme.colors.customColor[5],
          borderStyle: "solid",
        },
        inner: {
          color: theme.white,
        },
      }),
    },
    Accordion: {
      styles: {
        root: {
          borderRadius: "20px",
        },
        content: {
          paddingTop: 8,
          paddingBottom: 8,
          // paddingBottom: 32,
          // marginTop: "16px",
        },
        label: {
          paddingTop: "8px",
          paddingBottom: "8px",
        },
        item: {
          border: 0,
        },
        control: {
          width: "100%",
          paddingLeft: "var(--mantine-spacing-md)",
          paddingRight: "var(--mantine-spacing-md)",
          paddingTop: 0,
          paddingBottom: 0,
          lineHeight: "var(--mantine-line-height-xs)",
          "& [dataAccordionLabel]": {
            lineHeight: "20px",
            fontWeight: "light",
          },
        },
        panel: {
          paddingBottom: "var(--mantine-spacing-md)",
        },
      },
      defaultProps: {
        variant: "separated",
        defaultChecked: true,
        multiple: true,
      },
    },
    ActionIcon: ActionIcon.extend({
      classNames: {
        root: styles.actionIcon,
      },
    }),
    Alert: Alert.extend({ classNames: stylesAlert }),
  },
});

export const InnerApp = () => {
  return (
    <MantineProvider theme={theme} withGlobalClasses>
      <Notifications position="top-right" />
      <DatesProvider settings={{ firstDayOfWeek: 0 }}>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </DatesProvider>
    </MantineProvider>
  );
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
