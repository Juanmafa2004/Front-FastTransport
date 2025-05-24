import PropTypes from "prop-types";

import { Modal, ModalContent, Spinner } from "@heroui/react";

const LoadingComp = ({ isOpen, label = "Cargando..." }) => {
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} hideCloseButton={true}>
      <ModalContent className="py-8 bg-transparent shadow-none">
        <Spinner label={label} color="primary" />
      </ModalContent>
    </Modal>
  );
};

LoadingComp.propTypes = {
  isOpen: PropTypes.bool,
  label: PropTypes.string,
};

export default LoadingComp;
