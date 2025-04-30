import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { LogoFast } from "@Assets";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="w-[70vh] h-[75vh] flex flex-col items-center justify-start bg-white shadow-lg rounded-2xl">
        <div className="flex flex-col items-start w-[300px]">
          <img src={LogoFast} alt="" />
        </div>
        <div className="w-full justify-between ">
          <div className="w-full flex justify-center  mt-2 ">
            <Input
              className="w-[75%]"
              size="lg"
              label="Nombre de usuario"
              labelPlacement="outside"
              placeholder=" "
              //   value={formData.user}
              //   isInvalid={!!errors.user}
              //   errorMessage={errors.user}
              //   onValueChange={(val) => handleValueChange(val, "user")}
                classNames={{
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  input: "placeholder:text-placeHolder",
                }}
              //   autoComplete="email"
            />
          </div>
          <div className="w-full flex justify-center mt-8">
            <Input
              className="w-[75%]"
              label="Contraseña"
              size="lg"
              labelPlacement="outside"
              placeholder=" "
              // value={formData.password}
              // isInvalid={!!errors.password}
              // errorMessage={errors.password}
              // onValueChange={(val) => handleValueChange(val, "password")}
              classNames={{
                inputWrapper: "data-[invalid=true]:border-inactive",
                errorMessage: "text-inactive",
                input: "placeholder:text-placeHolder",
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              autoComplete="current-password"
            />
          </div>
          <div className="w-full flex justify-center mt-7">
            <Button
              className="w-[75%] mt-5"
              variant="solid"
              color="primary"
              size="lg"
              // onClick={handleLogin}>
            >
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
