import {
  Alert,
  Box,
  Button,
  Flex,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { MdInfo } from "react-icons/md";
import { z } from "zod";
import classes from "./login.module.css";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    // if (context.auth.authData) {
    //   throw redirect({ to: "/" });
    // }
  },
  component: RouteComponent,
});

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

function RouteComponent() {
  const theme = useMantineTheme();
  const [showError, setShowError] = useState(true);
  const navigate = useNavigate();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleLogin = () => {
    setShowError(true);
    navigate({ to: "/" });
  };

  // useEffect(() => {
  //   if (isSuccess && data.accessToken) {
  //     const authData = {
  //       accessToken: data.accessToken,
  //       expiresIn: "1000",
  //     };

  //     setAuthData(authData);
  //     navigate({ to: "/" });
  //   }
  // }, [isSuccess, data, setAuthData, navigate]);

  return (
    <div className={classes.loginWrapper}>
      <Flex justify="space-between" align="center" direction="row">
        <Box w={600} h={54} mx={"auto"}>
          <picture>
            <source srcSet="/logo.svg" type="image/avif" />
            <img
              src="/logo.svg"
              width="600"
              height="54"
              alt="pethaven logo"
              loading="eager"
              fetchPriority="high"
              style={{
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
              }}
            />
          </picture>
        </Box>

        <Paper className={classes.form} radius={0} p={30}>
          <Box w={420} mx="auto">
            <Title order={2} className={classes.title} ta="left" mb={8}>
              Sign In
            </Title>
            <Text c={theme.colors.neutral[4]} mb={12}>
              Enter the details below to sign in to your account
            </Text>

            {showError && (
              <Alert
                icon={<MdInfo size={16} />}
                w="100%"
                color="red"
                py="0"
                bg={"#FFE8E1"}
                withCloseButton
                onClose={() => setShowError(false)}
                closeButtonLabel="Dismiss"
                styles={{
                  root: {
                    display: "inline-flex",
                  },
                  wrapper: {
                    width: "100%",
                    alignItems: "center",
                    flexWrap: "wrap",
                    height: 36,
                  },
                  icon: {
                    marginTop: 0,
                    width: 16,
                    height: 16,
                  },
                  body: {
                    height: 21,
                    display: "inline-block",
                  },
                  message: {
                    height: 21,
                  },
                }}
              >
                Invalid username and password
              </Alert>
            )}

            <form
              onSubmit={form.onSubmit(handleLogin)}
              className={classes.form_wrapper}
            >
              <Box mb={56} mt={40}>
                <TextInput
                  classNames={{
                    input: classes.input,
                    label: classes.label,
                  }}
                  styles={{
                    input: {
                      height: "44px",
                    },
                    wrapper: {
                      minHeight: "44px",
                    },
                    root: {
                      height: "auto",
                    },
                  }}
                  label="Username"
                  mb={24}
                  placeholder="Username"
                  radius={"md"}
                  key={form.key("username")}
                  formNoValidate={true}
                  {...form.getInputProps("username")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  radius={"md"}
                  classNames={{
                    input: classes.input,
                    label: classes.label,
                  }}
                  styles={{
                    innerInput: {
                      height: 44,
                    },
                    wrapper: {
                      height: 44,
                    },
                    section: {
                      minHeight: 44,
                    },
                  }}
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                />
              </Box>
              <Button
                type="submit"
                bg={"#0B68EA"}
                radius={"md"}
                fullWidth
                size="md"
              >
                Sign in
              </Button>
            </form>
          </Box>
        </Paper>
      </Flex>
    </div>
  );
}
