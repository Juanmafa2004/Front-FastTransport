import styles from "./Sendshipment.style.module.css";
import { today, getLocalTimeZone } from "@internationalized/date";
import SendshipmentViewModel from "./Sendshipment.viewmodel";
import { Button, Input, Textarea, DatePicker, Tooltip } from "@heroui/react";
import ModalMessage from "./Components/ModalMessage";
import { ExclamationIcon } from "../Components/ExclamationIcon";
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
    resetData,
  } = SendshipmentViewModel();
  return (
    <>
      <div className="w-full h-full p-5 mt-3 bg-white rounded-t-[20px] flex flex-col justify-center items-center gap-[30px] ">
        <form
          onSubmit={handleSubmit}
          className="w-[95%] flex-1 flex flex-col items-start gap-5"
        >
          <h1 className="w-full text-center text-black text-lg font-semibold leading-[21px]">
            Diligencia los datos requeridos para realizar el envio del pedido
          </h1>

          {/* Form Sections */}
          <div className="w-full flex flex-col mt-1 h-full justify-center items-center">
            {/* Basic Information */}
            <div className="w-full ">
              <section className="w-full  flex gap-4">
                <Input
                  label="Dirección de recogida (*)"
                  value={formData.startDirection}
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
                  onValueChange={(val) =>
                    handleValueChangeForm(val, "startDirection")
                  }
                  isInvalid={!!errors.startDirection}
                  errorMessage={errors.startDirection}
                  onBlur={() => handleBlur("startDirection")}
                />
                <DatePicker
                  label="Fecha de recogida (*)"
                  className="w-[45%]"
                  value={formData.recolectDay}
                  dateInputClassNames={{
                    label: "!text-formLabel font-semibold",
                    inputWrapper: "data-[invalid=true]:border-inactive",
                    errorMessage: "text-inactive",
                  }}
                  placeholder=" "
                  labelPlacement="outside"
                  onChange={(val) => handleValueChangeForm(val, "recolectDay")}
                  isInvalid={!!errors.recolectDay}
                  errorMessage={errors.recolectDay}
                  minValue={today(getLocalTimeZone())}
                />
              </section>
              <section className="w-full mt-8 flex gap-4">
                <Input
                  label="Dirección de destino (*)"
                  value={formData.endDirection}
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
                  onValueChange={(val) =>
                    handleValueChangeForm(val, "endDirection")
                  }
                  isInvalid={!!errors.endDirection}
                  errorMessage={errors.endDirection}
                  onBlur={() => handleBlur("endDirection")}
                />
                <DatePicker
                  label="Fecha de entrega (*)"
                  className="w-[45%]"
                  value={formData.deliveryDay}
                  dateInputClassNames={{
                    label: "!text-formLabel font-semibold",
                    inputWrapper: "data-[invalid=true]:border-inactive",
                    errorMessage: "text-inactive",
                  }}
                  placeholder=" "
                  labelPlacement="outside"
                  onChange={(val) => handleValueChangeForm(val, "deliveryDay")}
                  isInvalid={!!errors.deliveryDay}
                  errorMessage={errors.deliveryDay}
                  minValue={today(getLocalTimeZone())}
                />
              </section>
              <section className="w-full mt-5 flex gap-4">
                <Textarea
                  label={
                    <span className="flex items-center gap-1">
                      Observaciones (*)
                      <Tooltip
                        closeDelay={0}
                        content="Debe colocar las observaciones del pedido, por ejemplo: si el pedido tiene alguna condición especial, etc."
                        placement="top"
                        offset={7}
                        crossOffset={16}
                        classNames={{
                          base: ["before:bg-tooltip dark:before:bg-tooltip"],
                          content: ["py-2 px-4", "text-white bg-tooltip"],
                        }}
                      >
                        <span className="cursor-pointer ">
                          <ExclamationIcon />{" "}
                        </span>
                      </Tooltip>
                    </span>
                  }
                  className="w-full"
                  value={formData.observations}
                  classNames={{
                    label:
                      "!text-formLabel font-semibold w-full flex justify-center",
                    inputWrapper: "data-[invalid=true]:border-inactive",
                    errorMessage: "text-inactive",
                    value: "text-placeHolder",
                  }}
                  placeholder=" "
                  labelPlacement="outside"
                  onValueChange={(val) =>
                    handleValueChangeForm(val, "observations")
                  }
                  isInvalid={!!errors.observations}
                  errorMessage={errors.observations}
                  maxRows={3}
                  onBlur={() => handleBlur("observations")}
                />
              </section>
            </div>
          </div>

          <div className="w-full py-11 flex justify-center gap-4">
            <Button
              className={` rounded-md w-[150px] h-[40px] mt-8 px-8 py-4 text-base font-semibold transition-all duration-300  bg-[#b6b6b5] text-[rgba(17,18,21,50)]`}
              onPress={resetData}
            >
              Cancelar
            </Button>
            <Button
              radius="none"
              type="submit"
              className={`${styles.button} ${
                canContinue ? styles.enabled : styles.disabled
              } w-[155px] h-[40px] mt-8 px-8 py-4 text-base font-semibold transition-all duration-300 rounded-md bg-[#e5e5e4] text-[rgba(17,18,21,50)]`}
              isDisabled={!canContinue}
            >
              Crear
            </Button>
          </div>
        </form>
        <ModalMessage isOpen={openModal} onClose={onCloseModal} />
      </div>
    </>
  );
};

export default Sendshipment;
