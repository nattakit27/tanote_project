import axios from "axios";
import React from "react";

export default function TodoCard(props) {
  const { el, openModal, setTrigger } = props;

  const statusColor = el.status==='PENDING' ? 'bg-pink-300' 
    : el.status==='DOING' ? 'bg-blue-300' : 'bg-lime-300'
  const hdlDelete = async e => {
    try {
      e.stopPropagation()
      const token = localStorage.getItem('token')
      let rs = await axios.delete(`http://localhost:8889/sizing/${el.id}`, {
        headers : { Authorization : `Bearer ${token}`}
      })
      alert('Delete successful') 
      setTrigger(prv=>!prv)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <table className={`table w-5/6 mx-auto cursor-pointer ${statusColor} shadow-xl active:shadow-none active:translate-x-2 active:translate-y-1`} onClick={() => openModal(el.id)}>
    <thead>
      <tr>
        <th>ส่วนสูง</th>
        <th>น้ำหนัก</th>
        <th>สัดส่วน</th>
        <th>สีผิว</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{el.height}</td>
        <td>{el.weight}</td>
        <td>{el.proportion}</td>
        <td>{el.skin_color}</td>
        <td>
          <div className="badge badge-secondary" onClick={hdlDelete}>delete</div>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="4">Date: {new Date(el.date).toDateString()}</td>
        <td>Status: {el.status}</td>
      </tr>
    </tfoot>
  </table>
  );
}

