"use client";

import { useState, useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import * as z from "zod";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Divider,
  Group,
  Stack,
  Paper,
  Alert,
  Transition,
  SimpleGrid,
  Anchor,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconMail,
  IconLock,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import { useDevice } from "@/hooks";
import { GithubButton, GoogleButton } from '../common/Button/Social';

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    validate: zodResolver(signupSchema),
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: typeof form.values) {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Signup data:", values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to create account. Please try again.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSocialSignup(provider: string) {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      if (err instanceof Error) {
        setError(
          err.message || `Failed to signup with ${provider}. Please try again.`
        );
      } else {
        setError(`Failed to signup with ${provider}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Transition
      mounted={mounted}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Paper
            radius="lg"
            p={isMobile ? "md" : "xl"}
            withBorder
            className="w-full bg-white/95 shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
                <IconUserPlus className="h-6 w-6 text-violet-600" />
              </div>
              <Title order={2} className="text-center mb-1 text-gray-800">
                Create an account
              </Title>
              <Text c="dimmed" size="sm" ta="center">
                Enter your details to sign up
              </Text>
            </div>

            {error && (
              <Transition
                mounted={!!error}
                transition="slide-down"
                duration={300}
                timingFunction="ease"
              >
                {(styles) => (
                  <Alert
                    style={styles}
                    icon={<IconAlertCircle size={16} />}
                    title="Error"
                    color="red"
                    className="mb-4"
                    variant="light"
                  >
                    {error}
                  </Alert>
                )}
              </Transition>
            )}

            <form onSubmit={form.onSubmit(onSubmit)}>
              <Stack>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <TextInput
                    label="First Name"
                    placeholder="John"
                    leftSection={<IconUser size={16} />}
                    {...form.getInputProps("firstName")}
                    disabled={isLoading}
                    className="transition-all duration-200"
                    styles={{
                      input: {
                        transition: "all 0.2s ease",
                        "&:focus": {
                          borderColor: "var(--mantine-color-violet-6)",
                          boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.25)",
                        },
                      },
                    }}
                  />
                  <TextInput
                    label="Last Name"
                    placeholder="Doe"
                    leftSection={<IconUser size={16} />}
                    {...form.getInputProps("lastName")}
                    disabled={isLoading}
                    className="transition-all duration-200"
                    styles={{
                      input: {
                        transition: "all 0.2s ease",
                        "&:focus": {
                          borderColor: "var(--mantine-color-violet-6)",
                          boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.25)",
                        },
                      },
                    }}
                  />
                </SimpleGrid>

                <TextInput
                  label="Email"
                  placeholder="name@example.com"
                  leftSection={<IconMail size={16} />}
                  {...form.getInputProps("email")}
                  disabled={isLoading}
                  className="transition-all duration-200"
                  styles={{
                    input: {
                      transition: "all 0.2s ease",
                      "&:focus": {
                        borderColor: "var(--mantine-color-violet-6)",
                        boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.25)",
                      },
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Create a strong password"
                  leftSection={<IconLock size={16} />}
                  {...form.getInputProps("password")}
                  disabled={isLoading}
                  className="transition-all duration-200"
                  styles={{
                    input: {
                      transition: "all 0.2s ease",
                      "&:focus": {
                        borderColor: "var(--mantine-color-violet-6)",
                        boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.25)",
                      },
                    },
                  }}
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  leftSection={<IconLock size={16} />}
                  {...form.getInputProps("confirmPassword")}
                  disabled={isLoading}
                  className="transition-all duration-200"
                  styles={{
                    input: {
                      transition: "all 0.2s ease",
                      "&:focus": {
                        borderColor: "var(--mantine-color-violet-6)",
                        boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.25)",
                      },
                    },
                  }}
                />

                <Text size="xs" c="dimmed" className="mt-1">
                  Password must be at least 8 characters and include uppercase,
                  lowercase, and numbers
                </Text>

                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  className="bg-violet-600 hover:bg-violet-700 transition-colors duration-300 mt-4"
                  loaderProps={{ color: "white" }}
                >
                  Create Account
                </Button>
              </Stack>
            </form>

            <Divider label="Or continue with" labelPosition="center" my="lg" />

            <Group grow mb="md" mt="md">
              <GoogleButton onClick={() => handleSocialSignup("google")} />
              <GithubButton onClick={() => handleSocialSignup("github")} />
            </Group>

            <Text ta="center" size="sm" className="text-gray-500 mt-6">
              Already have an account?{" "}
              <Anchor
                href="/auth/sign-in"
                className="transition-colors duration-300"
              >
                Sign in
              </Anchor>
            </Text>
          </Paper>
        </div>
      )}
    </Transition>
  );
}
