import axios from "axios";
import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import ModalEdit from "../components/ModalEdit";

export default function UserHome() {
  const [sizings, setSizings] = useState([]);
  const [editIdx, setEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8889/sizing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSizings(rs.data.sizings);
    };
    run();
  }, [trigger]);

  const openModal = (id) => {
    let idx = sizings.findIndex( el=> el.id === id)
    setEditIdx(idx)
    document.getElementById("my_modal_2").showModal()
  }

  const closeModal = () => {
    document.getElementById("my_modal_2").close()
  }

  return (
    <div className="flex flex-col min-w-[600px] w-4/6 mx-auto p-4 gap-6">
      <div className="text-center text-2xl text-black">Your Job</div>
      <ModalEdit el={sizings[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
      <div className="flex flex-col gap-4">
        {sizings.map((el) => (
          <TodoCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
        ))}
      </div>
    </div>
  );
}
