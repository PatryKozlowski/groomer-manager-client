"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUserAction } from "@/actions/actions";
import Spinner from "./Spinner";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { loginFormSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

export default function AuthForm() {
  const [state, action, isPending] = useActionState(loginUserAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.output<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.timestamp]);

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center mb-2 text-violet-500">
            Groomer Manager
          </CardTitle>
          <CardDescription>
            Podaj email oraz hasło aby się zalogować
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-2">
          <Form {...form}>
            <form
              ref={formRef}
              action={action}
              onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit(() => {
                  startTransition(() => {
                    action(new FormData(formRef.current!));
                  });
                })(evt);
              }}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@groomermanager.pl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                aria-disabled={isPending}
                type="submit"
                className="mt-4 w-full"
              >
                {isPending ? <Spinner /> : "Zaloguj się"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
