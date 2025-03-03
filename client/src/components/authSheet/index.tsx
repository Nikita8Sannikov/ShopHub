import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  //   SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AuthForm from "../authForm"
import { useState } from "react"
import { AppDispatch } from "@/store"
import { useDispatch } from "react-redux"
import { register as reg, signIn } from "@/store/reducers/auth/authSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { loginSchema, registerSchema } from "@/lib/validation"
// import { formSchema } from "@/lib/validation";

export function AuthSheet() {
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false)
  const dispatch: AppDispatch = useDispatch();

  type AuthFormValues = {
    name?: string ;
    email: string;
    password: string;
  };

  const formMethods = useForm<AuthFormValues>({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const { reset, setError } = formMethods;

  const onSubmit = async (data: AuthFormValues ) => {
    try {
      if (isRegistering) {
        await authHandlers.onReg(data);
      } else {
        await authHandlers.onLogin(data);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const authHandlers = {
    onLogin: async (data: AuthFormValues ) => {
      setLoading(true);

      try {
        await dispatch(signIn({ email: data.email, password: data.password })).unwrap();
      } catch (error) {
        console.error("Ошибка входа:", error);
        setError("email", { type: "manual", message: "Неверный email или пароль" });
      } finally {
        setLoading(false);
      }
    },

    onReg: async (data: AuthFormValues ) => {
      setLoading(true);
      try {
        await dispatch(
          reg({
            email: data.email,
            password: data.password,
            name: data.name ?? "",
          })).unwrap();

        setIsRegistering(false);
        reset({ name: "", email: data.email, password: data.password });
      } catch (error) {
        console.error("Ошибка регистрации:", error);
        setError("email", { type: "manual", message: "Пользователь с таким email уже зарегистрирован" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button >Reg/Login</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isRegistering ? "Регистрация" : "Вход в систему"}
          </SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
        <FormProvider {...formMethods}>
          <AuthForm
            isRegistering={isRegistering}
            setIsRegistering={setIsRegistering}
            onSubmit={formMethods.handleSubmit(onSubmit)}
            loading={loading}
          />
        </FormProvider>
        <SheetFooter>
          {/* <SheetClose asChild> */}
          {/* <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Загрузка..." : isRegistering ? "Регистрация" : "Войти"}
          </Button> */}
          {/* </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}


