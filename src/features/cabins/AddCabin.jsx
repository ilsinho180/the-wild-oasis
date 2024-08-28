import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [button, setButton] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setButton((button) => !button)}>
//         Add a new cabin
//       </Button>
//       {button && (
//         <Modal onClose={() => setButton(false)}>
//           <CreateCabinForm onCloseModal={() => setButton(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }
