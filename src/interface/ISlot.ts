interface ISlot {
  _id: string;
  date: string;
  time: "fullday" | "morning" | "afternoon" | string;
  slots: any[];
  booked: any[];
}

export default ISlot;

