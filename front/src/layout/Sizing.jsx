import axios from "axios";
import {useState} from "react";

export default function Sizing() {
  const [input, setInput] = useState({
    height : '',
    weight : '',
    proportion : '',
    skin_color : '',
    date : new Date().toISOString().split('T')[0]
  })

  const hdlChange = e => {
    setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
  }

  const hdlSubmit = async e => {
    try{
      e.preventDefault()
      // setInput(prv => ({...prv, dueDate: new Date(prv.dueDate) }))
      const output = { ...input, date: new Date(input.date) }
      const token = localStorage.getItem('token')
      const rs = await axios.post('http://localhost:8889/sizing', output, {
        headers : { Authorization : `Bearer ${token}`}
      })
      alert('Create new OK')
    }catch(err) {
      alert(err.message)
    }
  }

  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmit}
    >
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">ส่วนสูง</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="height"
          value={input.height}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">น้ำหนัก</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="weight"
          value={input.weight}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">สัดส่วน</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="proportion"
          value={input.proportion}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">สีผิว</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full "
          name="skin_color"
          value={input.skin_color}
          onChange={hdlChange}
        />
      </label>
      <label className="form-control w-full max-w-[220px] ">
        <div className="label">
          <span className="label-text">Date</span>
        </div>
        <input type="date" name="date" value={input.date} onChange={hdlChange} />
      </label>
      <button className="btn btn-primary">Add new</button>
    </form>
  );
}
