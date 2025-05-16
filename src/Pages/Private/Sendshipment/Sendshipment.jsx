import React from "react";
import styles from "./Sendshipment.style.module.css";
import SendshipmentViewModel from "./Sendshipment.viewmodel";
import { Button, Input, Select, SelectItem, Switch, cn } from "@heroui/react";

const Sendshipment = () => {
  const {
    formData,
    errors,
    handleSubmit,
    handleValueChangeForm,
    canContinue,
    handleBlur,
    openModal,
    onCloseModal,
    sendForm,
    resetData,
  } = SendshipmentViewModel();
  return (
    <div className="w-full h-full p-5 mt-3 bg-white rounded-t-[20px] flex flex-col justify-center items-center gap-[30px] ">
      <form
        onSubmit={handleSubmit}
        className="w-[95%] flex-1 flex flex-col items-start gap-5"
      >
        <h1 className="w-full text-center text-black text-lg font-semibold leading-[21px]">
          Diligencia los datos requeridos para realizar el envio del pedido
        </h1>

        {/* Form Sections */}
        <div className="w-full flex flex-col gap-[30px] mt-3 h-full ">
          {/* Basic Information */}
          <div className="w-full ">
            <h2 className="w-full text-center text-black text-base font-semibold leading-[21px] ">
              Datos del remitente
            </h2>
            <section className="w-full mt-3 flex gap-3">
              <Input
                label="Nombre completo (*)"
                value={formData.name}
                className="w-full"
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                label="Correo (*)"
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                label="Celular (*)"
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
            </section>
            <section className="w-full mt-3 flex gap-3">
              <Input
                label="Dirección (*)"
                value={formData.name}
                className="w-full"
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                label="Observaciones "
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                label="Fecha de recogida (*)"
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
            </section>
          </div>

          <div className="w-full h-px bg-[#c8c8c8]"></div>
          <div className="w-full">
            <h2 className="w-full text-center text-black text-base font-semibold leading-[21px] ">
              Datos del destinatario
            </h2>
            <section className="w-full mt-3 flex gap-3">
              <Input
                label="Nombre completo (*)"
                value={formData.name}
                className="w-full"
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />

              <Input
                label="Dirección (*)"
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
            </section>
            <section className="w-full mt-3 flex gap-3">
              <Input
                label="Observaciones"
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                label="Celular (*)"
                value={formData.name}
                className="w-full"
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
              <Input
                label="Fecha de entrega (*)"
                className="w-full"
                value={formData.name}
                classNames={{
                  label:
                    "!text-formLabel font-semibold w-full flex justify-center",
                  inputWrapper: "data-[invalid=true]:border-inactive",
                  errorMessage: "text-inactive",
                  value: "text-placeHolder",
                }}
                placeholder=" "
                labelPlacement="outside"
                onValueChange={(val) => handleValueChangeForm(val, "name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
              />
            </section>
          </div>
        </div>

        <div className="w-full py-10 flex justify-center gap-4">
          <Button
            className={`${styles.button} rounded-md w-[150px] h-[35px] mt-8 px-8 py-4 text-base font-semibold transition-all duration-300  bg-[#cbcbc9] text-[rgba(17,18,21,50)]`}
            onPress={resetData}
          >
            Cancelar
          </Button>
          <Button
            radius="none"
            type="submit"
            className={`${styles.button} ${
              canContinue ? styles.enabled : styles.disabled
            } w-[150px] h-[35px] mt-8 px-8 py-4 text-base font-semibold transition-all duration-300 rounded-md bg-[#e5e5e4] text-[rgba(17,18,21,50)]`}
            isDisabled={!canContinue}
          >
            Crear
          </Button>
        </div>
      </form>
      {/* <ConfirmUsersModal
      isOpen={openModal}
      onClose={onCloseModal}
      sendData={sendForm}
    /> */}
    </div>
  );
};

export default Sendshipment;
