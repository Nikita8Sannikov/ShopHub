import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AuthFormValues } from "@/types/types";

interface AuthFormProps {
  isRegistering: boolean
  setIsRegistering: (value: boolean) => void
  onSubmit: (data: AuthFormValues) => void;
  loading: boolean
}

export default function AuthForm({ isRegistering, setIsRegistering, onSubmit, loading }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useFormContext<AuthFormValues>();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <Card className="w-[350px] mx-auto">
      {/* <CardHeader>
        <CardTitle>
          {isRegistering ? "Регистрация" : "Вход в систему"}
        </CardTitle>
      </CardHeader> */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
          {isRegistering && (
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" {...register("name")} className={cn(errors.name && "border-red-500")} />
              {errors.name && <p className="text-sm text-red-500">{String(errors.name.message)}</p>}
            </div>
          )}
          {!isRegistering && (
            <div className="h-[60px]">
              <Label htmlFor="name"></Label>
              <Input className="invisible" type="text" />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} className={cn(errors.email && "border-red-500")} />
            {errors.email && <p className="text-sm text-red-500">{String(errors.email.message)}</p>}
          </div>

          <div className="relative">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} className={cn(errors.password && "border-red-500")} />
            {errors.password && <p className="text-sm text-red-500">{String(errors.password.message)}</p>}

            <span
              className="absolute right-2.5 top-2/4 cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Загрузка..." : isRegistering ? "Регистрация" : "Войти"}
          </Button>
          <div >
            {isRegistering ? (
              <p>
                Уже есть аккаунт?{" "}
                <span className="border-b border-dotted cursor-pointer" onClick={() => setIsRegistering(false)}>
                  Войти
                </span>
              </p>
            ) : (
              <p>
                Нет аккаунта?{" "}
                <span className="border-b border-dotted cursor-pointer" onClick={() => setIsRegistering(true)}>
                  Зарегистрироваться
                </span>
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
