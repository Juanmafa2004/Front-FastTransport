import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "@heroui/react";
import { LogoFast } from "@Assets";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export const Login = ({
  formData,
  errors,
  handleValueChange,
  handleSubmit,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="w-[90%] max-w-lg h-[80vh] max-h-[700px] flex flex-col items-center justify-start bg-white shadow-lg rounded-2xl ">
        <div className="w-[35vh] flex justify-center ">
          <img src={LogoFast} alt="Logo" />
        </div>

        <div className=" w-full flex flex-col justify-center  overflow-auto ">
          {/* className="w-full flex justify-center p-1   h-full" */}
          <div
            className={
              !errors.user
                ? `w-full flex flex-col justify-center items-start mb-5`
                : ` w-full flex flex-col justify-center items-start `
            }
          >
            <Input
              className="w-[90%] self-center"
              label="Nombre de usuario"
              labelPlacement="outside"
              variant="flat"
              placeholder=" "
              value={formData.user}
              isInvalid={!!errors.user}
              errorMessage={errors.user}
              onValueChange={(val) => handleValueChange(val, "user")}
              classNames={{
                inputWrapper: "data-[invalid=true]:border-inactive",
                errorMessage: "text-inactive min-h-[20px] leading-tight",
                input: "placeholder:text-placeHolder",
              }}
              autoComplete="email"
            />
          </div>
          <div
            className={
              !errors.user
                ? `w-full flex flex-col justify-center items-start mb-10`
                : ` w-full flex flex-col justify-center items-start mb-5`
            }
          >
            <Input
              className="w-[90%] self-center"
              label="Contraseña"
              variant="flat"
              labelPlacement="outside"
              placeholder=" "
              value={formData.password}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              onValueChange={(val) => handleValueChange(val, "password")}
              classNames={{
                inputWrapper: "data-[invalid=true]:border-inactive",
                errorMessage: "text-inactive min-h-[20px] leading-tight ",
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
          <div className="w-full flex justify-center mt-5 h-full">
            <Button
              className="w-[75%] self-center"
              variant="solid"
              color="primary"
              size="lg"
              onPress={handleSubmit}
            >
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  formData: PropTypes.shape({
    user: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    user: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleValueChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
