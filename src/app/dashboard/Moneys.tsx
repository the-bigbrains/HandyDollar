interface Props {
  message: string;
  money: number;
}

export default function Moneys({ message, money }: Props) {
  return (
    <div className="p-2 px-4 border border-green-300 text-green-300 hover:bg-green-300 hover:text-black duration-200 mt-10 rounded-lg">
      <div>{message + " " + money} </div>
    </div>
  );
}
